import { useEffect, useState } from 'react';
import '../CSS/Estoque.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Entrada from '../Modal/Entrada';
import Saida from '../Modal/Saida';
import DeletarProduto from '../Modal/DeletarProduto';


function EstoqueIndex() {

    const [selectedProduto, setSelectedProduto] = useState(null); // GERAL
    const [produtos, setProdutos] = useState([]);  // GERAL
    const [formError, setFormError] = useState('');

    const [showEntradaModal, setShowEntradaModal] = useState(false); // ENTRADA
    const handleShowEntrada = () => setShowEntradaModal(true); // ENTRADA
    const handleCloseEntrada = () => setShowEntradaModal(false);  // ENTRADA 

    const [showSaidaModal, setShowSaidaModal] = useState(false); // SAIDA
    const handleShowSaida = () => setShowSaidaModal(true); // SAIDA
    const handleCloseSaida = () => setShowSaidaModal(false);  // SAIDA

    const [showDeletarModal, setShowDeletarModal] = useState(false); // DELETAR
    const handleCloseDeletar = () => setShowDeletarModal(false); // DELETAR
    const handleShowDeletar = (produto) => { // DELETAR
        setSelectedProduto(produto); // DELETAR
        setShowDeletarModal(true); // DELETAR
    };

    const apiBaseUrl = `${window.location.protocol}//${window.location.hostname}:7042/api/Estoque`;

    {/* //ROTA PARA ESTOQUE INDEX// */ }

    const navigate = useNavigate();
    const goToEstoque = () => {
        navigate('/estoque');
    }

    {/* //// */ }

    {/* //BUSCA DE CHAMADOS// */ }

    useEffect(() => {
        const fetchProdutos = async () => {

            const response = await fetch(`${apiBaseUrl}`);
            const data = await response.json();

            setProdutos(data); 
        }


        fetchProdutos();
    }, []);

    {/* //// */ }


    {/* //FUNÇÃO DO MODAL ENTRADA// */ }


    const handleEntrada = async (produto) => {
        const method = produto.id ? 'PUT' : 'POST';
        const url = produto.id
            ? `${apiBaseUrl}/UpdateEntrada/${produto.id}`
            : `${apiBaseUrl}/AddEntrada`;

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });

        if (response.ok) {
            const novoProduto = await response.json();
            setProdutos((prevProdutos) => {
                
                const produtoIndex = prevProdutos.findIndex(p => p.id === novoProduto.id);

                if (produtoIndex !== -1) {
                    
                    const produtosAtualizados = [...prevProdutos];
                    produtosAtualizados[produtoIndex] = novoProduto;
                    return produtosAtualizados;
                } else {
                    
                    return [...prevProdutos, novoProduto];
                }
            });
        } else {
            console.error('Erro ao realizar a operação:', response.statusText);
        }

        handleCloseEntrada(); 
    };

    {/* //// */ }


    {/* //FUNÇÃO DO MODAL SAIDA// */ }

    const handleSaida = async (produto) => {
        try {
            const response = await fetch(`${apiBaseUrl}/UpdateSaida/${produto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto),
            });

            if (response.status === 404) {
                throw new Error('Produto não encontrado no banco de dados.');
            }

            if (response.ok) {
                const updatedProduto = await response.json();

                setProdutos((prevProdutos) =>
                    prevProdutos.map((p) => (p.id === updatedProduto.id ? updatedProduto : p))
                );

                setFormError(''); 
                handleCloseSaida();
            }
        } catch (error) {
            
            setFormError(error.message); 
        }
    };

    {/* ///// */ }



    {/* ///METODO DELETAR CHAMADO// */ }

    const onDeletarProduto = async (deletarProduto) => {

        console.log("Chamado ID:", deletarProduto.id);

        const response = await fetch(`${apiBaseUrl}/${deletarProduto.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletarProduto),

        });

        if (response.ok) {
            
            setProdutos(produtos.filter(c => c.id !== deletarProduto.id));
            handleCloseDeletar(); 
        }
    }

    {/* ///// */ }



    {/* //FUNÇÃO QUE FORMATA DECIMAL EM R$// */ }

    const formatarPreco = (valor) => {
        if (valor === null || valor === undefined) return "R$0,00"; 

        return `R$${valor.toFixed(2).replace(".", ",")}`; 
    };

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