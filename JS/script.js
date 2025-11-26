const form = document.getElementById("form");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const comentarioInput = document.getElementById("comentario");
const listaComentarios = document.getElementById("lista-comentarios")

listaComentarios.style.display = "flex";
listaComentarios.style.flexDirection = "column";
listaComentarios.style.justifyContent = "center";
listaComentarios.style.alignItems = "center";

function validarEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

function carregarComentario(){
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || []
    comentarios.forEach(adicionarComentarioNaPagina)
}

function adicionarComentarioNaPagina({id, nome, email, comentario, data}){
    const card = document.createElement("div")
    card.classList.add("comentario-card")
    card.setAttribute("data-id", id)
    
    const nomeSeguro = escaparHTML(nome)
    const comentarioSeguro = escaparHTML(comentario)

    card.innerHTML = `
        <div class="info-top">
            <div class="avatar">${nomeSeguro[0].toUpperCase()}</div>
            <div class="nome-data">
                <span>${nomeSeguro}</span>
                <span>${data}</span>
            </div>
        </div>
        <p class="texto-comentario">${comentarioSeguro}</p>
        <div class="actions">
            <div class="left">
                <button class="curtir-btn">❤ Curtir</button>
                <button class="responder-btn">↩ Responder</button>
            </div>
            <div class="right">
                <button class="delete-btn">🗑 Excluir</button>
            </div>    
        </div> 
    `

     card.querySelector(".delete-btn").addEventListener("click", () => {
        if(confirm("Deseja excluir o comentário?")){
            card.classList.add("removendo")
            setTimeout(() => {
                removerComentario(id)
                card.remove()
            }, 300)
        }
     })

     listaComentarios.prepend(card)
}

function escaparHTML(texto){
    const div = document.createElement('div')
    div.textContent = texto
    return div.innerHTML
}

function salvarComentario(nome, email, comentario){
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || []
    const novoComentario = {
        id: Date.now(),
        nome,
        email,
        comentario,
        data: new Date().toLocaleDateString("pt-BR", {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }
    comentarios.unshift(novoComentario)
    localStorage.setItem("comentarios", JSON.stringify(comentarios))
    return novoComentario
}

function removerComentario(id){
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || []
    const novoArray = comentarios.filter(c => c.id !== id)
    localStorage.setItem("comentarios", JSON.stringify(novoArray))
}

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const comentario = comentarioInput.value.trim();

    if(!nome || !email || !comentario){
        alert("Preencha todos os campos!")
        return
    }

    if(nome.length < 3){
        alert("O nome deve ter pelo menos 3 caracteres!")
        nomeInput.focus()
        return
    }

    if(!validarEmail(email)){
        alert("Insira um email válido")
        emailInput.focus()
        return
    }

    if(comentario.length < 10){
        alert("O comentário deve ter pelo menos 10 caracteres")
        comentarioInput.focus()
        return
    }

    const novo = salvarComentario(nome, email, comentario)

    adicionarComentarioNaPagina({nome, email, comentario})

    form.reset()

    nomeInput.focus()

    alert("Comentário enviado com sucesso")
})