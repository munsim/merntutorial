import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Random from "./Random";
import "./App.css";
const Friends = () => {
  const [name, setname] = useState("");
  const [age, setage] = useState(0);
  const [list, setlist] = useState([{ name: "", age: "0", _id: "" }]);
  const addFriend = () => {
    axios
      .post("https://merntesting.netlify.app/addfriend", {
        name: name,
        age: age,
      })
      .then((response) => {
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
      .get("https://merntesting.netlify.app/read")
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
      .put("https://merntesting.netlify.app/update", { newage: newAge, id: id })
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
    axios.delete(`https://merntesting.netlify.app/delete/${id}`).then(() => {
      setlist(
        list.filter((val: any) => {
          return val._id != id;
        })
      );
    });
  };
  //https://merntesting.netlify.app/addfriend
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <div className="App">
            <div className="inputs">
              <input
                type="text"
                onChange={(e) => addname(e)}
                placeholder="name"
              />
              <input
                type="number"
                onChange={(e) => addage(e)}
                placeholder="age"
              />
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
                  <button onClick={() => updatefriend(friend._id)}>
                    Update
                  </button>
                  <button onClick={() => deletefriend(friend._id)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
