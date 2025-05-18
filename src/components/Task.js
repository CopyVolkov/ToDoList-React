import React from "react";
import { useState, useEffect } from "react";
import CheckBox from "./CheckBox";
import trash from "../assets/trash.svg";

const Task = ({ tasks = [], deleteData }) => {
  const [animatedIds, setAnimatedIds] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    const newIds = tasks.map((t) => t.id);
    const unseenIds = newIds.filter((id) => !animatedIds.includes(id));

    if (unseenIds.length > 0) {
      setTimeout(() => {
        setAnimatedIds((prev) => [...prev, ...unseenIds]);
      }, 50);
    }
  }, [tasks, animatedIds]);

  const handleDelete = (id) => {
    setRemovingId(id);

    // Esperar la animación antes de eliminar
    setTimeout(() => {
      deleteData(id);
      setRemovingId(null);
      // Opcional: limpiar también de animatedIds si deseas reanimar si se vuelve a agregar
      setAnimatedIds((prev) => prev.filter((el) => el !== id));
    }, 300); // mismo tiempo que tu CSS transition (0.3s)
  };

  return (
    <section className="taskContainer">
      {tasks.map((task) => {
        const isAnimated = animatedIds.includes(task.id);
        const isRemoving = removingId === task.id;

        return (
          <div
            key={task.id}
            className={`rowContainer ${
              isRemoving ? "taskRemoving" : isAnimated ? "taskAfter" : ""
            }`}
          >
            <article>
              <CheckBox label={task.task} id={task.id} />
            </article>
            <div>
              <button onClick={() => handleDelete(task.id)}>
                <img src={trash} alt="Delete" />
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Task;
