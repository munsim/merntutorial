import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

const Random = () => {
  const inputref = useRef<any>(null);
  const [text, settext] = useState<any>("");
  const [time, settime] = useState("");
  const typetext = (e: any) => {
    settext(e.target.value);
  };
  const [messages, setmessages] = useState<any>([]);
  useEffect(() => {
    inputref.current.focus();
  }, [messages]);

  const addtext = () => {
    if (text.length === 0) {
      alert("Input cant be blank");
    } else {
      axios
        .post("https://mernsm.herokuapp.com/addtext", {
          text: text,
        })
        .then((res) => {
          console.log("added rerender");
          setmessages([...messages, { text: text }]);
          settext("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://mernsm.herokuapp.com/read2")
      .then((res) => {
        setmessages(res.data);
        console.log("render");
      })
      .catch(() => {
        console.log("ERR");
      });
  }, [text]);

  const deletetext = (id: any) => {
    axios
      //.delete(`https://mernsm.herokuapp.com/deletetext/${id}`)
      .delete("https://mernsm.herokuapp.com/deletetext", { data: { id: id } })
      .then((res) => {
        setmessages(
          messages.filter((item: any) => {
            return item._id != id;
          })
        );
      })
      .catch((error) => {
        console.log(`HERE IS THE ERROR: ${error}`);
      });
  };

  const updatetext = (id: any) => {
    const newText = prompt("Enter new text:");
    if (newText?.length === 0) {
      alert("Can't be blank");
    } else if (newText === null) {
      return; //break out of the function early
    }
    try {
      axios
        .put("https://mernsm.herokuapp.com/updatetext", {
          text: newText,
          id: id,
        })
        .then((res) => {
          console.log(res);
          setmessages(
            messages.map((item: any) => {
              return item._id == id ? { text: newText, _id: id } : item;
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(`UPDATE ERROR: ${error}`);
    }
  };

  useEffect(() => {
    var current = new Date();
    var time1 = current.toLocaleTimeString();
    var cy = current.getFullYear();
    var cm = current.getMonth() + 1;
    var cd = current.getDate();
    var time2 = current.toLocaleDateString();
    settime(`${cd}/${cm}/${cy} at ${time1}`);
  }, [text]);

  return (
    <div className="inputdiv">
      {time}
      <input
        ref={inputref}
        value={text}
        className="textinput"
        type="text"
        onChange={(e) => typetext(e)}
        placeholder="text"
      />
      <button className="butoninput" onClick={addtext}>
        ADD TEXT
      </button>
      {messages.map((item: any, index: any) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5px",
              width: "100vw",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={index}
          >
            <p> {index + 1}.</p>
            <p
              style={{
                width: "40vw",
                marginLeft: "3px",
                overflowWrap: "break-word",
              }}
            >
              {item.text}
            </p>
            <button
              style={{ marginLeft: "10px", height: "30px" }}
              onClick={() => updatetext(item._id)}
            >
              Update
            </button>
            <button
              style={{ marginLeft: "10px", height: "30px" }}
              onClick={() => deletetext(item._id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Random;
