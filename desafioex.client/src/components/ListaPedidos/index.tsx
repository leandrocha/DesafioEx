import * as React from "react";
import IPedido from "../../interfaces/IPedido";
import { useState } from "react";
import verificarRegiao from "../../functions/VerificaRegiao";
import { useEffect } from "react";
import IVendas from "../../interfaces/IVendas";
import './ListaPedido.css';

import { format } from 'date-fns';

interface ListaPedidosProps {
    pedidos: IPedido[]
}

export default function ListaPedidos(props: ListaPedidosProps) {
    const [vendas, setVendas] = useState<IVendas[]>([])

    function preencheVendas() {
        setVendas([])
        props.pedidos.map(pedido => {
            let _valorFinal = pedido.produto.preco
            let _dataEntrega = pedido.data

            if (pedido.cliente.uf != "SP") {
                switch (verificarRegiao(pedido.cliente.uf)) {
                    case "Norte" || "Nordeste":
                        _valorFinal = pedido.produto.preco + (pedido.produto.preco * 30 / 100);
                        _dataEntrega = new Date(pedido.data);
                        _dataEntrega.setDate(_dataEntrega.getDate() + 10);
                        break;
                    case "Sul" || "CentroOeste":
                        _valorFinal = pedido.produto.preco + (pedido.produto.preco * 20 / 100);
                        _dataEntrega = new Date(pedido.data);
                        _dataEntrega.setDate(_dataEntrega.getDate() + 5);
                        break;
                    case "Sudeste":
                        _valorFinal = pedido.produto.preco + (pedido.produto.preco * 10 / 100);
                        _dataEntrega = new Date(pedido.data);
                        _dataEntrega.setDate(_dataEntrega.getDate() + 1);
                        break;
                }
            } 

            const _vendas: IVendas = { nomeCliente: pedido.cliente.razaoSocial, produto: pedido.produto.nome, valorFinal: _valorFinal, dataEntrega: _dataEntrega }

            setVendas(prevVendas => [...prevVendas, _vendas])
        })
    }

    useEffect(() => {
        preencheVendas()
    }, [props.pedidos])

    return <div className="pedido_card">
        <h1>Pedidos</h1>
        <table className="table_card">
            <tr>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Valor Final</th>
                <th>Data Entrega</th>
            </tr>
            {vendas.map(venda => {
                return <tr>
                    <td>{venda.nomeCliente}</td>
                    <td>{venda.produto}</td>
                    <td>R${venda.valorFinal}</td>
                    <td>{format(venda.dataEntrega.toString(), 'dd/MM/yy')}</td>
                </tr>
            })}
        </table>
    </div>
}