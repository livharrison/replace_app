import { IoTimerOutline, IoCalendarOutline } from "react-icons/io5";
import { Dayjs } from "dayjs";

interface Props {
  name: string;
  dueDate: Dayjs;
  frequency_val: number;
  frequency_unit: string;
  color: { lt: string; dk: string };
}

const TaskComponent = ({
  name,
  dueDate,
  frequency_val,
  frequency_unit,
  color,
}: Props) => {
  return (
    <div
      className={`border rounded-md p-4 transition-all duration-500 hover:shadow-lg hover:cursor-pointer`}
      style={{
        backgroundColor: color.lt,
        borderColor: color.dk,
        color: color.dk,
      }}
    >
      <h2 className="font-semibold text-2xl">{name}</h2>
      <div className="mt-3">
        <div className="flex items-center space-x-2 mb-2">
          <IoTimerOutline className="text-xl" />
          <p>Due {dueDate.format("MMM D, YYYY")}</p>
        </div>
        <div className="flex items-center space-x-2">
          <IoCalendarOutline className="text-xl" />
          <p>{`Every ${frequency_val} ${frequency_unit}${
            frequency_val > 1 ? "s" : ""
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
