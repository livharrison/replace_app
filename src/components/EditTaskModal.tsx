import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import CustomNumberField from "./CustomNumberField";
import { Dayjs } from "dayjs";
import React from "react";
import { Colors } from "../Dashboard";
import Task from "../model/Task";

interface ModalProps {
  closeModal: () => void;
  saveChanges: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  task: Task | null;
}

const EditTaskModal = (props: ModalProps) => {
  const [freqValue, setFreqValue] = React.useState(
    props.task?.frequency_val || 1
  );
  const [freqUnit, setFreqUnit] = React.useState(
    props.task?.frequency_unit || "day"
  );
  const [name, setName] = React.useState(props.task?.name || "");
  const [description, setDescription] = React.useState(
    props.task?.description || ""
  );
  const [dueDate, setDueDate] = React.useState<Dayjs | null>(
    props.task?.nextNotif || null
  );
  const [selectedColor, setSelectedColor] = React.useState<keyof typeof Colors>(
    (props.task?.color as keyof typeof Colors) || "blue"
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value as keyof typeof Colors);
  };

  const handleTimeUnitChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFreqUnit(event.target.value);
  };

  const saveButtonDisabled = (): boolean => {
    return !name || !dueDate;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (dueDate && props.task) {
      props.saveChanges(
        new Task(
          name,
          description,
          freqValue,
          freqUnit,
          dueDate,
          selectedColor,
          props.task.id
        )
      );
    }
    props.closeModal();
  };

  const onClickDelete = () => {
    console.log("here's the id:");
    console.log(props.task?.id);
    props.deleteTask(props.task?.id || -1);
    props.closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="m-8">
      <div className="space-y-12">
        <div>
          <h2 className="text-base/7 font-semibold text-gray-900">Your Task</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            View and edit the details of your task.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={description}
                  onChange={handleDescChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="due-date"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Next Due
              </label>
              <div className="mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Select your next due date"
                      disablePast={true}
                      value={dueDate}
                      onChange={(newDate) => setDueDate(newDate)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>

            <div className="col-span-full">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Frequency
              </h2>
              <div className="flex space-x-4 items-center">
                <p>Every</p>
                <CustomNumberField
                  value={freqValue}
                  onValueChange={(newVal) => setFreqValue(newVal)}
                />
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="freq"
                    name="freq"
                    autoComplete="frequency"
                    value={freqUnit}
                    onChange={handleTimeUnitChange}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value="day">
                      {freqValue > 1 ? "days" : "day"}
                    </option>
                    <option value="week">
                      {freqValue > 1 ? "weeks" : "week"}
                    </option>
                    <option value="month">
                      {freqValue > 1 ? "months" : "month"}
                    </option>
                    <option value="year">
                      {freqValue > 1 ? "years" : "year"}
                    </option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">
                Color
              </legend>
              <div className="mt-6 space-y-6">
                {Object.entries(Colors).map(([colorName, colorValues]) => (
                  <div key={colorName} className="flex items-center gap-x-3">
                    <input
                      id={colorName}
                      name="color-options"
                      type="radio"
                      value={colorName}
                      checked={selectedColor === colorName}
                      onChange={handleColorChange}
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                    />
                    <label
                      htmlFor={colorName}
                      className="block text-sm/6 font-medium"
                      style={{ color: colorValues.dk }} // Use dark color
                    >
                      {colorName.charAt(0).toUpperCase() + colorName.slice(1)}
                      {/* Capitalize first letter */}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm/6 font-semibold text-red-700 hover:bg-red-50 px-3 py-2 rounded-md"
          onClick={onClickDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="text-sm/6 font-semibold text-gray-900"
          onClick={props.closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saveButtonDisabled()}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditTaskModal;
