import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useDispatch } from "react-redux";
  import { AppDispatch } from "../store/store";
  import { addhabit } from "../store/habit_slice";
  
  const Add_Habit = () => {
    const [name, setname] = useState<string>("");
    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
    const dispatch = useDispatch<AppDispatch>();
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (name.trim()) {
        dispatch(
          addhabit({
            name,
            frequency,
          })
        );
      }
      setname("");
    };
  
    return (
      <Container maxWidth="sm" sx={{ mt: 10, color: "white" }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              color: "white",
            }}
          >
            <TextField
              label="Habit Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter Habit Name"
              fullWidth={true}
              sx={{
                my: 1,
              }}
            />
  
            <FormControl>
              <InputLabel sx={{ fontWeight: 600, fontSize: "20px", color: "white" }}>
                Frequency
              </InputLabel>
              <Select
                sx={{
                  my: 3,
                }}
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Add Habit
            </Button>
          </Box>
        </form>
      </Container>
    );
  };
  
  export default Add_Habit;
  