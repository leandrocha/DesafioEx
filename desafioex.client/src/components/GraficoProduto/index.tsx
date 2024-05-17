import * as React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip, Pie, PieChart } from 'recharts';
import IPedido from '../../interfaces/IPedido';
import "./GraficoProduto.css";

interface GraficoProdutoProps {
    pedidos: IPedido[]
}

export default function GraficoProduto(props: GraficoProdutoProps) {

    const [produtosCounts, setUfCounts] = useState([]);

    function preencheProdutos() {
        const counts = {};
        props.pedidos.map(pedido => {
            const produto = pedido.produto.nome;
            counts[produto] = counts[produto] ? counts[produto] + 1 : 1;
        });

        const produtosCountsArray = Object.keys(counts).map(produto => ({
            produto,
            Quantidade: counts[produto]
        }));

        setUfCounts(produtosCountsArray);
    }

    useEffect(() => {
        preencheProdutos()
    }, [props.pedidos])

    const CustomTooltip = ({ payload }) => {
        if (payload && payload.length) {
            return (
                <div className="custom_tooltip">
                    <p className="tooltip_title">{`${payload[0].payload.produto}`}</p>
                    <p className="tooltip_label">{`Quantidade: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return <div>
        <h1>Vendas por Produto</h1>

        <PieChart width={400} height={400}>
            <Tooltip content={<CustomTooltip payload={produtosCounts} />} />
            <Pie data={produtosCounts} dataKey="Quantidade" cx="50%" cy="50%" fill="#82ca9d" label />
        </PieChart>
    </div>

}