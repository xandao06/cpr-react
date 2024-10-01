import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [chamados, setChamados] = useState();

    useEffect(() => {
        populateChamadoData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        :
        <div className="container">
            <button className="btn btn-primary" >Criar chamado</button>

            <table className="table table-striped mt-3" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Descricao</th>
                        <th>Contrato</th>
                        <th>Urgencia</th>
                        <th>Status</th>
                        <th>Opcoes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>teste</td>
                        <td>teste</td>
                        <td>teste</td>
                        <td>teste</td>
                        <td>teste</td>
                        <td>teste</td>
                        <td>teste</td>
                        <td>teste</td>
                    </tr>
                </tbody>
            </table>
        </div>
    return (
        <div>
            <h1 id="tableLabel">Chamados</h1>
            <p>Lista de chamados</p>
            {contents}
        </div>
    );
};

        async function populateChamadoData() {
            const response = await fetch('chamado');
            const data = await response.json();
            setChamados(data);
        }
    
export default App;