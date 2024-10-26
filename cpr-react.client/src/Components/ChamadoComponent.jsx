const apiBaseUrl = `${window.location.protocol}//${window.location.hostname}:7042/api/Chamado`;

export const fetchChamados = async () => {
    const response = await fetch(`${apiBaseUrl}`);
    return response.json();
};

export const addChamado = async (newChamado) => {
    const response = await fetch(`${apiBaseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChamado),
    });
    return response.ok ? response.json() : null;
};

export const concluirChamado = async (chamado) => {
    const updatedChamado = { ...chamado, status: 'Concluído' };
    const response = await fetch(`${apiBaseUrl}/${chamado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedChamado),
    });
    return response.ok;
};

export const editarChamado = async (updatedChamado) => {
    const response = await fetch(`${apiBaseUrl}/${updatedChamado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedChamado),
    });
    return response.ok;
};

export const deletarChamado = async (chamado) => {
    const response = await fetch(`${apiBaseUrl}/${chamado.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
};