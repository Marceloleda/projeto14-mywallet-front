import Login from "./Components/Login"

import { createGlobalStyle } from "styled-components";
import { Route, Routes } from "react-router-dom";
import UserContext from "./Contexts/UserContext";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([])
  const contextValue = {tasks, setTasks};
  return (
    <>
      <GlobalStyle/>
      <UserContext.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={<Login/>}/>
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