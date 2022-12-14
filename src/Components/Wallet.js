import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {RiLogoutBoxRLine} from "react-icons/ri";
import {BsPlusCircle} from "react-icons/bs";
import Menos from "../Assets/img/subtracao.svg"
import UserContext from "../Contexts/UserContext";


export default function Wallet(){
    const navigate = useNavigate();
    const {tasks, setTasks} = useContext(UserContext);
    const [usuario, setUsuario] = useState([]);
    const [dados, setDados] = useState({});

    const [user, setUser] = useState({})
   
    const usuariu = localStorage.getItem("token")

    const saldoUsuario = JSON.stringify(tasks)
    localStorage.setItem("saldo", saldoUsuario)

    const userDados = JSON.stringify(dados)
    localStorage.setItem("dados", userDados)

    console.log(usuariu)
    
    
    useEffect(()=>{

        const config = {
            headers: {Authorization: `Bearer ${tasks.token? tasks.token : usuariu}`}
        }
        const URL = `http://localhost:5000/wallet`;
        const promise = axios.get(URL, config)

        promise.then((response)=>{
            setDados(response.data)
            setUser(response.data.user)
            localStorage.setItem("token", tasks.token)    

        })
        promise.catch(err=>{
            console.log('deu errado')
            console.log(err.message)
        })
    },[])

    const extrato = dados.extract;

    function dinheiro(){
        return(
            <>
                {extrato?.map((extra, index)=>{
                    const tipo = extra.tipo;
                    const saldo = dados.cash?.cash
                    console.log(saldo)
                    return(
                        <>  
                            <div key={index}>
                                <Extrato  tipo={tipo}>
                                    <Descricao>
                                        <h3>{`${extra.data }`} &nbsp;</h3>
                                        <h1>{`${extra.descricao}`}</h1>
                                    </Descricao>
                                    <h2>{extra.valor}</h2>
                                </Extrato>
                            </div>
                        </>
                    );
                })}
            </>
        );
    }

    return(
        <>
            <Conteiner>
                <Cabecalho>
                    <h1>Ol??, {user.nome}</h1>
                    <Saida>
                        <RiLogoutBoxRLine size={24} color="white" onClick={()=> {
                            navigate(`/login`)
                        }}/>
                    </Saida>
                </Cabecalho>

                <Registros>
                    {dados.dinheiro === true? 
                    <Semsaldo>
                        <h1>N??o h?? registros de entrada ou sa??da</h1>
                    </Semsaldo>: dinheiro()
                    }
                    <Saldo>
                        {dados.dinheiro === true?
                            <>
                                <h1>SALDO </h1>
                                <h2>{dados.cash}</h2>
                            </>:''
                        }

                    </Saldo>
                </Registros>
                <Opcoes>
                    <Movimentar onClick={()=>{
                        navigate(`/wallet/positive`)
                    }}>
                        <BsPlusCircle size={22} color="white"/>
                        <h1>Nova <br></br> entrada</h1>
                    </Movimentar>

                    <Movimentar onClick={()=>{
                        navigate(`/wallet/negative`)
                        }}>
                        <img src={Menos} alt="menos" />
                        <h1>Nova <br></br>sa??da</h1>

                    </Movimentar>
                </Opcoes>

            </Conteiner>
        </>
    );
};

const Descricao = styled.div`
    display: flex;
    font-family: 'Raleway';
    font-size: 16px;
    h3{
        color: #C6C6C6;
    }
`
const Conteiner = styled.div`
    font-family: 'Raleway';
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
`;
const Extrato = styled.div`
    display:flex;
    justify-content: space-between;
    font-family: 'Raleway';
    font-size: 16px;
    h2{    
        color:  ${({ tipo }) => tipo === "soma"? "#03AC00" : "#C70000"};
    }
`;

const Cabecalho = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    width: 326px;
    top:0px;
    h1{
        font-family: 'Raleway', sans-serif;
        font-size: 26px;
        color:white;
        line-height: 31px;
    }
`;
const Registros = styled.div`
    margin-top: 25px;
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
`;
const Opcoes = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 326px;
    margin-top: 15px;
`;
const Movimentar = styled.div`
    display:flex;
    justify-content: space-between;
    flex-direction: column;
    cursor: pointer;
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    h1{
        font-weight: 700;
        font-size: 17px;
        color:white;
    }
    img{
        margin-right: 111px;
        height: 22px;
    }
`;
const Saida = styled.div`
    cursor:pointer;
`
const Saldo = styled.div`
    font-family: 'Raleway';
    font-size: 17px;
    h1{
        color: #000000;
        line-height: 20px;
        font-weight: 700;
    }
    display:flex;
    align-items:center;
    width: 306px;
    height:50px;
    justify-content: space-between;
    margin-top:390px;
`
const Semsaldo = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
    margin-left: 75px;
    width: 180px;
    height: 46px;
    h1{
        font-family: 'Raleway';
        font-size: 20px;
        color: #868686;
    }
`