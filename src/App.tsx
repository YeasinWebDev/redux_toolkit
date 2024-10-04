import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store/store";
import { Container, Typography } from '@mui/material'
import Add_Habit from "./components/Add_Habit";
import HabitList from "./components/HabitList";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Container maxWidth="md">
          <Typography
            component={"h1"}
            variant="h3"
            align="center"
            fontWeight="600"
          >
            Habit Tracker
          </Typography>
          <Add_Habit/>
          <HabitList/>
        </Container>
      </Provider>
    </div>
  );
}

export default App;
