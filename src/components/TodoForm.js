import React, { useState } from "react";
import plus from "../assets/plus2.svg";
import Task from "./Task";
const initialForm = {
  task: "",
  id: "",
};

export const TodoForm = ({ createData, updateData, tasks, deleteData }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.task) {
      alert("Por favor ingrese una tarea");
      return;
    }

    if (form.id === null || form.id === "") {
      console.log("Creando tarea:", form);
      createData(form);
      console.log();
    } else {
      console.log("Actualizando tarea:", form);
      updateData(form);
    }

    setForm(initialForm);
    console.log("Formulario reseteado");
    console.log(form);
  };

  return (
    <div className="wrapper">
      <form className="content" onSubmit={handleSubmit}>
        <h2>Daily Tasks</h2>
        <div className="sendArea">
          <input
            type="text"
            placeholder="Add a task"
            name="task"
            value={form.task}
            onChange={handleChange}
          />
          <button className="buttonSend" type="submit">
            <img src={plus} alt="Add" />
          </button>
        </div>
      </form>
        <Task tasks={tasks} deleteData={deleteData}/>
    </div>
  );
};

export default TodoForm;
