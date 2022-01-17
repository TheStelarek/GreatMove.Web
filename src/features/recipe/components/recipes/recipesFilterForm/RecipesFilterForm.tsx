import { Controller, useForm } from 'react-hook-form';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import TagCheckbox from '@/components/core/tagCheckbox/TagCheckbox';
import styles from '@/features/recipe/components/recipes/recipesFilterForm/RecipesFilterForm.module.scss';
import RecipesSearchBar from '@/features/recipe/components/recipes/recipesSearchBar/RecipesSearchBar';
import ListWrapper from '@/features/recipe/components/recipes/recipesFilterForm/ListWrapper';
import RangeWrapper from '@/features/recipe/components/recipes/recipesFilterForm/RangeWrapper';
import {
   proteinsMarks,
   caloriesMarks,
   carbsMarks,
   fatsMarks,
   handleStyle,
   trackStyle,
   railStyle,
   FilterValue,
} from '@/features/recipe/components/recipes/recipesFilterForm/filterData';
import { getRecipes } from '@/features/recipe/store/getRecipes';
import { clearStatuses, setFilters } from '@/features/recipe/store/RecipesSlice';
import { times, tags, meals, diets } from '@/features/recipe/utils/data';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const RecipesFilterForm = () => {
   const dispatch = useAppDispatch();
   const { register, handleSubmit, control, watch } = useForm<FilterValue>();

   const onSubmit = (data: FilterValue) => {
      dispatch(clearStatuses());
      dispatch(getRecipes({ ...data }));
      dispatch(setFilters(data));
   };

   const calories = watch(`caloriesRange`, [300, 500]);
   const proteins = watch(`proteinsRange`, [10, 50]);
   const carbs = watch(`carbsRange`, [30, 60]);
   const fats = watch(`fatsRange`, [5, 15]);

   return (
      <form className={styles.filterContainer} onSubmit={handleSubmit(onSubmit)}>
         <RecipesSearchBar {...register(`name`)} />
         <div className={styles.filters}>
            <RangeWrapper title="Calories Range" range={calories}>
               <Controller
                  control={control}
                  name="caloriesRange"
                  defaultValue={[300, 500]}
                  render={({ field: { onChange, value } }) => (
                     <Range
                        min={0}
                        max={2000}
                        step={5}
                        defaultValue={value}
                        marks={caloriesMarks}
                        tipFormatter={(v) => `${v}`}
                        onAfterChange={onChange}
                        trackStyle={trackStyle}
                        handleStyle={handleStyle}
                        railStyle={railStyle}
                     />
                  )}
               />
            </RangeWrapper>
            <RangeWrapper title="Proteins Range" range={proteins}>
               <Controller
                  control={control}
                  name="proteinsRange"
                  defaultValue={[10, 50]}
                  render={({ field: { onChange, value } }) => (
                     <Range
                        min={0}
                        max={200}
                        step={2}
                        defaultValue={value}
                        marks={proteinsMarks}
                        tipFormatter={(v) => `${v}`}
                        onAfterChange={onChange}
                        trackStyle={trackStyle}
                        handleStyle={handleStyle}
                        railStyle={railStyle}
                     />
                  )}
               />
            </RangeWrapper>
            <RangeWrapper title="Carbs Range" range={carbs}>
               <Controller
                  control={control}
                  name="carbsRange"
                  defaultValue={[30, 60]}
                  render={({ field: { onChange, value } }) => (
                     <Range
                        min={0}
                        max={400}
                        step={5}
                        defaultValue={value}
                        marks={carbsMarks}
                        tipFormatter={(v) => `${v}`}
                        onAfterChange={onChange}
                        trackStyle={trackStyle}
                        handleStyle={handleStyle}
                        railStyle={railStyle}
                     />
                  )}
               />
            </RangeWrapper>
            <RangeWrapper title="Fats Range" range={fats}>
               <Controller
                  control={control}
                  name="fatsRange"
                  defaultValue={[5, 15]}
                  render={({ field: { onChange, value } }) => (
                     <Range
                        min={0}
                        max={200}
                        step={2}
                        defaultValue={value}
                        marks={fatsMarks}
                        tipFormatter={(v) => `${v}`}
                        onAfterChange={onChange}
                        trackStyle={trackStyle}
                        handleStyle={handleStyle}
                        railStyle={railStyle}
                     />
                  )}
               />
            </RangeWrapper>
            <div className={styles.tags}>
               <ListWrapper title="Estimated time">
                  {times.map(({ value, label }) => (
                     <TagCheckbox key={value} type="radio" value={value} {...register(`time`)} label={label} />
                  ))}
               </ListWrapper>
               <ListWrapper title="Meal">
                  {meals.map((meal) => (
                     <TagCheckbox key={meal} type="checkbox" value={meal} {...register(`meals`)} label={meal} />
                  ))}
               </ListWrapper>
               <ListWrapper title="Diet">
                  {diets.map((diet) => (
                     <TagCheckbox key={diet} type="checkbox" value={diet} {...register(`diets`)} label={diet} />
                  ))}
               </ListWrapper>
               <ListWrapper title="Tags">
                  {tags.map((tag) => (
                     <TagCheckbox key={tag} type="checkbox" value={tag} {...register(`tags`)} label={tag} />
                  ))}
               </ListWrapper>
               <button type="submit" className={styles.searchBtn}>
                  Search
               </button>
            </div>
         </div>
      </form>
   );
};

export default RecipesFilterForm;
