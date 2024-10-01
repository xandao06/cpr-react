import { useEffect, useState } from 'react';
import { React } from 'react';

function ChamadoIndex({ chamados }) {
    return (
        <div className="container">
            <div>
                <button onClick={() => AddChamadoData({ chamados })} className="btn btn-primary">Criar chamado</button>
            </div>
            <table className="table table-striped table-hover" aria-labelledby="tableLabel">
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
                    {chamados.map((chamado, index) => (
                        <tr key={index}>
                            <td>{chamado.data}</td>
                            <td>{chamado.hora}</td>
                            <td>{chamado.cliente}</td>
                            <td>{chamado.descricao}</td>
                            <td>{chamado.contrato}</td>
                            <td>{chamado.urgencia}</td>
                            <td>{chamado.status}</td>
                            <td>{chamado.opcoes}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};
export default ChamadoIndex;