import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todoText, setTodoText] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const onKeyUpHandler = (g) => {
    if (g.key !== "Enter") return;
    if (todoInput !== "") {
      setTodoText([{ title: todoInput, completed: false }, ...todoText]);
      setTodoInput("");
    } else {
      alert("Tod cannot be empty");
    }
  };
  const deleteTodo = (idx) => {
    todoText.splice(idx, 1);
    setTodoText([...todoText]);
  };

  const markTodo = (idx) => {
    todoText[idx].completed = !todoText[idx].completed;
    setTodoText([...todoText]);
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const title = todoText[idx].title;
    const completed = todoText[idx].completed;
    todoText[idx].title = todoText[idx - 1].title;
    todoText[idx].completed = todoText[idx - 1].completed;
    todoText[idx - 1].title = title;
    todoText[idx - 1].completed = completed;
    setTodoText([...todoText]);
  };

  const moveDown = (idx) => {
    if (idx === todoText.length - 1) return;
    const title = todoText[idx].title;
    const completed = todoText[idx].completed;
    todoText[idx].title = todoText[idx + 1].title;
    todoText[idx].completed = todoText[idx + 1].completed;
    todoText[idx + 1].title = title;
    todoText[idx + 1].completed = completed;
    setTodoText([...todoText]);
  };

  const savetodo = () => {
    const todoTextstr = JSON.stringify(todoText);
    localStorage.setItem("todotextlist", todoTextstr);
  };
  const [data, setdata] = useState(true);
  useEffect(() => {
    if (data) {
      setdata(false);
      return;
    }
    savetodo();
  }, [todoText]);

  useEffect(() => {
    const todoTextstr = localStorage.getItem("todotextlist");
    if (!todoTextstr) setTodoText([]);
    setTodoText(JSON.parse(todoTextstr));
  }, []);

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
          onKeyUp={onKeyUpHandler}
        />
        {/* Todos */}
        {todoText.map((todo, i) => (
          <Todo
            title={todo.title}
            completed={todo.completed}
            DELETE={() => deleteTodo(i)}
            MARK={() => markTodo(i)}
            MOVEUP={() => moveUp(i)}
            MOVEDOWN={() => moveDown(i)}
          />
        ))}
        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todoText.length}) </span>
          <span className="text-warning">
            Pending ({todoText.filter((x) => x.completed === false).length}){" "}
          </span>
          <span className="text-success">
            Completed ({todoText.filter((x) => x.completed).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Wasan Santichaiphonkul 640610667
        </p>
      </div>
    </div>
  );
}
