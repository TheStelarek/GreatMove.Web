import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Cell } from 'react-table';
import styles from '@/features/recipe/containers/myRecipesContainer/MyRecipesContainer.module.scss';
import Table from '@/components/core/table/Table';
import Button from '@/components/core/button/Button';
import Spinner from '@/components/core/spinner/Spinner';
import useModal from '@/components/core/modal/useModal';
import { Recipe } from '@/features/recipe/utils/types/Recipe';
import Edit from '@/public/icons/edit-regular.svg';
import View from '@/public/icons/view.svg';
import Trash from '@/public/my-shopping-list/trash.svg';
import useMyRecipes from '@/features/recipe/hooks/useMyRecipes';
import { useDeleteRecipeMutation } from '@/features/recipe/api/recipesApi';
import DeleteModal from '@/components/core/deleteModal/DeleteModal';
import { ErrorType } from '@/utils/types/ErrorType';

const MyRecipesContainer = () => {
   const { recipes, pageCount, error, isLoading, fetchMyRecipes } = useMyRecipes();
   const [deleteRecipe, deleteResult] = useDeleteRecipeMutation();
   const [selectedRecipeId, setSelectedRecipeId] = useState<string>(``);

   const {
      isOpen: isOpenDelete,
      handleOpenModal: handleOpenDeleteModal,
      handleCloseModal: handleCloseDeleteModal,
   } = useModal();

   const openDeleteModal = useCallback(
      (selectedId: string) => {
         handleOpenDeleteModal();
         setSelectedRecipeId(selectedId);
      },
      [handleOpenDeleteModal],
   );

   const columns = useMemo(
      () => [
         {
            Header: `NUMBER`,
            accessor: `number` as const,
         },
         {
            Header: `Name`,
            accessor: `title` as const,
            Cell: function RecipeName({ cell }: { cell: Cell<Recipe> }): JSX.Element {
               return <div style={{ width: `150px` }}>{cell.row.original.title}</div>;
            },
         },
         {
            Header: `TOTAL TIME`,
            accessor: `time` as const,
            Cell: function EstimatedTime({ cell }: { cell: Cell<Recipe> }): string {
               const cookTime = cell.row.original.cookTime ? cell.row.original.cookTime : 0;
               return `${cell.row.original.preparationTime + cookTime} mins`;
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
                     <Link href={`/recipes/id/${cell.row.original.id}/${cell.row.original.title.replace(/ /g, `-`)}`}>
                        <button>
                           <View className={styles.icon} />
                        </button>
                     </Link>
                     <Link href={`/recipes/edit-recipe/${cell.row.original.id}`}>
                        <button>
                           <Edit className={styles.icon} />
                        </button>
                     </Link>

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

   useEffect(() => {
      if (deleteResult.isSuccess) {
         handleCloseDeleteModal();
         setSelectedRecipeId(``);
      }
   }, [deleteResult]);

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

         <DeleteModal
            isOpen={isOpenDelete}
            isLoading={deleteResult.isLoading}
            closeModal={handleCloseDeleteModal}
            remove={() => deleteRecipe({ recipeId: selectedRecipeId })}
            deleteError={(deleteResult?.error as ErrorType)?.data?.message}
            heading="Delete recipe"
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

export default MyRecipesContainer;
