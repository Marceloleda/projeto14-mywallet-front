import axios from "axios";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {RiLogoutBoxRLine} from "react-icons/ri";
import {BsPlusCircle} from "react-icons/bs";
import Menos from "../Assets/img/subtracao.svg"
import UserContext from "../Contexts/UserContext";

export default function Home(){
    const navigate = useNavigate();
    const [dados, setDados] = useState([]);

    const [user, setUser] = useState({})
   

    const token = localStorage.getItem("token")
    const dado = dados.entrada;
    console.log(dado?.length)
    
    
    useEffect(()=>{

        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        const URL = `http://localhost:5000/home`;
        const promise = axios.get(URL, config)

        promise.then((res)=>{
            setDados(res.data.registro)
            setUser(res.data.user)
            console.log(res.data)

        })
        promise.catch(err=>{
            console.log('deu errado')
            console.log(err.message)
        })
    },[])

    console.log(dados.entrada)

    return(
        <>
            <Conteiner>
                <Cabecalho>
                    <h1>Olá, {user.nome}</h1>
                    <Saida>
                        <RiLogoutBoxRLine size={24} color="white" onClick={()=> {
                            navigate(`/`)
                        }}/>
                    </Saida>
                </Cabecalho>

                <Registros>
                    {dados.entrada?.length === 0? 
                    <Semsaldo>
                        <h1>Não há registros de entrada ou saída</h1>
                    </Semsaldo>: dados?.entrada?.map((e, index)=>{
                                const data = e.data;
                                const descricao = e.descricao;
                                const valor = e.valor;
                                const valorFormatado = valor.toLocaleString('pt-BR', { minimumFractionDigits: 2})
                                const tipo = e.tipo;
                                console.log(e)
                          
                                return(
                                    <>  
                                        <div key={index}>
                                            <Extrato tipo={tipo} >
                                                <Descricao>
                                                    <h3>{`${data }`} &nbsp;</h3>
                                                    <h1>{`${descricao}`}</h1>
                                                </Descricao>
                                                <h2>{valorFormatado}</h2>
                                            </Extrato>
                                        </div>
                                    </>
                                );
                            })
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
                        navigate(`/nova-entrada`)
                    }}>
                        <BsPlusCircle size={22} color="white"/>
                        <h1>Nova <br></br> entrada</h1>
                    </Movimentar>

                    <Movimentar onClick={()=>{
                        navigate(`/nova-saida`)
                        }}>
                        <img src={Menos} alt="menos" />
                        <h1>Nova <br></br>saída</h1>

                    </Movimentar>
                </Opcoes>

            </Conteiner>
        </>
    );
}
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
        color:  ${({ tipo }) => tipo === "positivo"? "#03AC00" : "#C70000"};
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