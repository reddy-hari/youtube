import './App.css';
import { useState, useRef } from 'react';

const originalData = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  }
]

function App() {

  const [data, setData] = useState(originalData);
  const inputRef = useRef(null);

  const addTodo = () => {
    setData(
      [
        ...data,
        {
          "userId": 1,
          "id": 3,
          "title": inputRef.current.value,
          "completed": false
        }
      ]
    )
  }

  const deleteTodo = (task) => {
    const filteredList = data.filter(x => x.title !== task)
    setData(filteredList)
  }

  return (
    <div className="App">
      <div>
        <input type="text" placeholder="Enter todo" ref={inputRef}></input>
        <input type="button" value="Save" onClick={addTodo}></input>
      </div>

      <div>
        {
          data.map((todo, index) => {
            return (
              <div key={index}>
                <span>{todo.title}</span>
                <span style={{ "color": "red" }} onClick={() => deleteTodo(todo.title)}>{" X "}</span>
              </div>
            )
          })
        }
      </div>

    </div>
  );
}

export default App;
