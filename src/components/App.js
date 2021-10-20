import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [taskList, setTaskList] = useState([]); //[{description: '',category: '', deadline: ''}]

  //onChange handlers
  const handleTextChange = (e) => {
    setDescription(e.target.value);
  }
  const handleDateChange = (e) => {
    const myDate = new Date(e.target.value);

    setDeadline(myDate.toDateString());
  }
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  //this function is sent as props to the TodoList component
  const deleteItem = (id) => {
    const newArr = taskList.filter((items, index) => {
      return index !== id
    })
    //return all the elements in a new array except the selected one
    setTaskList(newArr);
  }

  const handleAddTask = (e) => {
    //Add only if the description is entered
    if (description.length > 0) {
      setTaskList([...taskList, {
        description: description,
        category: category,
        deadline: deadline
      }]);
      //Empty the input box after adding
      setDescription('');
      setCategory('');
      setDeadline('');
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
          <label htmlFor="category" className="label50">
            <p>CATEGORY</p>
            <select name="category" id="category" value={category} onChange={handleCategoryChange}>
              <option value="" hidden>Choose a category</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="school">School</option>
              <option value="cleaning">Cleaning</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label htmlFor="due_date" className="label50">
            <p>DUE DATE</p>
            <input type="date" name="due_date" id="due_date" value={deadline} onChange={handleDateChange} />
          </label>
        </div>
        <div className="btn-div">
          <button id="add-btn" onClick={handleAddTask}><i className="fas fa-plus"></i>ADD TASKS</button>
        </div>

        <ol>
          {/* <li>
            <i className="fas fa-times-circle"></i>
            <div className="task-list">
              <p className="task-text">buy mango</p>
              <p className="task-date"><i className="far fa-calendar-alt">&nbsp;</i>
                No Deadline
              </p>
            </div>
          </li> */}
          {taskList.map((item, index) => {
            return <TodoList item={item} id={index} deleteItem={deleteItem} key={index} />
          })}

        </ol>
      </div>
    </div>
  );
}

export default App;
