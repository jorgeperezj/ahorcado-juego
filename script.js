let btnIniciar = document.getElementById('iniciar')
let btnReiniciar = document.getElementById('reiniciar')
let imagen = document.getElementById('miCanvas')
let letras = document.getElementById('letras')
let abecedario = document.getElementById('abecedario')
let mensajes = document.getElementById('mensajes')
let mostrarPalabra = document.getElementById('mostrarPalabra')
let resultado = document.getElementById('resultado')
let palabraOculta
let inputs
let inputsVacios
let buscarInputs
let letrasOcultas
let perdidas = 0

const palabrasAleatorias = ["CIELO", "ORDENADOR", "ESTRUCTURA", "ALFABETO", "CARTERA", "VENTANA", "TELEVISOR", "LIBRERIA", "TELEFONO", "REVISTA", "PERIODICO", "ELEFANTE", "ZAPATILLA", "COCODRILO", "ARQUITECTO", "RADIOGRAFIA", "COMPUTADORA", "CUADERNO", "RESTAURANTE", "TELECOMUNICACION", "HOSPITAL", "TELEFONIA", "MICROSCOPIO", "MASCARILLA", "ESTACIONAMIENTO", "ELEVADOR", "CAMIONETA", "EXPLORADOR", "HERRAMIENTA"]

btnIniciar.addEventListener('click', iniciarJuego)
btnReiniciar.addEventListener('click', reiniciar)

function numeroAleatorio() {
    const min = 0;
    const max = palabrasAleatorias.length - 1
    const numeroEnteroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    palabraOculta = palabrasAleatorias[numeroEnteroAleatorio]
}

function iniciarJuego() {
    letras.style.display = 'flex'
    abecedario.style.display = 'block'
    btnReiniciar.style.display = 'block'
    btnIniciar.style.display = 'none'

    numeroAleatorio()

    Array.from(palabraOculta).forEach(letra => {
        inputs = `<input type='text' class='${letra}' name='abc' disabled />`
        letras.innerHTML += inputs
    });
}

function reiniciar() {
    location.reload()
}

function bloquear(letra) {
    let boton = document.getElementById(letra)
    boton.disabled = true;

    validar(letra)
}

function validar(letra) {
    letrasOcultas = document.querySelectorAll('.' + letra)

    letrasOcultas.forEach((letraXletra) => {
        letraXletra.value = letra
        // let classEle = letraXletra.classList.value
    })

    validarLetra(letra);
}

function validarLetra(letra) {
    let validacion = palabraOculta.includes(letra)

    if (!validacion) {
        perdidas += 1
        iniciarCanvas(perdidas)
    }

    if (perdidas >= 7) {
        iniciarCanvas(perdidas)
        abecedario.style.display = 'none'
        mensajes.classList.remove('ocultar')
        mensajes.classList.add('flex-column-center')
        resultado.innerText = '¡PERDISTE! 😣'
        mostrarPalabra.innerText = 'La palabra oculta era: ' + palabraOculta
    }

    buscarInputs = document.querySelectorAll('input[type="text"][name="abc"]');
    inputsVacios = Array.from(buscarInputs).filter(function (input) {
        return input.value === '';
    });

    if (inputsVacios.length === 0) {
        abecedario.style.display = 'none'
        mensajes.classList.remove('ocultar')
        mensajes.classList.add('flex-column-center')
        resultado.innerText = 'GANASTE! 🥳'
    }
}

function iniciarCanvas(imgSrc) {
    let ctx = imagen.getContext('2d');
    let img = new Image();
    img.src = "./img/" + imgSrc + ".png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, imagen.width, imagen.height);
    };
}

window.addEventListener('load', iniciarCanvas(0))