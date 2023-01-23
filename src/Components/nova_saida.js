import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

export default function Nova_saida(){

    const token = localStorage.getItem("token")

    const navigate = useNavigate();
    
    const [entrada, setEntrada] = useState({
        valor: '',
        descricao:"",
    });
    
    function SendPositive(event){
        const config = {
            headers: { Authorization: `Bearer${token}` }
        };
        event.preventDefault();
        const URL = `http://localhost:5000/nova-saida`;

        const promise = axios.post(URL, entrada, config)
        promise.then((res)=>{
            console.log(res)
            alert('Adicionado com sucesso!')
            navigate('/home')
        })
        promise.catch(err=>{
            console.log(err.message)
        })
    }
    return(
        <>
            <Conteiner>
                <Cabecalho>
                    <h1>Nova entrada</h1>
                </Cabecalho>
                <Forms>
                    <form onSubmit={SendPositive}>
                        <Inserir id="valor" type="number" placeholder="Valor" value={entrada.valor} onChange={(e)=>{
                            setEntrada({...entrada, valor: e.target.value})
                        }} required/>

                        <Inserir id="valor" type="text" placeholder="Descrição" value={entrada.descricao} onChange={(e)=>{
                            setEntrada({...entrada, descricao: e.target.value})
                        }}required/>

                        <Botao type="submit">Salvar entrada</Botao>

                    </form>
                </Forms>
            </Conteiner>
        </>
    );
}
const Conteiner = styled.div`
    margin-top:50px;
    h1{
        color:white;
    }
`;
const Cabecalho = styled.div`
    display:flex;
    justify-content:left;
    align-items: center;
    width: 326px;
    height: 60px;
    h1{
        font-family: 'Raleway';
        font-size: 26px;
        font-weight: 700;
        color: #FFFFFF;
    }
`;
const Forms = styled.div`
    form{
            display:flex;
            flex-direction:column;
            justify-content: center;
            align-items: center;
        }
`
const Inserir = styled.input`
    width: 326px;
    height: 58px;
    margin-bottom: 16px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    &:first-child{
        margin-top: 15px;
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
    font-family: 'Raleway';
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 20px;
`;