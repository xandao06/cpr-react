import { useEffect, useState } from 'react';
import './App.css';
import ChamadoIndex from './Chamado/View/ChamadoIndex';
import HistoricoIndex from './Chamado/View/HistoricoIndex';
import CriarChamado from './Chamado/Modal/CriarChamado';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {

    //const goToHistorico = () => {
    //    window.location.href = '/historico'; // Certifique-se de que a rota está correta
    //};

    const [chamados, getChamados] = useState([]);
    async function GetAllChamadoData() {
        const response = await fetch('https://localhost:7042/api/Chamado');
        const data = await response.json();
        getChamados(data); // Atualiza o estado com os dados recebidos
    }

    async function AddChamadoData(newChamado) {
        const response = await fetch('https://localhost:7042/api/Chamado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newChamado),
        });

        if (response.ok) {
            const data = await response.json();
            getChamados(prevChamados => [...prevChamados, data]); // Atualizar a lista com o novo chamado
        } else {
            console.error('Erro ao adicionar chamado:', response.statusText);
        }
    }

    useEffect(() => {
        GetAllChamadoData();
    }, []);

    

    return (
        <Router>
            <div>
                <nav>
                    <button variant="primary"> <Link to="/">Chamados</Link> </button>
                    <button variant="primary"><Link to="/historico">Histórico de Chamados</Link></button>
                </nav>
                <Routes>
                    <Route path="/" element={<ChamadoIndex chamados={chamados} onAddChamado={AddChamadoData} />} />
                    <Route path="/historico" element={<HistoricoIndex chamados={chamados} />} />
                </Routes>
            </div>
        </Router>
    );
    
}




export default App;





//    <Router>
//    <div>

//        <Routes>
//            {/*<Route*/}
//            {/*    path="/"*/}
//            {/*    element={<ChamadoIndex chamados={chamados} />}*/}
//            {/*/>*/}
//            <Route
//                path="/historico"
//                element={<HistoricoIndex chamados={chamados} />}
//            />
//        </Routes>


//        <h1 id="tableLabel">Chamados</h1>
//        <p>Lista de chamados</p>

//        <CriarChamado onSubmit={AddChamadoData} />

//        {chamados.length === 0 ? (
//            <p><em>Nenhum chamado encontrado.</em></p>
//        ) : (
//            <ChamadoIndex chamados={chamados} />  // Usando o componente da tabela
//        )}
//        </div>
//    </Router>


//);