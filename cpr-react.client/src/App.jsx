import { useState } from 'react';
import './App.css';
import ChamadoIndex from './Chamado/View/ChamadoIndex';
import EstoqueIndex from './Estoque/View/EstoqueIndex';
import HistoricoIndex from './Chamado/View/HistoricoIndex';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {

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
