import { useEffect, useState } from 'react';
import '../CSS/Estoque.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { useNavigate } from 'react-router-dom';
import Entrada from '../Modal/Entrada';
import Saida from '../Modal/Saida';
import DeletarProduto from '../Modal/DeletarProduto';
import {
    fetchProdutos,
    handleEntrada,
    handleSaida,
    formatarPreco,
    deletarProduto
} from '../../Components/EstoqueComponent';


function EstoqueIndex() {

    {/* REFERENCIAS */ }

    const [selectedProduto, setSelectedProduto] = useState(null); // GERAL
    const [produtos, setProdutos] = useState([]);  // GERAL

    const [showEntradaModal, setShowEntradaModal] = useState(false); // ENTRADA
    const handleCloseEntrada = () => setShowEntradaModal(false);  // ENTRADA 

    const [showSaidaModal, setShowSaidaModal] = useState(false); // SAIDA
    const handleCloseSaida = () => setShowSaidaModal(false);  // SAIDA

    const [showDeletarModal, setShowDeletarModal] = useState(false); // DELETAR
    const handleCloseDeletar = () => setShowDeletarModal(false); // DELETAR
    const handleShowDeletar = (produto) => { // DELETAR
        setSelectedProduto(produto); // DELETAR
        setShowDeletarModal(true); // DELETAR
    };

    {/* ///// */ }


    {/* BUSCA OS CHAMADOS */ }

    useEffect(() => {
        const loadProdutos = async () => {
            const data = await fetchProdutos();
            setProdutos(data);
        };
        loadProdutos();
    }, []);


    {/* MODAL ENTRADA */ }

    const onHandleEntrada = async (produto) => {
        const data = await handleEntrada(produto);
        if (data) {
            setProdutos((prevProdutos) => {
                const produtoIndex = prevProdutos.findIndex(p => p.id === data.id);
                if (produtoIndex !== -1) {
                    const produtosAtualizados = [...prevProdutos];
                    produtosAtualizados[produtoIndex] = data;
                    return produtosAtualizados;
                } else {
                    return [...prevProdutos, data];
                }
            });
        }
        setShowEntradaModal(false);
    };

    {/* MODAL SAIDA */ }

    const onHandleSaida = async (produto) => {
        const data = await handleSaida(produto);
        if (data) {
            setProdutos((prevProdutos) =>
                prevProdutos.map((p) => (p.id === data.id ? data : p))
            );
        }
        setShowSaidaModal(false);
    };

    {/* MODAL DELETAR */ }

    const onDeletarProduto = async (produto) => {
        const success = await deletarProduto(produto);
        if (success) setProdutos((prevProdutos) => prevProdutos.filter((p) => p.id !== produto.id));
        setShowDeletarModal(false);
    };

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
                            <td>{produto.codigoSistema}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.marca}</td>
                            <td>{produto.modelo}</td>
                            <td>{produto.quantidade}</td>
                            <td>{formatarPreco(produto.precoCusto)}</td>
                            <td>{formatarPreco(produto.precoVenda)}</td>
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

            <Entrada
                show={showEntradaModal}
                handleClose={handleCloseEntrada}
                onEntrada={onHandleEntrada}
                produtos={produtos}
            />

            <Saida
                show={showSaidaModal}
                handleClose={handleCloseSaida}
                onSaida={onHandleSaida}
                produtos={produtos}
            />

            <DeletarProduto
                show={showDeletarModal}
                handleClose={handleCloseDeletar}
                produto={selectedProduto}
                onDeletarProduto={onDeletarProduto}
            />

        </div>
    );
}
export default EstoqueIndex;