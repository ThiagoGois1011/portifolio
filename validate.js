const inputs = document.querySelectorAll('input');
const textarea = document.querySelector(".formcontato__textarea");
const b = document.querySelector(".formcontato__botao");
b.setAttribute("disabled", "disabled");
b.classList.add("botao_desativado")

const nome = document.querySelector("[data-tipo=nome]").validity.valid
const email = document.querySelector("[data-tipo=email]").validity.valid
const assunto = document.querySelector("[data-tipo=assunto]").validity.valid
const mensage = document.querySelector("[data-tipo=mensagem]").validity.valid


inputs.forEach(input => {
	input.addEventListener('blur', (evento) => {
        valida(evento.target);
        
    })
})

textarea.addEventListener('blur', (evento) => {
	valida(evento.target)
})


function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    
   if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('input_invalido');
        input.parentElement.querySelector('.formcontato__input-error').innerHTML = ''
    } else {
        input.parentElement.classList.add('input_invalido');
        input.parentElement.querySelector('.formcontato__input-error').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }

    const nome = document.querySelector("[data-tipo=nome]").validity.valid
	const email = document.querySelector("[data-tipo=email]").validity.valid
	const assunto = document.querySelector("[data-tipo=assunto]").validity.valid
	const mensage = document.querySelector("[data-tipo=mensagem]").validity.valid



    if( nome && email && assunto && mensage){
	b.removeAttribute("disabled");
	b.classList.remove("botao_desativado")
	}else{
	b.setAttribute("disabled", "disabled");
	b.classList.add("botao_desativado")
	}
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'customError'
]

const validadores = {
	
	nome:input => validaTamanho(input),
	email:input => validaEstrutura(input),
	assunto:input => validaTamanho(input),
	mensagem:input => validaTamanho(input)
	
}


const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio.',
        customError:  'O texto deve conter no máximo 50 carateres.'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.',
        customError:  'O email digitado não é válido.'
    },
    assunto: {
    	valueMissing: 'O campo de assunto não pode estar vazio.',
        customError:  'O texto deve conter no máximo 50 carateres.'
    },
    mensagem: {
    	valueMissing: 'O campo de mensagem não pode estar vazio.',
        customError:  'O texto deve conter no máximo 300 carateres.'
    }
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    
    return mensagem
}

function validaTamanho(input){

	var tipoDeInput = input.dataset.tipo;
	var valor = input.value.length
	var mensagem = ""
	

	if(tipoDeInput == "mensagem" && valor > 3){
		mensagem = "O texto deve conter no máximo 300 carateres."
	}

	if ((tipoDeInput == "nome" || tipoDeInput == "assunto") && valor > 50){
		mensagem = "O texto deve conter no máximo 50 carateres."	
	} 

	input.setCustomValidity(mensagem)
}

function validaEstrutura(input){

	var mensagem = ""

	if(input.value.indexOf(".") == -1){
		mensagem = "Deve estar em formato de e-mail contendo o caractere especial @ seguido por um domínio ou provedor seguido por um ponto (.) Exemplo: text@texto.com"
	}
	if(input.validity.valueMissing == false && input.validity.typeMismatch == false){
		input.setCustomValidity(mensagem)
	}

}

