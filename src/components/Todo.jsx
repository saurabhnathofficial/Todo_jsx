import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';



function Todo() {

    let [todos, setTodos] = useState([{ task: "Sample Task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        if (newTodo.trim()) {
            setTodos((prevTodos) => {
                return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
            });
            setNewTodo("");
        }
    }

    let deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    let markAsDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isDone: true };
                } else {
                    return todo;
                }
            })
        );
    }

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    }

    return (
        <div className='h-min w-1/2 rounded-sm p-4 flex flex-col gap-3 bg-gradient-to-r md:bg-gradient-to-l'>
            <div className="text-4xl font-bold justify-center flex border-3">
                <p>ToDo</p>
            </div> 
            <div className="flex justify-between gap-4">
                <input
                    className='placeholder-white text-sm p-2 py-3 bg-gradient-to-r from-slate-900 to-slate-700 rounded w-full text-white'
                    type="text"
                    placeholder='Enter a Task . . .'
                    value={newTodo}
                    onChange={updateTodoValue}
                    onKeyDown={(e) => e.key === 'Enter' ? addNewTask() : null} // Add task on Enter
                />
                <button onClick={addNewTask} className='outline-cyan-800 w-40 font-semibold px-4 py-2 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded text-sm'>Add Task</button>
            </div>

            <div className="w-full h-full bg-gradient-to-r from-violet-200 to-pink-200 text-xl font-semibold capitalize p-2">
                <ul>
                    {todos.map((todo, index) => (
                        <li key={todo.id} className='flex gap-3 mb-2 bg-gradient-to-r from-purple-400 to-indigo-600 justify-between border-2 border-blue-700 px-4 py-1 text-1xl'>
                            <span style={todo.isDone ? { textDecorationLine: "line-through" } : {}}>{index} : {todo.task}</span>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => markAsDone(todo.id)}
                                    className={`font-semibold px-2 py-1 ${todo.isDone ? "bg-gradient-to-r from-lime-400 to-lime-500" : "bg-gradient-to-r from-indigo-500 to-blue-500"} rounded text-sm`}
                                >
                                    {todo.isDone ? <span>Done</span> : <span>Mark as Done</span>}
                                </button>
                                <button onClick={() => deleteTodo(todo.id)} className='font-semibold px-2 py-1 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded text-sm'>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
