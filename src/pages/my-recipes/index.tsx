import { FormEvent, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Cell } from 'react-table';
import styles from '@/pages/my-recipes/MyRecipes.module.scss';
import Layout from '@/components/core/layout/Layout';
import Table from '@/components/core/table/Table';
import Button from '@/components/core/button/Button';
import Spinner from '@/components/core/spinner/Spinner';
import Modal from '@/components/core/modal/Modal';
import useModal from '@/components/core/modal/useModal';
import { apiClient } from '@/api/apiClient';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import { Recipe } from '@/utils/types/Recipe';
import Edit from '@/public/icons/edit-regular.svg';
import Trash from '@/public/my-shopping-list/trash.svg';

const MyRecipes: NextApplicationPage = () => {
   const [recipes, setRecipes] = useState<Recipe[]>();
   const [pageCount, setPageCount] = useState(0);
   const [selectedRecipeId, setSelectedRecipeId] = useState<string>(``);
   const { isOpen, handleOpenModal, handleCloseModal } = useModal();

   const openDeleteModal = useCallback(
      (selectedId: string) => {
         handleOpenModal();
         setSelectedRecipeId(selectedId);
      },
      [handleOpenModal],
   );

   const columns = useMemo(
      () => [
         {
            Header: `NUMBER`,
            accessor: `number` as const,
         },
         {
            Header: function HeaderName() {
               return <div style={{ width: `150px` }}>NAME</div>;
            },
            accessor: `name` as const,
            Cell: function RecipeName({ cell }: { cell: Cell<Recipe> }): JSX.Element {
               return <div style={{ width: `150px` }}>{cell.row.original.name}</div>;
            },
         },
         {
            Header: `COOK TIME`,
            accessor: `time` as const,
            Cell: function EstimatedTime({ cell }: { cell: Cell<Recipe> }): string {
               return `${cell.row.original.preparationTime + cell.row.original.cookTime} mins`;
            },
         },
         {
            Header: `CALORIES`,
            accessor: `calories` as const,
         },
         {
            Header: `PROTEINS`,
            accessor: `protein` as const,
         },
         {
            Header: `CARBS`,
            accessor: `carbs` as const,
         },
         {
            Header: `FATS`,
            accessor: `fats` as const,
         },
         {
            Header: `DIFFICULTY`,
            accessor: `difficulty` as const,
         },
         {
            Header: `CREATED`,
            accessor: `createdAt` as const,
         },
         {
            Header: ``,
            accessor: `actions` as const,
            disableSortBy: true,
            Cell: function ActionButtons({ cell }: { cell: Cell<Recipe> }) {
               return (
                  <div className={styles.actionsContainer}>
                     <button>
                        <Edit className={styles.icon} />
                     </button>
                     <button onClick={() => openDeleteModal(cell.row.original.id)}>
                        <Trash className={styles.icon} />
                     </button>
                  </div>
               );
            },
         },
      ],
      [openDeleteModal],
   );

   const closeDeleteModal = () => {
      handleCloseModal();
      setSelectedRecipeId(``);
   };

   const removeRecipe = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await apiClient.delete(`/recipes/${selectedRecipeId}`);
      const filteredRecipes = recipes?.filter(({ id }) => id !== selectedRecipeId);
      setRecipes(filteredRecipes);
      closeDeleteModal();
   };

   const fetchMyRecipes = useCallback(async (pageSize: number, pageIndex: number) => {
      const response = await apiClient.get(`/recipes/my-recipes?take=${pageSize}&skip=${pageIndex * pageSize}`);
      const mappedData = response.data.data.map((recipe: Recipe, index: number) => ({
         ...recipe,
         createdAt: recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString() : null,
         number: index + 1,
      }));

      setRecipes(mappedData);
      setPageCount(Math.ceil(response.data.total / pageSize));
   }, []);

   useEffect(() => {
      fetchMyRecipes(10, 0);
   }, []);

   return (
      <div className={styles.recipesContainer}>
         <div className={styles.header}>
            <p className={styles.pageName}>My recipes</p>
            <Link href="/trainings/create-training-plan">
               <Button borderRadius={5} size="small">
                  Create recipe
               </Button>
            </Link>
         </div>

         <Modal isOpen={isOpen} handleClose={closeDeleteModal}>
            <div className={styles.deleteModalContainer}>
               <div className={styles.modalHeader}>
                  <span className={styles.heading}>Delete recipe</span>
                  <p className={styles.description}>
                     Are you sure you want to delete this recipe? By doing this you will lose all of your saved data and
                     will not be able to retrive it.
                  </p>
               </div>
               <form className={styles.deleteRecipeForm} onSubmit={removeRecipe}>
                  <div className={styles.buttonsWrapper}>
                     <button className={styles.cancelBtn} onClick={closeDeleteModal}>
                        Cancel
                     </button>
                     <Button type="submit" variant="warning" borderRadius={5} isBold>
                        Delete recipe
                     </Button>
                  </div>
               </form>
            </div>
         </Modal>

         {recipes ? (
            <Table
               hasGlobalFilter
               hasPagination
               isSortable
               isEquallyGrow
               columns={columns}
               data={recipes}
               fetchData={fetchMyRecipes}
               pageCount={pageCount}
            />
         ) : (
            <Spinner variant="ghost-primary" size="extra-large" />
         )}
      </div>
   );
};

export default MyRecipes;

MyRecipes.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};

MyRecipes.requireAuth = true;
