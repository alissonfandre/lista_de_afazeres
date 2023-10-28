const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
    const novaTarefa = input.value.trim();

    if (novaTarefa !== '') {
        minhaListaDeItens.push({
            tarefa: novaTarefa,
            concluida: false,
        });

        input.value = '';
        mostrarTarefas();
    } else {
        alert('insira uma tarefa antes de adicionar.');
    }
}

function mostrarTarefas() {
    let novaLi = '';

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi += `
        <li class="task ${item.concluida ? 'done' : ''}">
            <img src="./img/checked.png" alt="verificado" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="lixo" onclick="apagarItem(${posicao})">
        </li>`;
    });

    listaCompleta.innerHTML = novaLi;

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    mostrarTarefas();
}

function apagarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);
    mostrarTarefas();
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista');

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
        console.log(tarefasDoLocalStorage);
    }

    mostrarTarefas();
}

recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);

button.addEventListener('click', adicionarNovaTarefa);

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        adicionarNovaTarefa();
    }
});
