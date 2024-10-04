import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addhabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Math.random().toString(36).substr(2, 9),
        name: action.payload.name,
        completedDates: [],
        frequency: action.payload.frequency,
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },

    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find(
        (habit) => habit.id === action.payload.id
      );

      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },

    deleteHabit: (state, action: PayloadAction<{ id: string }>) => {
      const newHabit = state.habits.filter(
        (habit) => habit.id !== action.payload.id
      );
      state.habits = newHabit;
    },
  },
});

export const { addhabit, toggleHabit, deleteHabit } = habitSlice.actions;
export const habitReducer = habitSlice.reducer;

export interface Habit {
  id: string;
  name: string;
  completedDates: string[];
  frequency: "daily" | "weekly";
  createdAt: string;
}

export interface HabitState {
  habits: Habit[];
}
