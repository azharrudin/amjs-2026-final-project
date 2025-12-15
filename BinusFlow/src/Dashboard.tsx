import {useEffect, useState} from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {createRoot} from "react-dom/client";
import ModalContent from "./components/NewTaskModal";
import UpdateModalContent from "./components/UpdateTaskModal";
import DeleteModalContent from "./components/DeleteElementModal";
import DeleteAllModalContent from "./components/DeleteAllElementModal";
import { useColors } from "./types/colors.context";

interface Todo {
  title: string;
  description: string;
  color?: string;
  status?: "To Do" | "In Progress" | "Done";
  onclick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  id: number;
}

const MySwal = withReactContent(Swal);

function Dashboard() {
  const [tasks, setTaskss] = useState<Todo[]>([]);
  const {colors} = useColors();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [trashVisibility, setTrashVisibility] = useState<boolean>(false);
  const [draggedTask, setDraggedTask] = useState<number | null>(null);
  const openModal = () => {
    MySwal.fire({
      html: '<div id="react-modal"></div>',
      showConfirmButton: false,
      width: 700,
      background: "#0019A8",
      customClass: {
        popup: "rounded-lg p-6",
      },
      didOpen: () => {
        const container = document.getElementById("react-modal");
        if (container) {
          const root = createRoot(container);
          root.render(
            <ModalContent
              colors={colors}
              onCancel={() => Swal.close()}
              onSave={() => {
                console.log("Saved!");
                Swal.close();
              }}
            />
          );
        }
      },
    });
  };

  useEffect(() => {
    setTaskss([]);
    for (let i: number = 0; i < 5; i++) {
      setTaskss((prev) => {
        const newtasks = [...prev];
        newtasks.push({
          title: `Task ${i + 1}`,
          description: `Description for Task ${i + 1}`,
          color: Math.random() > 0.5 ? "#2DD94C" : "#DBF518",
          status: "To Do",
          id: i,
        });
        return newtasks;
      });
    }
  }, []);
  const openDeleteAllModal = () => {
    MySwal.fire({
      html: '<div id="react-modal"></div>',
      showConfirmButton: false,
      width: 700,
      background: "#0019A8",
      customClass: {
        popup: "rounded-lg p-6",
      },
      didOpen: () => {
        const container = document.getElementById("react-modal");
        if (container) {
          const root = createRoot(container);
          root.render(
            <DeleteAllModalContent
              onCancel={() => Swal.close()}
              onSave={() => {
                console.log("Saved!");
                Swal.close();
              }}
            />
          );
        }
      },
    });
  };
  const opeDeletenModal = () => {
    const selected = tasks.filter((value) => value.id === expandedId);
    MySwal.fire({
      html: '<div id="react-modal"></div>',
      showConfirmButton: false,
      width: 700,
      background: "#0019A8",
      customClass: {
        popup: "rounded-lg p-6",
      },
      didOpen: () => {
        const container = document.getElementById("react-modal");
        if (container) {
          const root = createRoot(container);
          root.render(
            <DeleteModalContent
              onCancel={() => Swal.close()}
              onSave={() => {
                setTaskss((prev) => {
                  const updated = prev.filter((task) => task.id !== expandedId);
                  console.log(updated);
                  return updated;
                });
                console.log("Deleted...!");
                Swal.close();
              }}
              title={selected[0]?.title ?? ""}
            />
          );
        }
      },
    });
  };

  const openUpdateTaskModal = (el: HTMLElement, id: number) => {
    MySwal.fire({
      html: '<div id="react-modal"></div>',
      showConfirmButton: false,
      width: 700,
      background: "#0019A8",
      customClass: {
        popup: "rounded-lg p-6",
      },
      didOpen: () => {
        const container = document.getElementById("react-modal");
        if (container) {
          const root = createRoot(container);
          root.render(
            <UpdateModalContent
              data={(() => {
                const sel = tasks.find((t) => t.id === id);
                return sel
                  ? {
                      status: sel.status ?? "To Do",
                      title: sel.title,
                      description: sel.description,
                    }
                  : {status: "To Do", title: "", description: ""};
              })()}
              onCancel={() => Swal.close()}
              onSave={(data: {
                status: string;
                title: string;
                description: string;
              }) => {
                setTaskss((prev) => {
                  const updated = prev.map((task) => {
                    if (task.id === id) {
                      return {
                        ...task,
                        description: data.description,
                        title: data.title,
                        status: data.status as "To Do" | "In Progress" | "Done",
                      };
                    }
                    return task;
                  });
                  console.log(updated);
                  return updated;
                });
                console.log(tasks);
                alert(data.status + " Saved!");
                Swal.close();
              }}
            />
          );
        }
      },
    });
  };

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent,
    newStatus: "To Do" | "In Progress" | "Done"
  ) => {
    e.preventDefault();
    if (draggedTask !== null) {
      setTaskss((prev) => {
        return prev.map((task) => {
          if (task.id === draggedTask) {
            return {...task, status: newStatus};
          }
          return task;
        });
      });
      setDraggedTask(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  return (
    <>
      <div
        className="py-2 px-4 ps-3  "
        style={{marginLeft: "5px", width: "100%"}}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "12px",
            padding: "8px",
            backgroundColor: "#F5E6D3",
            borderRadius: "16px",
            maxHeight: "72px",
            maxWidth: "900px",
            width: "100%",
            margin: "0 auto",
          }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: "40vw",
              padding: "8px 15px",
              paddingLeft: "16px",
              fontSize: "12px",
              border: "none",
              borderRadius: "24px",
              backgroundColor: "#0052FF",
              color: "white",
              outline: "none",
            }}
          />
          <button
            onClick={() => {
              openModal();
            }}
            style={{
              width: "25px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "#0052FF",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
            }}>
            +
          </button>
          <button
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "#0052FF",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "8px",
            }}
            onClick={() => {
              openDeleteAllModal();
            }}>
            🗑️
          </button>
        </div>
        <div className="d-flex">
          <div
            className="card mx-2 my-4 w-50 p-3 "
            style={{
              backgroundColor: "#F5E6D3",
            }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "To Do")}>
            <p className="w-100 text-center">To Do</p>
            <div className="row">
              {tasks
                .filter((todo) => todo.status === "To Do")
                .map((todo, index) => (
                  <div
                    key={index}
                    className={`col col-sm-6 mb-3 task-${index}`}>
                    <div
                      className="p-3 text-center"
                      draggable
                      onDragStart={(e) => handleDragStart(e, todo.id)}
                      onDragEnd={handleDragEnd}
                      style={{
                        borderRadius: "8px",
                        height: expandedId === todo.id ? "90px" : "75px",
                        width: expandedId === todo.id ? "170px" : "auto",
                        zIndex: expandedId === todo.id ? 1000 : 1,
                        position: "relative",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        backgroundColor: todo.color,
                        cursor: draggedTask === todo.id ? "grabbing" : "grab",
                        opacity: draggedTask === todo.id ? 0.5 : 1,
                      }}
                      onClick={(e) => {
                        setExpandedId(todo.id);
                        setTrashVisibility(true);
                      }}
                      onDoubleClick={(e) => {
                        setExpandedId(null);
                        setTrashVisibility(false);
                        openUpdateTaskModal(e.currentTarget, todo.id);
                      }}>
                      {expandedId === todo.id && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-10px",
                            right: "-10px",
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            backgroundColor: "#FF4444",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                            zIndex: 10,
                          }}
                          onClick={() => {
                            opeDeletenModal();
                          }}>
                          🗑️
                        </div>
                      )}
                      {todo?.title}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div
            className="card mx-2 my-4 w-50 p-3"
            style={{backgroundColor: "#F5E6D3"}}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "In Progress")}>
            <p className="w-100 text-center">In Progress</p>
            <div className="row">
              {tasks
                .filter((todo) => todo.status === "In Progress")
                .map((todo, index) => (
                  <div
                    key={index}
                    className={`col col-sm-6 mb-3 task-${index}`}>
                    <div
                      className="p-3 text-center"
                      draggable
                      onDragStart={(e) => handleDragStart(e, todo.id)}
                      onDragEnd={handleDragEnd}
                      style={{
                        borderRadius: "8px",
                        height: expandedId === todo.id ? "90px" : "75px",
                        width: expandedId === todo.id ? "200px" : "auto",
                        zIndex: expandedId === todo.id ? 1000 : 1,
                        position: "relative",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        backgroundColor: todo.color,
                        cursor: draggedTask === todo.id ? "grabbing" : "grab",
                        opacity: draggedTask === todo.id ? 0.5 : 1,
                      }}
                      onClick={(e) => {
                        setExpandedId(todo.id);
                        setTrashVisibility(true);
                      }}
                      onDoubleClick={(e) => {
                        setExpandedId(null);
                        setTrashVisibility(false);
                        openUpdateTaskModal(e.currentTarget, todo.id);
                      }}>
                      {expandedId === todo.id && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-10px",
                            right: "-10px",
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            backgroundColor: "#FF4444",
                            border: "3px solid #333",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                            zIndex: 10,
                          }}>
                          🗑️
                        </div>
                      )}
                      {todo?.title}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div
            className="card mx-2 my-4 w-50 p-3 "
            style={{backgroundColor: "#F5E6D3", height: "83vh"}}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Done")}>
            <p className="w-100 text-center">Done</p>
            <div className="row">
              {tasks
                .filter((todo) => todo.status === "Done")
                .map((todo, index) => (
                  <div
                    key={index}
                    className={`col col-sm-6 mb-3 task-${index}`}>
                    <div
                      className="p-3 text-center"
                      draggable
                      onDragStart={(e) => handleDragStart(e, todo.id)}
                      onDragEnd={handleDragEnd}
                      style={{
                        borderRadius: "8px",
                        height: expandedId === todo.id ? "90px" : "75px",
                        width: expandedId === todo.id ? "200px" : "auto",
                        zIndex: expandedId === todo.id ? 1000 : 1,
                        position: "relative",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        backgroundColor: todo.color,
                        cursor: draggedTask === todo.id ? "grabbing" : "grab",
                        opacity: draggedTask === todo.id ? 0.5 : 1,
                      }}
                      onClick={(e) => {
                        setExpandedId(todo.id);
                        setTrashVisibility(true);
                      }}
                      onDoubleClick={(e) => {
                        setExpandedId(null);
                        setTrashVisibility(false);
                        openUpdateTaskModal(e.currentTarget, todo.id);
                      }}>
                      {expandedId === todo.id && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-10px",
                            right: "-10px",
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            backgroundColor: "#FF4444",
                            border: "3px solid #333",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                            zIndex: 10,
                          }}>
                          🗑️
                        </div>
                      )}
                      {todo?.title}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
