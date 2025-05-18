import { useState, useEffect } from "react";
import React from "react";
import TodoForm from "./TodoForm";
import helpHttp from "../helpers/helpHttp";
import Message from "./Message";
import Loader from "./Loader";
import Task from "./Task";

export const TodoWrapper = () => {
  const [db, setDb] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createData = (data) => {
    const options = {
      body: { task: data.task }, // no le pongas id
      headers: {
        "Content-Type": "application/json",
      },
    };

    api.post(url, options).then((res) => {
      if (!res.err) {
        // Después de guardar en el servidor, pedimos los datos actualizados
        api.get(url).then((res) => {
          if (!res.err) {
            console.log("📦 Tareas después de crear:", res);
            setDb(res); // actualiza estado con la base real del servidor
          } else {
            setError(res);
          }
        });
      } else {
        setError(res);
      }
    });
  };
  let isDelete = false
  const deleteData = (id) => {
    const isDelete = window.confirm(
      `¿Está seguro de eliminar la tarea con id ${id}?`
    );

    if (isDelete) {
      api.del(`${url}/${id}`, {}).then((res) => {
        if (!res?.err) {
          const newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          console.error("Error al eliminar:", res);
        }
      });
    }
  };

  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  let api = helpHttp();
  let url = "http://localhost:5001/task";

  useEffect(() => {
    api.get(url).then((res) => {
      if (!res.err) {
        setDb(res);
      } else {
        setDb();
      }

      setLoading(false);
    });
  }, []);

  return (
    <div className="form-container">
      <TodoForm
        createData={createData}
        deleteData={deleteData}
        updateData={updateData}
        tasks={db}
      />
      {loading && <Loader />}
      {error && <Message />}
    </div>
  );
};
