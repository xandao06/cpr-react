import { useState } from 'react';
import './App.css';
import ChamadoIndex from './Chamado/View/ChamadoIndex';
import EstoqueIndex from './Estoque/View/EstoqueIndex';
import HistoricoIndex from './Chamado/View/HistoricoIndex';
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
        const response = await fetch('https://192.168.10.230:7042/api/Chamado');
        const data = await response.json();
        getChamados(data); // Atualiza o estado com os dados recebidos
    }

    const [produtos, getProdutos] = useState([]);
    async function GetAllProdutoData() {
        const response = await fetch('https://192.168.10.230:7042/api/Estoque');
        const data = await response.json();
        getProdutos(data); // Atualiza o estado com os dados recebidos
    }


    return (
        <Router>
            <div>
                <nav>
                    <button variant="primary"> <Link to="/">Chamados</Link> </button>
                    <button variant="primary"><Link to="/historico">Histórico de Chamados</Link></button>
                    <button variant="primary"><Link to="/estoque">Estoque</Link></button>
                </nav>
                <Routes>
                    <Route path="/" element={<ChamadoIndex chamados={chamados} />} />
                    <Route path="/historico" element={<HistoricoIndex chamados={chamados} />} />
                    <Route path="/estoque" element={<EstoqueIndex produtos={produtos} />} />
                </Routes>
            </div>
        </Router>
    );
    }  

export default App;
