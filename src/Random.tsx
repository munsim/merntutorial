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
      alert("cant be blank");
    } else {
      axios
        .post("https://www.smntest.me/addtext", {
          text: text,
        })
        .then((res) => {
          setmessages([...messages, { text: text }]);
          settext("");
        })
        .catch((error) => {
          console.log(error);
        });
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

  useEffect(() => {
    axios
      .get("https://www.smntest.me/read2")
      .then((res) => {
        console.log(res.data);
        setmessages(res.data);
      })
      .catch(() => {
        console.log("ERR");
      });
  }, [text, messages]);

  const deletetext = (id: any) => {
    axios
      .delete(`https://www.smntest.me/deletetext/${id}`)
      .then((res) => {
        setmessages(
          messages.filter((item: any) => {
            return item._id != id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatetext = (id: any) => {
    const newText = prompt("Enter new text:");
    if (newText?.length === 0) {
      alert("Can't be blank");
    } else if (newText === null) {
      return; //break out of the function early
    } else {
      axios
        .put("https://www.smntest.me/updatetext", { text: newText, id: id })
        .then((res) => {
          setmessages(
            messages.map((item: any) => {
              return item._id == id ? { text: item.text, _id: id } : item;
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
            }}
            key={index}
          >
            <p>
              {index + 1}. {item.text}
            </p>
            <button
              style={{ marginLeft: "10px", height: "30px", marginTop: "5px" }}
              onClick={() => updatetext(item._id)}
            >
              Update
            </button>
            <button
              style={{ marginLeft: "10px", height: "30px", marginTop: "5px" }}
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
