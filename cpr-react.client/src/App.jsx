﻿import { useState } from 'react';
import './App.css';
import ChamadoIndex from './Chamado/View/ChamadoIndex';
import EstoqueIndex from './Estoque/View/EstoqueIndex';
import HistoricoIndex from './Chamado/View/HistoricoIndex';
import ConsignadoIndex from './Consignado/View/ConsignadoIndex';
import FrotaIndex from './Frota/View/FrotaIndex';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { HubConnectionBuilder } from '@microsoft/signalr';




function App() {

    //constructor(props) {
    //    super(props);
    //    this.state = { recentGameResults: [] };
    //}
    //componentDidMount() {
    //    const newConnection = new HubConnectionBuilder()
    //        .withUrl('https://192.168.10.230/api/Chamado')
    //        .withAutomaticReconnect()
    //        .build();
    //    this.setState({
    //        connection: newConnection
    //    });
    //    newConnection.start()
    //        .then(result => {
    //            console.log('Connected!');
    //            this.state.connection.on('ReceiveGameResult', gameResult => {
    //                let recentGameResults = this.state.recentGameResults;
    //                recentGameResults.push(gameResult);
    //                this.setState({
    //                    recentGameResults: recentGameResults.slice(-10)
    //                });
    //            });
    //        })
    //        .catch(e => console.log('Connection failed: ', e));
    //}
    //renderGameResults() {
    //    return this.state.recentGameResults.map((gameResult, index) => {
    //        return (
    //            <div key={index}>
    //                {gameResult}
    //            </div>
    //        );
    //    });
    //}

    const [chamados, getChamados] = useState([]);
    async function GetAllChamadoData() {
        const response = await fetch(`https://${apiBaseUrl}`);
        const data = await response.json();
        getChamados(data); // Atualiza o estado com os dados recebidos
    }

    const [produtos, getProdutos] = useState([]);
    async function GetAllProdutoData() {
        const response = await fetch(`https://${dynamicIP}:7042/api/Estoque`);
        const data = await response.json();
        getProdutos(data); // Atualiza o estado com os dados recebidos
    }

    const [equipamentos, getEquipamentos] = useState([]);
    async function GetAllConsignadoData() {
        const response = await fetch(`https://${dynamicIP}:7042/api/Consignado`);
        const data = await response.json();
        getConsignados(data); // Atualiza o estado com os dados recebidos
    }

    const [veiculos, getVeiculos] = useState([]);
    async function GetAllVeiculoData() {
        const response = await fetch(`https://${dynamicIP}:7042/api/Frota/GetVeiculos`);
        const data = await response.json();
        getVeiculos(data); // Atualiza o estado com os dados recebidos
    }

    const [registros, getRegistros] = useState([]);
    async function GetAllRegistroData() {
        const response = await fetch(`https://${dynamicIP}:7042/api/Frota/GetRegistros`);
        const data = await response.json();
        getRegistros(data); // Atualiza o estado com os dados recebidos
    }


    return (
        <Router>
            <div>
                <nav>
                    <button variant="primary"> <Link to="/">Chamados</Link> </button>
                    <button variant="primary"><Link to="/historico">Histórico de Chamados</Link></button>
                    <button variant="primary"><Link to="/estoque">Estoque</Link></button>
                    <button variant="primary"><Link to="/consignado">Consignados</Link></button>
                    <button variant="primary"><Link to="/frota">Frota</Link></button>
                </nav>
                <Routes>
                    <Route path="/" element={<ChamadoIndex chamados={chamados} />} />
                    <Route path="/historico" element={<HistoricoIndex chamados={chamados} />} />
                    <Route path="/estoque" element={<EstoqueIndex produtos={produtos} />} />
                    <Route path="/consignado" element={<ConsignadoIndex equipamentos={equipamentos} />} />
                    <Route path="/frota" element={<FrotaIndex veiculos={veiculos} />} />
                </Routes>
            </div>
        </Router>
    );
    }  

export default App;
