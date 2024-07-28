// Dados iniciais: objeto para armazenar os itens em cada área
let areas = {
    a: null,
    b: null,
    c: null,
};

// Eventos
// Adiciona os ouvintes de eventos de drag (arrastar) aos itens
document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("dragstart", dragStart); // Quando o arraste começa
    item.addEventListener("dragend", dragEnd);     // Quando o arraste termina
});

// Adiciona os ouvintes de eventos de drag and drop (arrastar e soltar) às áreas
document.querySelectorAll(".area").forEach((area) => {
    area.addEventListener("dragover", dragOver);   // Quando um item é arrastado sobre a área
    area.addEventListener("dragleave", dragLeave); // Quando um item é arrastado para fora da área
    area.addEventListener("drop", drop);           // Quando um item é solto na área
});

// Adiciona os ouvintes de eventos de drag and drop às áreas neutras
document.querySelectorAll(".neutralArea").forEach((area) => {
    area.addEventListener("dragover", dragOverNeutral); // Quando um item é arrastado sobre a área neutra
    area.addEventListener("dragleave", dragLeave);      // Quando um item é arrastado para fora da área neutra
    area.addEventListener("drop", dropNeutral);         // Quando um item é solto na área neutra
});

// Funções
// Função chamada quando o arraste começa
function dragStart(e) {
    e.currentTarget.classList.add("dragging"); // Adiciona a classe 'dragging' ao item sendo arrastado
}

// Função chamada quando o arraste termina
function dragEnd(e) {
    e.currentTarget.classList.remove("dragging"); // Remove a classe 'dragging' do item sendo arrastado
}

// Função chamada quando um item é arrastado sobre uma área
function dragOver(e) {
    // Se a área não contém nenhum item
    if (e.currentTarget.querySelector(".item") === null) {
        e.preventDefault(); // Previne o comportamento padrão para não permitir o drop
        e.currentTarget.classList.add("hover"); // Adiciona a classe 'hover' à área
    }
}

// Função chamada quando um item é arrastado para fora de uma área
function dragLeave(e) {
    e.currentTarget.classList.remove("hover"); // Remove a classe 'hover' da área
}

// Função chamada quando um item é solto em uma área
function drop(e) {
    e.currentTarget.classList.remove("hover"); // Remove a classe 'hover' da área

    // Se a área não contém nenhum item
    if (e.currentTarget.querySelector(".item") === null) {
        let dragItem = document.querySelector(".item.dragging"); // Seleciona o item sendo arrastado
        e.currentTarget.appendChild(dragItem); // Adiciona o item à área
        updateArea(); // Atualiza as áreas
    }
}

// Função chamada quando um item é solto em uma área neutra
function dropNeutral(e) {
    e.currentTarget.classList.remove("hover"); // Remove a classe 'hover' da área neutra
    let dragItem = document.querySelector(".item.dragging"); // Seleciona o item sendo arrastado
    e.currentTarget.appendChild(dragItem); // Adiciona o item à área neutra
    updateArea(); // Atualiza as áreas
}

// Função chamada quando um item é arrastado sobre uma área neutra
function dragOverNeutral(e) {
    e.preventDefault(); // Previne o comportamento padrão para permitir o drop
    e.currentTarget.classList.add("hover"); // Adiciona a classe 'hover' à área neutra
}

// Função para atualizar o estado das áreas
function updateArea() {
    // Itera sobre todas as áreas
    document.querySelectorAll(".area").forEach((area) => {
        let areaName = area.getAttribute("data-name"); // Obtém o nome da área

        // Se a área contém um item
        if (area.querySelector(".item") !== null) {
            areas[areaName] = area.querySelector(".item").innerHTML; // Atualiza o estado da área com o conteúdo do item
        } else {
            areas[areaName] = null; // Define o estado da área como null se não contém item
        }
    });

    // Verifica se os itens estão na ordem correta
    if (areas.a === "1" && areas.b === "2" && areas.c === "3") {
        document.querySelector(".areas").classList.add("correct"); // Adiciona a classe 'correct' se a ordem estiver correta
    } else {
        document.querySelector(".areas").classList.remove("correct"); // Remove a classe 'correct' se a ordem estiver incorreta
    }
}
