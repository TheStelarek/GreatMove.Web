import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Cell } from 'react-table';
import Table from '@/components/core/table/Table';
import Button from '@/components/core/button/Button';
import Spinner from '@/components/core/spinner/Spinner';
import useModal from '@/components/core/modal/useModal';
import DeleteModal from '@/components/core/deleteModal/DeleteModal';
import { Recipe } from '@/features/recipe/utils/types/Recipe';
import styles from '@/features/recipe/containers/myRecipesContainer/MyRecipesContainer.module.scss';
import { useDeleteRecipeMutation, useGetMyRecipesQuery } from '@/features/recipe/api/recipesApi';
import { ErrorType } from '@/utils/types/ErrorType';
import Edit from '@/public/icons/edit-regular.svg';
import View from '@/public/icons/view.svg';
import Trash from '@/public/icons/trash.svg';

const MyRecipesContainer = () => {
   const [pageSize, setPageSize] = useState(10);
   const [pageIndex, setPageIndex] = useState(0);
   const [recipes, setRecipes] = useState<Recipe[]>([]);
   const [pageCount, setPageCount] = useState(1);
   const { data, isLoading, isError, error } = useGetMyRecipesQuery({ pageSize, pageIndex });

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
      if (data) {
         const mappedData = data.data.map((recipe: Recipe, index: number) => ({
            ...recipe,
            createdAt: recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString() : null,
            number: index + 1,
         }));

         const pagesCount = Math.ceil(data.total / pageSize);
         setRecipes(mappedData);
         setPageCount(pagesCount === 0 ? 1 : pagesCount);
      }
   }, [data]);

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

         {isError && error && <p className="error">{(error as ErrorType).data.message}</p>}
         {data && recipes && (
            <Table
               hasGlobalFilter
               hasPagination
               isSortable
               isEquallyGrow
               columns={columns}
               data={recipes}
               setSize={setPageSize}
               setIndex={setPageIndex}
               pageCount={pageCount}
            />
         )}
         {isLoading && <Spinner variant="ghost-primary" size="extra-large" />}
      </div>
   );
};

export default MyRecipesContainer;
