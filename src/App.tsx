import React, { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { FaAngleDown } from "react-icons/fa";
import "./App.css";
interface Task {
  id: number;
  text: string;
  isDone: boolean;
}
const todoBaseData: Task[] = [
  { id: 1, text: "Тестовое задание", isDone: false },
  { id: 2, text: "Прекрасный код", isDone: true },
  { id: 3, text: "Покрытие тестами", isDone: false },
];
const App = () => {
  const [value, setValue] = useState<string>("");
  const [todoData, setTodoData] = useState<Task[]>(todoBaseData);
  const [filter, setFilter] = useState<string>("All");
  const changeDone = (id: number) => {
    setTodoData(
      todoData.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };
  const clearCompleted = () => {
    setTodoData(todoData.filter((task) => task.isDone !== true));
  };
  const addTask = (newTask: string) => {
    if (value) {
      setTodoData([
        ...todoData,
        { id: todoData.length + 1, text: newTask, isDone: false },
      ]);
      setValue("");
    }
  };
  const filterData = todoData.filter((task) => {
    if (filter === "Active") return !task.isDone;
    if (filter === "Completed") return task.isDone;
    return true;
  });
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="text-7xl text-pink-200 font-thin mb-8">todos</div>
      <div className="max-w-[550px] w-full mx-auto shadow-2xl bg-white ">
        <div className="min-h-[60px] pl-5 flex items-center space-x-2 justify-center border-b border-black-500 w-full">
          <div>
            <FaAngleDown
              size={"25px"}
              className="opacity-30"
              onClick={() => addTask(value)}
            />
          </div>
          <input
            className="card__input w-full p-2 border-none outline-none"
            type="text"
            placeholder="What needs to be done?"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask(value);
              }
            }}
            onChange={(e) => setValue(e.currentTarget.value)}
            value={value}
          />
        </div>

        <ul className="w-[100%]">
          {filterData.map((task) => (
            <li
              className="max-h-screen min-h-16 flex items-center space-x-2 border-b border-black-200 w-[100%] pl-3"
              key={task.id}
            >
              <div
                className={
                  task.isDone
                    ? "min-w-10 min-h-10 rounded-full border border-green-200 flex items-center justify-center"
                    : "min-w-10 min-h-10 rounded-full border border-black-100 flex items-center justify-center"
                }
                onClick={() => changeDone(task.id)}
              >
                {task.isDone ? <FcCheckmark size={"23px"} /> : ""}
              </div>
              <div
                className={
                  task.isDone ? "opacity-25 line-through hover:cursor-none" : ""
                }
              >
                {task.text}
              </div>
            </li>
          ))}
        </ul>
        <div className="card__nav flex justify-between items-center m-2">
          <div className="card__left">
            {todoData.filter((task) => !task.isDone).length} items left
          </div>
          <div className="card__filters flex space-x-4">
            <button
              className={
                filter === "All"
                  ? "border border-red-200 rounded py-1 px-2"
                  : ""
              }
              onClick={() => {
                setFilter("All");
              }}
            >
              All
            </button>
            <button
              className={
                filter === "Active"
                  ? "border border-red-200 rounded py-1 px-2"
                  : ""
              }
              onClick={() => {
                setFilter("Active");
              }}
            >
              Active
            </button>
            <button
              className={
                filter === "Completed"
                  ? "border border-red-200 rounded py-1 px-2"
                  : ""
              }
              onClick={() => {
                setFilter("Completed");
              }}
            >
              Completed
            </button>
          </div>
          <button
            className="clear__completed"
            onClick={() => {
              clearCompleted();
            }}
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
