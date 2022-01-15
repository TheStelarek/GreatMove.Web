import { useState, FC, SetStateAction, Dispatch } from 'react';
import { useCombobox } from 'downshift';
import cx from 'classnames';
import debounce from 'lodash.debounce';
import Input from '@/components/core/input/Input';
import { apiClient } from '@/api/apiClient';
import styles from '@/features/trainingPlan/components/createTrainingPlan/searchExerciseInput/SearchExerciseInput.module.scss';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { addExercise } from '@/features/trainingPlan/store/TrainingPlanSlice';
import { ExerciseType } from '@/features/trainingPlan/utils/types/ExerciseType';

interface SearchExerciseProps {
   setShowInput: Dispatch<SetStateAction<boolean>>;
   trainingDayId: string;
}

const SearchExerciseInput: FC<SearchExerciseProps> = ({ setShowInput, trainingDayId }) => {
   const dispatch = useAppDispatch();
   const [matchingExercises, setMatchingExercises] = useState<Array<ExerciseType>>([]);

   const getMatchingExercises = debounce(async ({ inputValue }) => {
      if (!inputValue) {
         setMatchingExercises([]);
         return;
      }
      const response = await apiClient.get(`/exercises?take=8&skip=0&name=${inputValue}`);
      setMatchingExercises(response.data.data);
   }, 500);

   const { isOpen, getMenuProps, getInputProps, getComboboxProps, getItemProps, closeMenu } = useCombobox({
      items: matchingExercises,
      onInputValueChange: getMatchingExercises,
   });

   const addExerciseToTraining = (name: string, exerciseId: string) => {
      dispatch(
         addExercise({
            columnId: trainingDayId,
            name,
            exerciseId,
         }),
      );
   };

   const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === `Enter`) {
         closeMenu();
         setShowInput(false);
         if (matchingExercises.length) addExerciseToTraining(matchingExercises[0].name, matchingExercises[0].id);
      }
   };

   return (
      <div className={styles.searchWrapper} {...getComboboxProps()}>
         <Input
            autoFocus
            autocomplete={false}
            radius={5}
            size="small"
            placeholder="Add new exercise"
            onKeyPress={handleKeyPress}
            {...getInputProps()}
         />
         <ul
            className={cx(styles.searchResults, isOpen && matchingExercises.length && styles.searchResultsVisible)}
            aria-label="results"
            {...getMenuProps()}
         >
            {isOpen &&
               matchingExercises.map((item, index) => (
                  <li
                     className={styles.searchResultsItem}
                     key={item.id}
                     {...getItemProps({
                        item,
                        index,
                        onClick: () => {
                           setShowInput(false);
                           addExerciseToTraining(item.name, item.id);
                        },
                     })}
                  >
                     {item.name}
                  </li>
               ))}
         </ul>
      </div>
   );
};

export default SearchExerciseInput;
