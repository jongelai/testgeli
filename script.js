import { bancoPreguntas } from './preguntas.js';

let indice = 0;
let aciertos = 0;

const txtPregunta = document.getElementById("pregunta-texto");
const contenedorOpciones = document.getElementById("opciones-container");
const txtProgreso = document.getElementById("progreso");
const txtPuntos = document.getElementById("puntos");

function cargarPregunta() {
    contenedorOpciones.innerHTML = "";
    
    if (indice >= bancoPreguntas.length) {
        mostrarResultadoFinal();
        return;
    }

    const p = bancoPreguntas[indice];
    txtPregunta.innerText = p.q;
    
    // Actualizar marcador de progreso
    if(txtProgreso) txtProgreso.innerText = `Pregunta ${indice + 1} de ${bancoPreguntas.length}`;

    p.a.forEach((opcion, i) => {
        const btn = document.createElement("button");
        btn.innerText = opcion;
        btn.classList.add("opcion-btn");
        btn.onclick = () => validar(i);
        contenedorOpciones.appendChild(btn);
    });
}

function validar(seleccion) {
    if (seleccion === bancoPreguntas[indice].correcta) {
        aciertos++;
    }
    indice++;
    if(txtPuntos) txtPuntos.innerText = `Aciertos: ${aciertos}`;
    cargarPregunta();
}

function mostrarResultadoFinal() {
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

// Iniciar el juego
cargarPregunta();