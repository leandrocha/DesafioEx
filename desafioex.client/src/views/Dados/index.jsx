import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../../../node_modules/axios/index";
import GraficoRegiao from "../../components/GraficoRegiao/index";
import GraficoProduto from "../../components/GraficoProduto/index";
import ListaPedidos from "../../components/ListaPedidos/index";
import '../Dados/Dados.css'
import EmptyBox from '../../../public/empty-box.png'

export default function Dados() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        axios.get('/pedido')
            .then(response => {
                setPedidos(response.data)
            })
            .catch(error => console.error('Erro ao obter pedidos:', error));
    }, [])

    return <>
        {pedidos.length > 0 ?
            <div className='dados_content'>
                <GraficoRegiao pedidos={pedidos} />
                <GraficoProduto pedidos={pedidos} />
                <ListaPedidos pedidos={pedidos} />
            </div>
            :
            <div className='no_dados_content'>
                <h1>Sem dados!</h1>
                <img className='no_dados_content-img' src={EmptyBox} alt='Sem dados'></img>
            </div>
        }
    </>

}