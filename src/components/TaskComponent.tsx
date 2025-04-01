import {
  IoTimerOutline,
  IoCalendarOutline,
  IoPencilSharp,
} from "react-icons/io5";
import Task from "../model/Task";

interface Props {
  task: Task;
  color: { lt: string; dk: string };
}

const TaskComponent = ({ task, color }: Props) => {
  return (
    <div
      className={`group border rounded-md p-4 transition-all duration-500 hover:shadow-lg hover:cursor-pointer text-left`}
      style={{
        backgroundColor: color.lt,
        borderColor: color.dk,
        color: color.dk,
      }}
    >
      <h2 className="font-semibold text-2xl mb-2">{task.name}</h2>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <IoTimerOutline className="text-xl" />
            <p>Due {task.nextNotif.format("MMM D, YYYY")}</p>
          </div>
          <div className="flex items-center space-x-2">
            <IoCalendarOutline className="text-xl" />
            <p>{`Every ${task.frequency_val} ${task.frequency_unit}${
              task.frequency_val > 1 ? "s" : ""
            }`}</p>
          </div>
        </div>
        <button
          className="opacity-0 group-hover:opacity-100 aspect-square h-full hover:shadow-lg hover:scale-105 rounded-full transition-all duration-300 md:p-3 md:ml-0 md:mt-0"
          style={{ backgroundColor: color.dk }}
          onClick={() => {}}
        >
          <div className="flex items-center space-x-2">
            <IoPencilSharp className="text-2xl" style={{ color: color.lt }} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TaskComponent;
