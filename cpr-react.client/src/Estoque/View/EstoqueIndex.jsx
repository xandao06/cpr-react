import { useEffect, useState } from 'react';
import '../CSS/Estoque.css';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import ChamadoIndex from '../../Chamado/View/ChamadoIndex';
import Entrada from '../Modal/Entrada';
import Saida from '../Modal/Saida';
import DeletarProduto from '../Modal/DeletarProduto';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function EstoqueIndex() {

    const [selectedProduto, setSelectedProduto] = useState(null); // GERAL
    const [produtos, setProdutos] = useState([]);  // GERAL

    const [showEntradaModal, setShowEntradaModal] = useState(false); // ENTRADA
    const handleShowEntrada = () => setShowEntradaModal(true); // ENTRADA
    const handleCloseEntrada = () => setShowEntradaModal(false);  // ENTRADA 

    const [showSaidaModal, setShowSaidaModal] = useState(false); // SAIDA
    const handleShowSaida = () => setShowSaidaModal(true); // SAIDA
    const handleCloseSaida = () => setShowSaidaModal(false);  // SAIDA

    const [showDeletarModal, setShowDeletarModal] = useState(false); // DELETAR
    const handleCloseDeletar = () => setShowDeletarModal(false); // DELETAR
    const handleShowDeletar = (produto) => { // DELETAR
        setShowDeletarModal(true); // DELETAR
    };

    {/* //ROTA PARA ESTOQUE INDEX// */ }

    const navigate = useNavigate();
    const goToEstoque = () => {
        navigate('/estoque');
    }

    {/* //// */ }

    {/* //BUSCA DE CHAMADOS// */ }

    useEffect(() => {
        const fetchProdutos = async () => {

            const response = await fetch('https://192.168.10.230:7042/api/Estoque');
            const data = await response.json();

            setProdutos(data); // Filtra apenas chamados pendentes
        }


        fetchProdutos();
    }, []);

    {/* //// */ }


    {/* //FUNÇÃO DO MODAL ENTRADA// */ }

    const handleEntrada = async (produto) => {
        console.log("Produto ID:", produto.id);
        const method = 'POST';
        const url = 'https://192.168.10.230:7042/api/Estoque/AddOuUpdateEntrada';
            

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });

        if (response.ok) {
            const novoProduto = await response.json();
            setProdutos((prevProdutos) => [...prevProdutos, novoProduto]); // Atualiza a lista de produtos
        }

        handleCloseEntrada(); // Fecha o modal após a ação
    };

    {/* //// */ }


    {/* //FUNÇÃO DO MODAL SAIDA// */ }

    const handleSaida = async (produto) => {
        const method = produto.id ? 'PUT' : 'POST'; // Se o produto tiver um ID, atualiza; caso contrário, cria.
        const url = produto.id
            ? `https://192.168.10.230:7042/api/Estoque/${produto.id}` // URL para atualizar
            : 'https://192.168.10.230:7042/api/Estoque/AddOuUpdateEntrada'; // URL para criar

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });

        if (response.ok) {
            const novoProduto = await response.json();
            console.log('Produto adicionado/atualizado:', novoProduto);
            onSaida(novoProduto); // Atualiza a lista de produtos
        } else {
            console.error('Erro ao adicionar/atualizar produto:', response.statusText);
            // Aqui você pode tratar erros, como exibir uma mensagem para o usuário
        }

        handleCloseSaida(); // Fecha o modal após a ação
    };

    {/* //// */ }


    {/* ///METODO DELETAR CHAMADO// */ }

    const onDeletarProduto = async (deletarProduto) => {

        console.log("Chamado ID:", deletarProduto.id);

        const response = await fetch(`https://192.168.10.230:7042/api/Estoque/${deletarProduto.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletarProduto),

        });

        if (response.ok) {
            // Atualiza a lista removendo o chamado concluído
            setProdutos(produtos.filter(c => c.id !== deletarProduto.id));
            handleCloseDeletar(); // Fecha o modal de conclusão
        }
    }

    {/* ///// */ }



    {/* TABELA */ }

    return (


        <div className="container">

            <h2>Estoque de produtos</h2>
            <div id="entradasaida_btn">
                <button onClick={() => setShowEntradaModal(true)}>Entrada</button>
                <button onClick={() => setShowSaidaModal(true)}>Saída</button>
            </div>
            <Table id="produto_table" striped bordered hover>
                <thead>
                    <tr>
                        <th>Código no sistema</th>
                        <th>Nome</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Quantidade</th>
                        <th>Preço de custo</th>
                        <th>Preço de venda</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto, index) => (
                        <tr key={index}>
                            <td>{produto.codigosistema}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.marca}</td>
                            <td>{produto.modelo}</td>
                            <td>{produto.quantidade}</td>
                            <td>{produto.precocusto}</td>
                            <td>{produto.precovenda}</td>
                            <td>{produto.descricao}</td>
                            <td>
                                <a variant="success" onClick={() => handleShowDeletar(produto)}>
                                    <i id="icon" className="fa-solid fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* ///// */}

            {/* ///REFERENCIA DOS MODAIS/// */}

            <Entrada
                show={showEntradaModal}
                handleClose={handleCloseEntrada}
                onEntrada={handleEntrada}
                produtos={produtos}
            />

            <Saida
                show={showSaidaModal}
                handleClose={handleCloseSaida}
                onSaida={handleSaida}
                produtos={produtos}
            />

            <DeletarProduto
                show={showDeletarModal}
                handleClose={handleCloseDeletar}
                produto={selectedProduto}
                onDeletarProduto={onDeletarProduto}
            />

            {/* ///// */}
        </div>
    );

}

export default EstoqueIndex;