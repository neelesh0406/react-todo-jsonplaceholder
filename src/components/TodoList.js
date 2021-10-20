import React from 'react'
import './TodoList.css';

export default function TodoList(props) {
    const { item, id, deleteItem } = props;
    return (
        <li >
            <i className="fas fa-times-circle" onClick={() => deleteItem(id)}></i>
            <div className="task-list">
                <p className="task-text">{item.description}</p>
                <p className="task-date"><i className="far fa-calendar-alt">&nbsp;</i>
                    {item.deadline.length > 0 ? item.deadline : 'No Deadline'}
                </p>
            </div>
            {<button className={item.category.length > 0 ? item.category : 'other'}>{item.category.length > 0 ? item.category : 'other'}</button>}
        </li>
    )
}
