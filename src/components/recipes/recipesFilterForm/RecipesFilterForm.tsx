import { Controller, useForm } from 'react-hook-form';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from '@/components/recipes/recipesFilterForm/RecipesFilterForm.module.scss';
import RecipesSearchBar from '@/components/recipes/recipesSearchBar/RecipesSearchBar';
import ListWrapper from '@/components/recipes/recipesFilterForm/ListWrapper';
import RangeWrapper from '@/components/recipes/recipesFilterForm/RangeWrapper';
import TagCheckbox from '@/components/core/tagCheckbox/TagCheckbox';
import {
   proteinsMarks,
   caloriesMarks,
   carbsMarks,
   fatsMarks,
   handleStyle,
   trackStyle,
   railStyle,
} from '@/components/recipes/recipesFilterForm/filterData';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { getRecipes } from '@/store/recipes/getRecipes';
import { clearState, setSearchName } from '@/store/recipes/RecipesSlice';
import { times, tags, meals, diets } from '@/utils/data/recipes';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

interface FilterValue {
   name: string;
   caloriesRange: number[];
   proteinsRange: number[];
   carbsRange: number[];
   fatsRange: number[];
   time: string;
   meals: string[];
   tags: string[];
   diets: string[];
}

const RecipesFilterForm = () => {
   const dispatch = useAppDispatch();
   const { register, handleSubmit, control, watch } = useForm<FilterValue>();

   const onSubmit = async ({ name, caloriesRange, time }: FilterValue) => {
      if (name) {
         dispatch(setSearchName(name));
         dispatch(getRecipes({ name }));
      } else {
         dispatch(clearState());
      }
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
                        step={10}
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
            </div>
         </div>
      </form>
   );
};

export default RecipesFilterForm;
