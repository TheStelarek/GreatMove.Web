import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ExerciseDetailsType } from '@/utils/types/ExerciseDetailsType';
import type { RootState } from '@/store/index';
import { TrainingType } from '@/utils/types/TrainingType';

interface TrainingPlanStates {
   training: TrainingType;
   isCreatingPlan: boolean;
}

const initialState: TrainingPlanStates = {
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
      createTraining: (state: TrainingPlanStates) => {
         state.isCreatingPlan = true;
      },
      addColumn: (state: TrainingPlanStates, action: PayloadAction<string>) => {
         const ID = uuidv4();
         const newBoard = {
            id: ID,
            name: action.payload,
            items: [],
         };
         state.training = { ...state.training, [ID]: newBoard };
      },
      removeColumn: (state: TrainingPlanStates, action: PayloadAction<string>) => {
         delete state.training[action.payload];
      },
      dragExercise: (state: TrainingPlanStates, action: PayloadAction<DropResult>) => {
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
         state: TrainingPlanStates,
         action: PayloadAction<{ columnId: string; exerciseId: string; name: string }>,
      ) => {
         const { columnId, exerciseId, name } = action.payload;
         const column = state.training[columnId];
         column.items.push({ id: exerciseId, name, details: [] });

         state.training = { ...state.training, [columnId]: column };
      },
      removeExercise: (
         state: TrainingPlanStates,
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
         state: TrainingPlanStates,
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
         state: TrainingPlanStates,
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
      addNewSet: (state: TrainingPlanStates, action: PayloadAction<{ trainingDayId: string; exerciseId: string }>) => {
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
      updateTrainingName: (
         state: TrainingPlanStates,
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
   addColumn,
   removeColumn,
   dragExercise,
   addExercise,
   removeExercise,
   updateExercise,
   removeSet,
   addNewSet,
   updateTrainingName,
} = trainingPlanSlice.actions;

export const trainingPlanSelector = (state: RootState) => state.trainingPlan;
