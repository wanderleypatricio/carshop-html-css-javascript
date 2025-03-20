// URL do backend
const API_URL = "http://localhost:3000/veiculos";

// Função para cadastrar um novo veículo
document.getElementById("cadastroVeiculo").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita recarregar a página

    const veiculo = {
        modelo: document.getElementById("modelo").value,
        ano: document.getElementById("ano").value,
        combustivel: document.getElementById("combustivel").value,
        km: document.getElementById("km").value,
        preco: document.getElementById("preco").value,
        imagem: document.getElementById("imagem").value
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(veiculo)
    });

    const data = await response.json();
    document.getElementById("mensagem").innerText = data.message;
    carregarVeiculos(); // Atualiza a lista de veículos
});

// Função para buscar todos os veículos
async function carregarVeiculos() {
    const response = await fetch(API_URL);
    const veiculos = await response.json();

    const lista = document.getElementById("listaVeiculos");
    lista.innerHTML = ""; // Limpa a lista antes de renderizar

    veiculos.forEach(veiculo => {
        const item = document.createElement("div");
        item.classList.add("carro");
        item.innerHTML = `
            <img src="${veiculo.imagem}" alt="${veiculo.modelo}">
            <h3>${veiculo.modelo}</h3>
            <p>Ano: ${veiculo.ano}</p>
            <p>Quilometragem: ${veiculo.km} km</p>
            <p>Preço: R$ ${veiculo.preco}</p>
            <button onclick="editarVeiculo(${veiculo.id})">✏️ Editar</button>
            <button onclick="excluirVeiculo(${veiculo.id})">🗑 Excluir</button>
        `;
        lista.appendChild(item);
    });
}

// Função para editar um veículo
async function editarVeiculo(id) {
    const novoPreco = prompt("Digite o novo preço do veículo:");
    if (!novoPreco) return;

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preco: novoPreco })
    });

    const data = await response.json();
    alert(data.message);
    carregarVeiculos(); // Atualiza a lista
}

// Função para excluir um veículo
async function excluirVeiculo(id) {
    if (!confirm("Tem certeza que deseja excluir este veículo?")) return;

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();
    alert(data.message);
    carregarVeiculos(); // Atualiza a lista
}

// Carregar veículos ao carregar a página
carregarVeiculos();
