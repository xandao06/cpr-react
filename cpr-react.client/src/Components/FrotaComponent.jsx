const apiBaseUrl = `${window.location.protocol}//${window.location.hostname}:7042/api/Frota`;

export const fetchVeiculos = async () => {
    const response = await fetch(`${apiBaseUrl}/GetVeiculos`);
    return response.json();
};

export const fetchRegistros = async () => {
    const response = await fetch(`${apiBaseUrl}/GetRegistros`);
    return response.json();
};

export const addVeiculo = async (newVeiculo) => {
    const response = await fetch(`${apiBaseUrl}/AddVeiculo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVeiculo),
    });
    if (!response.ok) {
        console.error('Erro ao adicionar veículo:', response.statusText);
        return null;
    }
    return response.json();
}

export const addRegistro = async (newRegistro) => {
    const response = await fetch(`${apiBaseUrl}/AddRegistro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRegistro),
    });
    if (!response.ok) {
        console.error('Erro ao adicionar registro:', response.statusText);
        return null;
    }
    return response.json();
}

   

export const editarVeiculo = async (updatedVeiculo) => {
    const response = await fetch(`${apiBaseUrl}/${updatedVeiculo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVeiculo),
    });
    return response.ok;
};

export const deletarVeiculo = async (veiculo) => {
    const response = await fetch(`${apiBaseUrl}/${veiculo.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
};


{/* //FUNÇÃO QUE FORMATA DECIMAL EM R$// */ }

export const formatarPreco = (valor) => {
    if (valor === null || valor === undefined) return "R$0,00";

    return `R$${valor.toFixed(2).replace(".", ",")}`;
};

{/* ///// */ }