import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/todos";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setTaskList(data);
      })
  }, []);

  //onChange handlers
  const handleTextChange = (e) => {
    setDescription(e.target.value);
  }
  const handleUserChange = (e) => {
    setUserId(e.target.value);
  }

  //this function is sent as props to the TodoList component
  const deleteItem = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        const newArr = taskList.filter((item, index) => {
          return index !== id
        });
        setTaskList(newArr);
      })

  }



  const handleAddTask = (e) => {

    const url = "https://jsonplaceholder.typicode.com/todos";

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        title: description,
        completed: true,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        setTaskList([{
          id: data.id,
          userId: data.userId,
          title: data.title,
          completed: false,
        }, ...taskList])
      })

    //Empty the input box after adding
    setDescription('');
    setUserId('');
  }

  // Edits the value of 'Completed' status only using PUT request
  const handleEdit = (id, isCompleted, index) => {
    //index is used for the tasks that are added by us because all those have the same ids (201)

    //201 is the id of tasks added by us which cannot be modified on server
    if (id !== 201) {
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          completed: !isCompleted,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //create a new array with the updated details of an item with id as 'id' & use setState
          const newArr = taskList.filter((item) => {
            if (item.id === id) {
              item.completed = data.completed;
            }
            return item;
          })
          setTaskList(newArr);
        });
    }
    else {
      const newArr = taskList.filter((item, i) => {
        if (i === index) {
          item.completed = !isCompleted;
        }
        return item;
      })
      setTaskList(newArr);
    }
  }

  return (
    <div className="app">
      <div className="todo-container">
        <h1 id="app-heading">ToDo APP</h1>
        <div className="input-div">
          <label htmlFor="description">
            <p>DESCRIPTION</p>
            <input type="text" name="description" id="description" placeholder="What do you need to do ?" value={description} onChange={handleTextChange} />
          </label>
        </div>

        <div className="input-div">
          <label htmlFor="userID">
            <p>User Id</p>
            <input type="number" name="userID" id="userID" placeholder="Enter User Id" value={userId} onChange={handleUserChange} />
          </label>
        </div>

        <div className="btn-div">
          <button id="add-btn" onClick={handleAddTask}><i className="fas fa-plus"></i>ADD TASKS</button>
        </div>

        <ol>
          {taskList.map((item, index) => {
            return <TodoList item={item} id={index} deleteItem={deleteItem} handleEdit={handleEdit} key={index} />
          })}

        </ol>
      </div>
    </div>
  );
}

export default App;
