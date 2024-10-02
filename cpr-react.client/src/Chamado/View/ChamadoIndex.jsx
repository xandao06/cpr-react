import { useEffect, useState } from 'react';
import '../CSS/ChamadoIndex.css';
import CriarChamado from '../Modal/CriarChamado';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChamadoIndex({ chamados }) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Função para adicionar chamado
    const onAddChamado = async (newChamado) => {
        try {
            const response = await fetch('https://localhost:7042/api/Chamado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newChamado),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar chamado');
            }

            const data = await response.json();
            console.log("Chamado adicionado:", data);
            // Aqui você pode adicionar a lógica para atualizar a lista de chamados, se necessário

        } catch (error) {
            console.error("Erro:", error);
        }
    };

    return (
        <div className="container">
            <Button id="new_chamado_btn" onClick={handleShow}>
                Criar chamado
            </Button>
            <Table id="chamados_table" striped bordered hover aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Descrição</th>
                        <th>Contrato</th>
                        <th>Urgência</th>
                        <th>Status</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {chamados.map((chamado, index) => (
                        <tr key={index}>
                            <td>{new Date(chamado.data).toLocaleDateString()}</td>
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
            </Table>
            <CriarChamado
                show={showModal}
                handleClose={handleClose}
                onAddChamado={onAddChamado}
            />
        </div>
    );
}

export default ChamadoIndex;
