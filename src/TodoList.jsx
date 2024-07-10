import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const savedPriority = ["Low", "Medium", "High"]

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [taskPriority, setTaskPriority] = useState('Low')
    const [checkStatus, setCheckStatus] = useState('All')

    const setPriority = (task) => {
        if (task?.includes('p1')) return 'High';
        if (task?.includes('p2')) return 'Medium';
        if (task?.includes('p3')) return 'Low';
        return taskPriority;
    };

    const cleanTask = (task) => {
        return task.replace(/p[1-3]/g, '').trim();
    };

    useEffect(()=>{
        setTaskPriority(setPriority(task))
    },[task])

    const handleStatusFilter = (e) => {
        setCheckStatus(e.target.value)
    }

    const filterTodos = todos.filter(todos => {
        if (checkStatus === 'All') return todos;
        return todos.status === checkStatus;
    });


    const addTodo = (e) => {
        e.preventDefault();
        if (task) {
            const newPriority = setPriority(task);
            const cleanedTask = cleanTask(task);
            const newTodo = [...todos, { task: cleanedTask, status: "In-Progress", priority: newPriority, IsEditing: false }];
            newTodo.sort((x, y) => savedPriority.indexOf(y.priority) - savedPriority.indexOf(x.priority));
            setTaskPriority("Low")
            setTodos(newTodo);
            toast.success("Task added")
            setTask('');
        }
    };

    const handleDelete = (index) => {
        const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)]
        toast.success("Task deleted")
        setTodos(newTodos)
    }

    const handleEdit = (index) => {
        let newTodos = [...todos];
        if (newTodos[index].IsEditing) {
            let newTodo = document.getElementById('todo-content-' + index).innerText;
            newTodos[index].task = newTodo;
            newTodos[index].IsEditing = !newTodos[index].IsEditing;
            toast.info("Task edited successfully")
            setTodos(newTodos);
        } else {
            newTodos[index].IsEditing = !newTodos[index].IsEditing;
            setTodos(newTodos);
        }
    }

    const handleStatus = (index,newValue) => {
        let newTodos = [...todos];
        newTodos[index].status = newValue;
        setTodos(newTodos);
    }

    const handleComplete = (index) => {
        let newTodos = [...todos];
        newTodos[index].status = newTodos[index].status === 'Completed' ? 'In-Progress' : 'Completed';
        setTodos(newTodos);
    };

    return (
        <div className='main'>
            <div className='main-two'>
                <h1>To Do App</h1>
                <form onSubmit={addTodo} className='form'>
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder='Enter a task here'
                        className='form-input form-child'
                    />
                    <select value={taskPriority} onChange={(e)=>setTaskPriority(e.target.value)} className='form-child priority'>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <button type="submit" className='form-child add-btn'>ADD+</button>
                </form>

                <select className='selectFilter' value={checkStatus} onChange={handleStatusFilter} >
                    <option value="All">All</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>No.</th>
                                <th>Todo Item</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filterTodos.map((todo, index) => (
                                <tr key={index}>
                                    <td>
                                    <input className='checkbox' type='checkbox' checked={todo.status === 'Completed'} onChange={() => handleComplete(index)}/>
                                    </td>
                                    <td>{index + 1}</td>
                                    <td suppressContentEditableWarning={true} id={'todo-content-' + index} contentEditable={todo.IsEditing}>{todo.task}</td>
                                    <td>
                                        {todo.priority}
                                    </td>
                                    <td>
                                        {todo.status}
                                    </td>
                                    <td>
                                        <button className='edit-button' onClick={() => handleEdit(index)}>{
                                            todo.IsEditing ? "Save" : "Edit"
                                        }</button>
                                        <button onClick={() => handleDelete(index)}>Delete</button>

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
