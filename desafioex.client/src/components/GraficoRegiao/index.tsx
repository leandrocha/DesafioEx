import * as React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip } from 'recharts';
import IPedido from '../../interfaces/IPedido'
import verificarRegiao from "../../functions/VerificaRegiao";

interface GraficoRegiaoProps {
    pedidos: IPedido[]
}

export default function GraficoRegiao(props: GraficoRegiaoProps) {

    const [regiaoCounts, setRegiaoCounts] = useState([]);

    function preencheRegioes() {
        const counts = {};
        props.pedidos.map(pedido => {
            const regiao = verificarRegiao(pedido.cliente.uf);
            counts[regiao] = counts[regiao] ? counts[regiao] + 1 : 1;
        });

        const ufCountsArray = Object.keys(counts).map(regiao => ({
            regiao,
            Quantidade: counts[regiao]
        }));

        setRegiaoCounts(ufCountsArray);
    }

    useEffect(() => {
        preencheRegioes()
    }, [props.pedidos])

    return <div>
        <h1>Vendas por Regiao</h1>
        <BarChart width={600} height={300} data={regiaoCounts} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis dataKey="regiao" />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="Quantidade" stroke="#8884d8" fill="#8884d8" />
            <Tooltip />
        </BarChart>
    </div>

}