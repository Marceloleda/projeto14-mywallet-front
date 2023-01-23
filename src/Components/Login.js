import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../Contexts/UserContext";

export default function Login(){
    const navigate = useNavigate();
    const {tasks, setTasks} = useContext(UserContext);
    const [login, setLogin] = useState({
        email: '',
        senha: ''
    })
    function enviarLogin(event){
        event.preventDefault();
        const URL = `http://localhost:5000/`;
        const dados = {
            email: login.email,
            senha: login.senha
        }
        const promise =axios.post(URL, dados)
        promise.then((response)=>{
            // const {token} = response.data
            localStorage.setItem("token", response.data)

            setTasks({...tasks, 
                online: true,
                token: response.data
            })
            navigate('/home')
        })

        promise.catch(err => {
            if(err.message === "Request failed with status code 422"){
                alert(`Dados digitados podem esta errados`)
            }
           
            alert(`Verifique se seus dados foram digitados corretamente e tente novamente! ;)`)
            console.log(err.message)
        })
    }

    return(
        <>
            <Conteiner>
                <h1>MyWallet</h1>
                <Forms>
                    <form onSubmit={enviarLogin}>
                        <Inserir  id="email" type="email" placeholder="Email" value={login.email} onChange={(e)=>
                        setLogin({...login, email: e.target.value})
                        }required/>

                        <Inserir id="password" type="password" placeholder="Senha" value={login.senha} onChange={(e)=>
                        setLogin({...login, senha: e.target.value})
                        }required/>

                        <Botao type="submit">Entrar</Botao>
                    </form>
                </Forms>

                <Cadastro>
                    <Link to={"/cadastro"} style={{ textDecoration: 'none' }}>
                        <h2>Primeira vez? Cadastre-se!</h2>
                    </Link>
                </Cadastro>

            </Conteiner>
        </>
    );
}
const Conteiner = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    h1{
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        color:white;
    }
`;
const Forms = styled.div`
    form{
            display:flex;
            flex-direction:column;
            justify-content: center;
            align-items: center;
        }
`;

const Inserir = styled.input`
    width:330px;
    height: 58px;

    margin-bottom:16px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;

    &:first-child{
        margin-top: 25px;
    }
`;

const Botao = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 326px;
    height: 46px;
    background: #A328D6;
    border-radius: 5px;
    border:none;
    cursor: pointer;
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    font-family: 'Raleway';
`;

const Cadastro = styled.div`
    margin-top: 35px;
    h2{
        font-family: 'Raleway';
        color: #FFFFFF;
        font-size: 15px;
        font-weight: 700;
    }
`;