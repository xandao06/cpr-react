
const apiBaseUrl = `${window.location.protocol}//${window.location.hostname}:7042/api/Estoque`;

{/* //BUSCA DE PRODUTOS// */ }

export const fetchProdutos = async () => {
    const response = await fetch(`${apiBaseUrl}`);
    return response.json();
};

{/* //// */ }


{/* //FUNÇÃO DO MODAL ENTRADA// */ }

export const handleEntrada = async (produto) => {
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
        return await response.json();
    }
};


{/* //FUNÇÃO DO MODAL SAIDA// */ }

export const handleSaida = async (produto) => {
        const response = await fetch(`${apiBaseUrl}/UpdateSaida/${produto.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });

        if (response.ok) {
            return await response.json();

    }
}


{/* ///METODO DELETAR CHAMADO// */ }

export const deletarProduto = async (deletarProduto) => {

    const response = await fetch(`${apiBaseUrl}/${deletarProduto.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deletarProduto),

    });
    return response.ok;
    }


{/* //FUNÇÃO QUE FORMATA DECIMAL EM R$// */ }

export const formatarPreco = (valor) => {
    if (valor === null || valor === undefined) return "R$0,00";

    return `R$${valor.toFixed(2).replace(".", ",")}`;
};

{/* ///// */ }