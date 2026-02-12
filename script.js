import { bancoPreguntas } from './preguntas.js';

let indice = 0;
let aciertos = 0;

const txtPregunta = document.getElementById("pregunta-texto");
const contenedorOpciones = document.getElementById("opciones-container");

function cargarPregunta() {
    if (indice >= bancoPreguntas.length) {
        txtPregunta.innerText = "¡Fin del examen!";
        contenedorOpciones.innerHTML = `<h2>Nota: ${(aciertos / bancoPreguntas.length * 10).toFixed(1)}</h2>`;
        return;
    }

    let p = bancoPreguntas[indice];
    txtPregunta.innerText = p.q;
    contenedorOpciones.innerHTML = "";

    p.a.forEach((opcion, i) => {
        const btn = document.createElement("button");
        btn.innerText = opcion;
        btn.classList.add("opcion-btn");
        btn.onclick = () => {
            if(i === p.correcta) aciertos++;
            indice++;
            cargarPregunta();
        };
        contenedorOpciones.appendChild(btn);
    });
}

cargarPregunta();