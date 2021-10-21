import React from 'react'
import './TodoList.css';

export default function TodoList(props) {
    const { item, id, deleteItem, handleEdit } = props;

    return (
        <li>
            <i className="fas fa-times-circle" onClick={() => deleteItem(id)}></i>
            <div className="task-list">
                <p className={item.completed ? 'task-text strike-through' : 'task-text'}>
                    {item.title}
                </p>
                <p className="task-user"><i className="far fa-calendar-alt">&nbsp;</i>
                    User: {item.userId}
                </p>
            </div>
            {item.completed ?
                <button onClick={() => handleEdit(item.id, true, id)} >Not Done</button>
                :
                <button onClick={() => handleEdit(item.id, false, id)} >Done</button>
            }
        </li >
    )
}
