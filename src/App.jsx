import { v4 } from 'uuid';
import AddTask from "./components/AddTask"
import Task from "./components/Tasks"
import { useEffect, useState } from "react";
import Title from './components/Title';


function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // useEffect(() => {
  //   const fatchTask = async () => {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', { method: 'GET' });
  //     const data = await response.json();
  //     setTasks(data);
  //   };
  //   fatchTask();
  // }, []);

  // Task
  function onTaskClick(taskId) {
    const newTask = tasks.map((task) => {
      if (task.id === taskId) return { ...task, isCompleted: !task.isCompleted }
      return task;
    });

    setTasks(newTask);
  }

  // Task
  function onDeleteTaskClick(taskId) {
    const newTask = tasks.filter((task) => task.id !== taskId);
    setTasks(newTask);
  }

  // AddTask
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen min-h-screen bg-slate-500 flex flex-col items-center p-6">

      <div className="w-full max-w-md space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Task tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick} />
      </div>
    </div>
  )
}

export default App;
