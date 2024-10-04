import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { toggleHabit, deleteHabit, Habit } from "../store/habit_slice";

const HabitList = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch();

  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit: Habit) => {
    let streak = 0;
    let currentDate = new Date();

    while (
      habit.completedDates.includes(currentDate.toISOString().split("T")[0])
    ) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return streak;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2", mt: 4 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={3} sx={{ p: 2 }}>
          <Grid container alignItems="center">
            <Grid xs={12} sm={6}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                {habit.frequency}
              </Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="contained"
                  color={
                    habit.completedDates.includes(today) ? "success" : "primary"
                  }
                  startIcon={<CheckCircleIcon />}
                  onClick={() =>
                    dispatch(toggleHabit({ id: habit.id, date: today }))
                  }
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => dispatch(deleteHabit({ id: habit.id }))}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Streak: {getStreak(habit)} days
              </Typography>
              <LinearProgress
                variant="determinate"
                sx={{ mt: 1 }}
                value={(getStreak(habit) / 30) * 100}
              />
            </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
