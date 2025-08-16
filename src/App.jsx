import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch {
        setTodos([]);
      }
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleSaveTodo = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log("todo added");
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id != id;
    })
    setTodos(newTodos);
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  return (
    <>
      <div className="todo-app">
        <div className="top">
          <h2>Add a Todo</h2>
        </div>
        <div className="bottom">
          <div className="input">
            <input onChange={handleChange} type="text" value={todo} placeholder="Enter your todo" />
            <button onClick={handleSaveTodo} className="save-btn">Save</button>
          </div>
          <h2 className="your-todo">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className="no-todos">No Todos to Show</div>}
            {todos.map((item) => {
              return <div key={item.id} className="wrapper">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div key={item.id} className="todo">
                  <div className="content" style={{ textDecoration: item.isCompleted ? "line-through" : "" }}>
                    <span>{item.todo}</span>
                  </div>
                  <div className="buttons">
                    <button onClick={(e) => {
                      handleEdit(e, item.id)
                    }} className="edit-btn">Edit</button>
                    <button onClick={() => {
                      handleDelete(item.id)
                    }} className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App;