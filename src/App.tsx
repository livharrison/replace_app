import { useState } from "react";
import TaskComponent from "./components/TaskComponent";
import NewTaskModal from "./components/NewTaskModal";
import Task from "./model/Task";
import { IoAddCircle } from "react-icons/io5";
import Dialog from "@mui/material/Dialog";
import dayjs from "dayjs";
import "./App.css";

export const Colors = {
  blue: {
    lt: "#eaf2f8",
    dk: "#5499c0",
  },
  pink: {
    lt: "#fdedec",
    dk: "#f1948a",
  },
  green: {
    lt: "#e8f8f5",
    dk: "#48c9b0",
  },
  orange: {
    lt: "#fdf2e9",
    dk: "#eb984e",
  },
};

type ColorKey = keyof typeof Colors;

function App() {
  // fake data - tasks
  const [tasks, setTasks] = useState<Task[]>([
    new Task(
      "Replace contacts",
      "blah blah description",
      1,
      "month",
      dayjs(),
      "green"
    ),
    new Task(
      "buy water filter",
      "description blah blah",
      2,
      "week",
      dayjs(),
      "orange"
    ),
  ]);

  let [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all md:p-3 md:ml-0 md:mt-0"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <div className="flex items-center space-x-2">
          <IoAddCircle />
          <p>New Task</p>
        </div>
      </button>
      <div className="space-y-4">
        {tasks.map(
          (
            {
              name,
              description,
              frequency_val,
              frequency_unit,
              nextNotif,
              color,
            }: Task,
            index
          ) => (
            <TaskComponent
              name={name}
              key={index}
              frequency_val={frequency_val}
              frequency_unit={frequency_unit}
              dueDate={nextNotif}
              color={Colors[color as ColorKey]}
            />
          )
        )}
      </div>
      <Dialog open={modalOpen}>
        <NewTaskModal closeModal={closeModal} save={addTask} />
      </Dialog>
    </>
  );
}

export default App;
