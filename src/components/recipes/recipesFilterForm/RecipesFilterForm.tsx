import { useForm } from 'react-hook-form';
import styles from '@/components/recipes/recipesFilterForm/RecipesFilterForm.module.scss';
import RecipesSearchBar from '@/components/recipes/recipesSearchBar/RecipesSearchBar';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { getRecipes } from '@/store/recipes/getRecipes';
import { clearState, setSearchName } from '@/store/recipes/RecipesSlice';

interface FilterValue {
  name: string;
}

const RecipesFilterForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FilterValue>();

  const onSubmit = async ({ name }: FilterValue) => {
    if (name) {
      dispatch(setSearchName(name));
      dispatch(getRecipes({ name }));
    } else {
      dispatch(clearState());
    }
  };

  return (
    <form className={styles.filterContainer} onSubmit={handleSubmit(onSubmit)}>
      <RecipesSearchBar {...register(`name`)} />
    </form>
  );
};

export default RecipesFilterForm;
