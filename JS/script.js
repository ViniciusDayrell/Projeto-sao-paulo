const form = document.getElementById("form");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const comentarioInput = document.getElementById("comentario");
const listaComentarios = document.getElementById("lista-comentarios")

function validarEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

function adicionarComentarioNaPagina({nome, email, comentario}){
    const div = document.createElement("div")
    div.classList.add("comentario")
    div.style.display = "flex"
    div.style.flexDirection = "colunm"
    div.style.justifyContent = "center"

    const nomeElemento = document.createElement("h4")
    nomeElemento.textContent = nome

    const emailElemento = document.createElement("p")
    emailElemento.textContent = `Email: ${email}`
    emailElemento.style.fontSize = "0.9em"
    emailElemento.style.color = "#666"

    const textoElemento = document.createElement("p")
    textoElemento.textContent = comentario

    div.appendChild(nomeElemento)
    div.appendChild(emailElemento)
    div.appendChild(textoElemento)
    listaComentarios.appendChild(div)
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

    adicionarComentarioNaPagina({nome, email, comentario})

    salvarComentario(nome, email, comentario)

    form.reset()

    alert("Comentário enviado com sucesso")
})