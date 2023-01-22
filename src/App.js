import { createGlobalStyle } from "styled-components";
import { Route, Routes } from "react-router-dom";
import UserContext from "./Contexts/UserContext";
import { useState } from "react";

import Login from "./Components/Login"
import Cadastro from "./Components/Cadastro";
import Home from "./Components/Home";

function App() {
  const [tasks, setTasks] = useState([])
  const contextValue = {tasks, setTasks};
  return (
    <>
      <GlobalStyle/>
      <UserContext.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/cadastro" element={<Cadastro/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body{
    background: #8C11BE;
    display:flex;
    align-items:center;
    justify-content:center;

  }
`