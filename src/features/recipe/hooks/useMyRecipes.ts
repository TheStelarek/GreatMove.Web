import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { apiClient } from '@/api/apiClient';
import { Recipe } from '@/features/recipe/utils/types/Recipe';

export default function useMyRecipes() {
   const [recipes, setRecipes] = useState<Recipe[]>();
   const [pageCount, setPageCount] = useState(0);
   const [error, setError] = useState<string>(``);
   const [isLoading, setIsLoading] = useState<boolean>(false);

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

   return { recipes, pageCount, error, isLoading, fetchMyRecipes };
}
