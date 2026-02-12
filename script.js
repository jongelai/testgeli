import { bancoPreguntas } from './preguntas.js';

let indice = 0;
let aciertos = 0;

const txtPregunta = document.getElementById("pregunta-texto");
const contenedorOpciones = document.getElementById("opciones-container");
const txtProgreso = document.getElementById("progreso");
const txtPuntos = document.getElementById("puntos");
const barraRelleno = document.getElementById("barra-progreso-relleno");

function cargarPregunta() {
    contenedorOpciones.innerHTML = "";
    
    // Si terminamos las preguntas, mostramos el resultado
    if (indice >= bancoPreguntas.length) {
        mostrarResultadoFinal();
        return;
    }

    const p = bancoPreguntas[indice];
    txtPregunta.innerText = p.q;
    
    // 1. Actualizar barra de progreso visual
    const porcentaje = (indice / bancoPreguntas.length) * 100;
    if (barraRelleno) barraRelleno.style.width = `${porcentaje}%`;

    // 2. Actualizar marcador de texto
    if (txtProgreso) txtProgreso.innerText = `Pregunta ${indice + 1} de ${bancoPreguntas.length}`;

    // 3. Crear botones de opciones
    p.a.forEach((opcion, i) => {
        const btn = document.createElement("button");
        btn.innerText = opcion;
        btn.classList.add("opcion-btn");
        btn.onclick = () => validar(i);
        contenedorOpciones.appendChild(btn);
    });
}

function validar(seleccion) {
    // Bloquear otros clics mientras esperamos
    const botones = document.querySelectorAll(".opcion-btn");
    botones.forEach(btn => btn.style.pointerEvents = "none");

    const pActual = bancoPreguntas[indice];
    const esCorrecta = seleccion === pActual.correcta;

    // Aplicar colores visuales
    if (esCorrecta) {
        aciertos++;
        botones[seleccion].classList.add("correcto");
    } else {
        botones[seleccion].classList.add("incorrecto");
        // Mostramos cuál era la correcta para que el alumno aprenda
        botones[pActual.correcta].classList.add("correcto");
    }

    // Esperar 1 segundo para que el usuario vea el feedback
    setTimeout(() => {
        indice++;
        if (txtPuntos) txtPuntos.innerText = `Aciertos: ${aciertos}`;
        cargarPregunta();
    }, 1000);
}

function mostrarResultadoFinal() {
    // Llenar la barra al 100% al finalizar
    if (barraRelleno) barraRelleno.style.width = "100%";
    
    const nota = (aciertos / bancoPreguntas.length) * 10;
    txtPregunta.innerText = "¡Examen Finalizado!";
    
    let mensaje = nota >= 5 ? "¡Enhorabuena, has aprobado!" : "Debes repasar más, ciudadano.";
    
    contenedorOpciones.innerHTML = `
        <div style="text-align: center;">
            <h2 style="font-size: 3rem; margin-bottom: 10px;">${nota.toFixed(1)}</h2>
            <p>${mensaje}</p>
            <button onclick="location.reload()" class="opcion-btn" style="text-align:center; margin-top:20px;">Reiniciar Test</button>
        </div>
    `;
}

// Iniciar el test
cargarPregunta();