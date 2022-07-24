import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Random from "./Random";
import Friends from "./Friends";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Random />
      </div>
    </>
  );
}

export default App;
