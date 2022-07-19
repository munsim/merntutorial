import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setname] = useState("");
  const [age, setage] = useState(0);
  const [list, setlist] = useState([{ name: "", age: "0", _id: "" }]);
  const addFriend = () => {
    axios
      .post("http://localhost:3001/addfriend", { name: name, age: age })
      .then((response) => {
        setname("");
        setage(0);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addname = (e: any) => {
    setname(e.target.value);
  };
  const addage = (e: any) => {
    setage(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/read")
      .then((res) => {
        setlist(res.data);
      })
      .catch(() => {
        console.log("ERR");
      });
  }, [name, age]);

  const updatefriend = (id: any) => {
    const newAge = prompt("Enter new age:");

    axios
      .put("http://localhost:3001/update", { newage: newAge, id: id })
      .then(() => {
        setlist(
          list.map((val: any) => {
            return val._id == id
              ? { name: val.name, age: newAge, _id: id }
              : val;
          })
        );
      });
  };
  const deletefriend = (id: any) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setlist(
        list.filter((val: any) => {
          return val._id != id;
        })
      );
    });
  };

  return (
    <>
      <div className="App">
        <div className="inputs">
          <input type="text" onChange={(e) => addname(e)} placeholder="name" />
          <input type="number" onChange={(e) => addage(e)} placeholder="age" />
          <button onClick={addFriend}>Add Friend</button>
        </div>
      </div>
      <div className="list">
        {list.map((friend, index) => {
          return (
            <div className="friend" key={index}>
              <div>
                <p>
                  Name: {friend.name} Age: {friend.age}
                </p>
              </div>
              <button onClick={() => updatefriend(friend._id)}>Update</button>
              <button onClick={() => deletefriend(friend._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
