function sortear() {
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const participantes = JSON.parse(localStorage.getItem('participantes')) || {};
    const resultadoDiv = document.getElementById('resultado');

    if (Object.keys(participantes).length < quantidade) {
        resultadoDiv.textContent = "Não há participantes suficientes para o sorteio.";
        return;
    }
    const numerosSorteados = new Set();
    resultadoDiv.textContent = "Ganhadores:\n";
    while (numerosSorteados.size < quantidade) {
        const numeroAleatorio = Math.floor(Math.random() * Object.keys(participantes).length);
        const numeroSorteado = Object.keys(participantes)[numeroAleatorio];
        numerosSorteados.add(numeroSorteado);
        resultadoDiv.textContent += `Número: ${numeroSorteado} - Nome: ${participantes[numeroSorteado]}\n`;
    }
}

function cadastrarParticipante() {
    const numero = parseInt(document.getElementById('numeroParticipante').value);
    const nome = document.getElementById('nomeParticipante').value;
    const dados = JSON.parse(localStorage.getItem('participantes')) || {};
    if (dados[numero]) {
        alert('Número já cadastrado.');
        return;
    }
    if (!numero || !nome) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    dados[numero] = nome;
    localStorage.setItem('participantes', JSON.stringify(dados));
    alert('Participante cadastrado com sucesso!');
}

function verParticipantes() {
    const dados = JSON.parse(localStorage.getItem('participantes')) || {};
    let lista = '';
    for (const numero in dados) {
        lista += `Número: ${numero} - Nome: ${dados[numero]}<br>`;
    }
    document.getElementById('listaParticipantes').innerHTML = lista;
}

function excluirParticipante(numero) {

    let participantes = JSON.parse(localStorage.getItem('participantes')) || {};


    if (isNaN(numero) || numero <= 0) {
        alert("Número inválido! Por favor, informe um número inteiro positivo.");
        return;
    }


    if (!participantes[numero]) {
        alert("Participante não encontrado.");
        return;
    }

    delete participantes[numero];

    localStorage.setItem('participantes', JSON.stringify(participantes));


    exibirParticipantes();

    document.getElementById('numeroExcluir').value = '';
}