import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ExerciseDetailsType } from '@/features/trainingPlan/utils/types/ExerciseDetailsType';
import { TrainingType } from '@/features/trainingPlan/utils/types/TrainingType';
import type { RootState } from '@/utils/types/RootState';

interface TrainingPlanState {
   training: TrainingType;
   isCreatingPlan: boolean;
}

const initialState: TrainingPlanState = {
   training: {
      '1': {
         name: `Day 1`,
         id: `1`,
         items: [],
      },
   },
   isCreatingPlan: false,
};

export const trainingPlanSlice = createSlice({
   name: `trainingPlan`,
   initialState,
   reducers: {
      createTraining: (state: TrainingPlanState) => {
         state.isCreatingPlan = true;
      },
      discardTraining: (state: TrainingPlanState) => {
         state.isCreatingPlan = false;
         state.training = {
            '1': {
               name: `Day 1`,
               id: `1`,
               items: [],
            },
         };
      },
      addTrainingDay: (state: TrainingPlanState, action: PayloadAction<string>) => {
         const ID = uuidv4();
         const newBoard = {
            id: ID,
            name: action.payload,
            items: [],
         };
         state.training = { ...state.training, [ID]: newBoard };
      },
      removeTrainingDay: (state: TrainingPlanState, action: PayloadAction<string>) => {
         delete state.training[action.payload];
      },
      dragExercise: (state: TrainingPlanState, action: PayloadAction<DropResult>) => {
         const result = action.payload;
         const columns = state.training;
         if (!result.destination) return;
         const { source, destination } = result;

         if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            const updatedTraining: TrainingType = {
               ...columns,
               [source.droppableId]: {
                  ...sourceColumn,
                  items: sourceItems,
               },
               [destination.droppableId]: {
                  ...destColumn,
                  items: destItems,
               },
            };
            state.training = updatedTraining;
         } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            const updatedTraining = {
               ...columns,
               [source.droppableId]: {
                  ...column,
                  items: copiedItems,
               },
            };
            state.training = updatedTraining;
         }
      },
      addExercise: (
         state: TrainingPlanState,
         action: PayloadAction<{ columnId: string; exerciseId: string; name: string }>,
      ) => {
         const ID = uuidv4();
         const { columnId, exerciseId, name } = action.payload;
         const column = state.training[columnId];
         column.items.push({ id: ID, exerciseId, name, details: [] });

         state.training = { ...state.training, [columnId]: column };
      },
      removeExercise: (
         state: TrainingPlanState,
         action: PayloadAction<{ trainingDayId: string; exerciseId: string }>,
      ) => {
         const { trainingDayId, exerciseId } = action.payload;
         const training = state.training[trainingDayId];

         if (training && training.items.length > 0)
            training.items.splice(
               training.items.findIndex((x) => x.id === exerciseId),
               1,
            );
      },
      updateExercise: (
         state: TrainingPlanState,
         action: PayloadAction<{
            trainingDayId: string;
            exerciseId: string;
            setId: string;
            value: string;
            field: 'sets' | 'reps' | 'load' | 'rpe' | 'tempo' | 'rest';
         }>,
      ) => {
         const { trainingDayId, exerciseId, setId, value, field } = action.payload;
         const set = state.training[trainingDayId].items
            .find((exercise) => exercise.id === exerciseId)
            ?.details.find((detail) => detail.id === setId);

         if (set) {
            const fields = {
               sets: () => (set.sets = Number(value)),
               reps: () => (set.reps = Number(value)),
               load: () => (set.load = value),
               rpe: () => (set.rpe = Number(value)),
               tempo: () => (set.tempo = value),
               rest: () => (set.rest = value),
            };
            fields[field]();
         }
      },
      removeSet: (
         state: TrainingPlanState,
         action: PayloadAction<{ trainingDayId: string; exerciseId: string; setId: string }>,
      ) => {
         const { trainingDayId, exerciseId, setId } = action.payload;
         const trainingExercise = state.training[trainingDayId].items.find((exercise) => exercise.id === exerciseId);

         if (trainingExercise)
            trainingExercise.details.splice(
               trainingExercise.details.findIndex((x) => x.id === setId),
               1,
            );
      },
      addNewSet: (state: TrainingPlanState, action: PayloadAction<{ trainingDayId: string; exerciseId: string }>) => {
         const { trainingDayId, exerciseId } = action.payload;
         const trainingExercise = state.training[trainingDayId].items.find((exercise) => exercise.id === exerciseId);
         if (trainingExercise) {
            const newSet: ExerciseDetailsType = {
               id: uuidv4(),
               sets: 0,
               reps: 0,
               load: ``,
               tempo: ``,
               rest: ``,
            };
            trainingExercise.details.push(newSet);
         }
      },
      updateTrainingDayName: (
         state: TrainingPlanState,
         action: PayloadAction<{ trainingDayId: string; name: string }>,
      ) => {
         const { trainingDayId, name } = action.payload;
         const training = state.training[trainingDayId];
         training.name = name;

         state.training = { ...state.training, [trainingDayId]: training };
      },
   },
});

export const {
   createTraining,
   discardTraining,
   addTrainingDay,
   removeTrainingDay,
   updateTrainingDayName,
   dragExercise,
   addExercise,
   removeExercise,
   updateExercise,
   removeSet,
   addNewSet,
} = trainingPlanSlice.actions;

export const trainingPlanSelector = (state: RootState) => state.trainingPlan;
