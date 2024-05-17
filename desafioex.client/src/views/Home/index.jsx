import * as React from "react";
import axios from "../../../../node_modules/axios/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "../Home/Home.css"
import ExcelSheets from '../../../public/excel-sheets.png'

export default function Home() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    function handleFileUpload() {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        axios.post('excel/uploadExcel', formData)
            .then(response => {
                setLoading(false);
                if (response.status === 200) {
                    navigate('/Dados');
                } else {
                    console.error('Error uploading file. Server returned:', response);
                }
            })
            .catch(error => {
                setLoading(false);
                console.error('Error uploading file:', error);
            });
    }
    return <div className="home_content">
        <h1>Upload Excel File</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload} disabled={loading}>{loading ? 'Carregando...' : 'Upload'}</button>
        <div className='home_content_painel'>
            <div className='home_content_painel_desc'>
                <h2 className='home_content_painel-title'>Descricao</h2>
                <p>
                    O usuario do sistema devera selecionar uma planilha de pedidos como a do exemplo, e iremos exibir os seguintes itens:
                    <br/>- Grafico de vendas por regiao
                    <br />- Grafico de vendas por produto
                    <br />- Lista de vendas com o nome do cliente, produto, valor final com entrega e data de entrega
                </p>
            </div>
            <div className='home_content_painel_ex'>
                <h2 className='home_content_painel-title'>Exemplo</h2>
                <img src={ExcelSheets} alt='Exemplo de Tabela'></img>
            </div>
        </div>
    </div>
}