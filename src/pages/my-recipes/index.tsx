import { FormEvent, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { Cell } from 'react-table';
import { apiClient } from '@/api/apiClient';
import styles from '@/pages/my-recipes/MyRecipes.module.scss';
import Layout from '@/components/core/layout/Layout';
import Table from '@/components/core/table/Table';
import Button from '@/components/core/button/Button';
import Spinner from '@/components/core/spinner/Spinner';
import useModal from '@/components/core/modal/useModal';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import { Recipe } from '@/utils/types/Recipe';
import Edit from '@/public/icons/edit-regular.svg';
import Trash from '@/public/my-shopping-list/trash.svg';
import DeleteRecipeModal from '@/components/my-recipes/deleteRecipeModal/DeleteRecipeModal';

const MyRecipes: NextApplicationPage = () => {
   const [recipes, setRecipes] = useState<Recipe[]>();
   const [pageCount, setPageCount] = useState(0);
   const [error, setError] = useState<string>(``);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [deleteError, setDeleteError] = useState<string>(``);
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
            Header: `Name`,
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
            accessor: `proteins` as const,
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
      setDeleteError(``);
   };

   const removeRecipe = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         setIsLoading(true);
         await apiClient.delete(`/recipes/${selectedRecipeId}`);
         const filteredRecipes = recipes?.filter(({ id }) => id !== selectedRecipeId);
         setIsLoading(false);
         setRecipes(filteredRecipes);
         closeDeleteModal();
      } catch (axiosError) {
         setIsLoading(false);
         const err = axiosError as AxiosError;
         setError(err.response?.data.message);
      }
   };
   const fetchMyRecipes = useCallback(async (pageSize: number, pageIndex: number) => {
      try {
         setIsLoading(true);
         const response = await apiClient.get(`/recipes/my-recipes?take=${pageSize}&skip=${pageIndex * pageSize}`);
         const mappedData = response.data.data.map((recipe: Recipe, index: number) => ({
            ...recipe,
            createdAt: recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString() : null,
            number: index + 1,
         }));

         const pagesCount = Math.ceil(response.data.total / pageSize);
         setIsLoading(false);
         setRecipes(mappedData);
         setPageCount(pagesCount === 0 ? 1 : pagesCount);
      } catch (axiosError) {
         const err = axiosError as AxiosError;
         setIsLoading(false);
         setError(err.response?.data.message);
      }
   }, []);

   useEffect(() => {
      fetchMyRecipes(10, 0);
   }, []);

   return (
      <div className={styles.recipesContainer}>
         <div className={styles.header}>
            <p className={styles.pageName}>My recipes</p>
            <Link href="/recipes/create-recipe">
               <Button borderRadius={5} size="small">
                  Create recipe
               </Button>
            </Link>
         </div>
         <DeleteRecipeModal
            isOpen={isOpen}
            isLoading={isLoading}
            removeRecipe={removeRecipe}
            closeModal={closeDeleteModal}
            deleteError={deleteError}
         />
         {error && <p className="error">{error}</p>}
         {recipes && (
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
         )}
         {isLoading && !recipes && <Spinner variant="ghost-primary" size="extra-large" />}
      </div>
   );
};

export default MyRecipes;

MyRecipes.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};

MyRecipes.requireAuth = true;
