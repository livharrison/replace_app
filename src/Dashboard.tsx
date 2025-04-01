import { useState } from "react";
import TaskComponent from "./components/TaskComponent";
import NewTaskModal from "./components/NewTaskModal";
import Task from "./model/Task";
import {
  IoAddCircle,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
import Dialog from "@mui/material/Dialog";
import dayjs from "dayjs";
import EditTaskModal from "./components/EditTaskModal";

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

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    new Task(
      "Replace contacts",
      "blah blah description",
      1,
      "month",
      dayjs(),
      "green",
      500
    ),
    new Task(
      "buy water filter",
      "description blah blah",
      2,
      "week",
      dayjs(),
      "orange",
      501
    ),
  ]);

  let [modalOpen, setModalOpen] = useState(false);
  const [detailedViewOpen, setDetailedViewOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeSort, setActiveSort] = useState<string>("");
  const [abcDescending, setAbcDescending] = useState<boolean>(false);
  const [dueDateDescending, setDueDateDescending] = useState<boolean>(false);

  const onSortClick = (name: string) => {
    if (activeSort == name) {
      // already clicked; change direction
      if (name == "abc") {
        setAbcDescending(!abcDescending);
      } else if (name == "duedate") {
        setDueDateDescending(!dueDateDescending);
      }
    } else {
      // set new
      setActiveSort(name);
    }
  };

  const isActiveSort = (name: string): boolean => {
    if (activeSort) {
      return name == activeSort;
    }
    return false;
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeDetailedView = () => {
    setDetailedViewOpen(false);
  };

  const openDetailedView = (task: Task) => {
    setSelectedTask(task);
    setDetailedViewOpen(true);
  };

  const saveNewTask = (newTask: Task) => {
    // TODO: this will be replaced by DB call
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const saveEditedTask = (editedTask: Task) => {
    // TODO: this will be replaced by DB call
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
  };

  const deleteTask = (taskId: number) => {
    // TODO: this will be replaced by DB call
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg mt-8 p-6 text-gray-500 italic">
        View existing items and add new ones here.
      </div>
      <div className="mt-8 w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex justify-start space-x-4">
            <button
              onClick={() => onSortClick("abc")}
              className={`p-2 bg-gray-100 text-gray-400 rounded-lg text-xs ${
                isActiveSort("abc")
                  ? `border border-2 border-blue-300`
                  : ` border border-gray-300`
              }`}
            >
              <div className="flex items-center">
                ABC
                {abcDescending ? (
                  <IoChevronDownOutline />
                ) : (
                  <IoChevronUpOutline />
                )}
              </div>
            </button>
            <button
              onClick={() => onSortClick("duedate")}
              className={`p-2 bg-gray-100 text-gray-400 rounded-lg text-xs ${
                isActiveSort("duedate")
                  ? `border border-2 border-blue-300`
                  : `border border-gray-300`
              }`}
            >
              <div className="flex items-center">
                DUE DATE
                {dueDateDescending ? (
                  <IoChevronDownOutline />
                ) : (
                  <IoChevronUpOutline />
                )}
              </div>
            </button>
          </div>
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
        </div>
        <div className="space-y-4">
          {[...tasks]
            .sort((a: Task, b: Task) => {
              if (activeSort === "abc") {
                return abcDescending
                  ? b.name.localeCompare(a.name)
                  : a.name.localeCompare(b.name);
              } else if (activeSort === "duedate") {
                return dueDateDescending
                  ? b.nextNotif.valueOf() - a.nextNotif.valueOf()
                  : a.nextNotif.valueOf() - b.nextNotif.valueOf();
              }
              return 0;
            })
            .map((task: Task, index) => (
              <div onClick={() => openDetailedView(task)}>
                <TaskComponent
                  key={index}
                  task={task}
                  color={Colors[task.color as ColorKey]}
                />
              </div>
            ))}
        </div>
        <div className="h-16"></div>
      </div>
      <Dialog onClose={closeModal} open={modalOpen}>
        <NewTaskModal closeModal={closeModal} save={saveNewTask} />
      </Dialog>
      <Dialog open={detailedViewOpen}>
        <EditTaskModal
          task={selectedTask}
          closeModal={closeDetailedView}
          saveChanges={saveEditedTask}
          deleteTask={deleteTask}
        />
      </Dialog>
    </div>
  );
};

export default Dashboard;
