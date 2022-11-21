import { useState } from "react";
import { Route, Routes } from "react-router";
import { createGlobalStyle } from "styled-components";


import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Wallet from "./Components/Wallet";
import WalletNegative from "./Components/WalletNegative";
import WalletPositive from "./Components/WalletPositive"
import UserContext from "./Contexts/UserContext";

export default function App(){
  const [tasks, setTasks] = useState([])
  const contextValue = {tasks, setTasks};
  return(
    <>
      <GlobalStyle/>
      <UserContext.Provider value={contextValue}>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/wallet" element={<Wallet/>}/>
          <Route path="/wallet/negative" element={<WalletNegative/>}/>
          <Route path="/wallet/positive" element={<WalletPositive/>}/>

        </Routes>

      </UserContext.Provider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body{
    background: #8C11BE;
    display:flex;
    align-items:center;
    justify-content:center;

  }
`