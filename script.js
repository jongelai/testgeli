const bancoPreguntas = [
    { q: "¿En qué ciudad-estado griega nació el concepto de 'Democracia'?", a: ["Esparta", "Atenas", "Tebas"], correcta: 1 },
    { q: "¿Cómo se llamaba la formación militar básica de los ciudadanos griegos?", a: ["Legión", "Falange", "Manípulo"], correcta: 1 },
    { q: "¿Quién fue el principal estratega de Atenas durante su 'Siglo de Oro'?", a: ["Pericles", "Leónidas", "Alejandro Magno"], correcta: 0 },
    { q: "¿Qué guerra enfrentó a Atenas contra Esparta por la hegemonía en Grecia?", a: ["Guerras Médicas", "Guerra de Troya", "Guerra del Peloponeso"], correcta: 2 },
    { q: "¿Cómo llamaban los griegos a sus ciudades-estado independientes?", a: ["Polis", "Civitas", "Urbs"], correcta: 0 },
    { q: "¿Cuál era la clase social privilegiada en los inicios de la República Romana?", a: ["Plebeyos", "Patricios", "Libertos"], correcta: 1 },
    { q: "¿Contra qué potencia se enfrentó Roma en las Guerras Púnicas?", a: ["Egipto", "Macedonia", "Cartago"], correcta: 2 },
    { q: "¿Quién cruzó los Alpes con elefantes para atacar a Roma?", a: ["Julio César", "Aníbal Barca", "Escipión el Africano"], correcta: 1 },
    { q: "¿Cómo se llamó el periodo de paz y estabilidad iniciado por Augusto?", a: ["Pax Romana", "Pax Augusta", "Edad de Oro"], correcta: 0 },
    { q: "¿Qué institución era el verdadero centro del poder político en la República Romana?", a: ["El Consulado", "El Senado", "La Asamblea"], correcta: 1 },
    { q: "¿Qué filósofo griego fue el maestro de Alejandro Magno?", a: ["Platón", "Sócrates", "Aristóteles"], correcta: 2 },
    { q: "¿En qué año se sitúa tradicionalmente la caída del Imperio Romano de Occidente?", a: ["476 d.C.", "1453 d.C.", "44 a.C."], correcta: 0 },
    { q: "¿Cómo se denominaba el sistema de gobierno formado por tres hombres (ej. César, Pompeyo y Craco)?", a: ["Triunvirato", "Diarquía", "Tetrarquía"], correcta: 0 },
    { q: "¿Qué emperador romano legalizó el cristianismo mediante el Edicto de Milán?", a: ["Nerón", "Trajano", "Constantino"], correcta: 2 },
    { q: "¿Cuál era el nombre de la plaza pública que servía como centro de la vida en Roma?", a: ["Ágora", "Foro", "Panteón"], correcta: 1 },
    { q: "¿Qué orden arquitectónico griego se caracteriza por sus capiteles con volutas?", a: ["Dórico", "Jónico", "Corintio"], correcta: 1 },
    { q: "¿Cuál era el nombre de las provincias romanas que dependían directamente del Emperador?", a: ["Senatoriales", "Municipales", "Imperiales"], correcta: 2 },
    { q: "¿Qué famoso esclavo lideró la mayor rebelión de gladiadores contra Roma?", a: ["Espartaco", "Crixo", "Máximo"], correcta: 0 },
    { q: "¿Cómo llamaban los romanos al Mar Mediterráneo?", a: ["Mare Magnum", "Mare Nostrum", "Oceanus"], correcta: 1 },
    { q: "¿Qué sistema de gobierno estableció Diocleciano para dividir el Imperio en cuatro partes?", a: ["Monarquía", "Tetrarquía", "Principado"], correcta: 1 }
];

let indice = 0;
let aciertos = 0;

const txtPregunta = document.getElementById("pregunta-texto");
const contenedorOpciones = document.getElementById("opciones-container");
const txtProgreso = document.getElementById("progreso");
const txtPuntos = document.getElementById("puntos");

function cargarPregunta() {
    contenedorOpciones.innerHTML = "";
    
    if (indice >= bancoPreguntas.length) {
        txtPregunta.innerText = "¡Examen de Historia Finalizado!";
        txtProgreso.innerText = "Evaluación terminada";
        mostrarNotaFinal();
        return;
    }

    let p = bancoPreguntas[indice];
    txtPregunta.innerText = p.q;
    txtProgreso.innerText = `Pregunta ${indice + 1} de ${bancoPreguntas.length}`;

    p.a.forEach((opcion, i) => {
        const boton = document.createElement("button");
        boton.innerText = opcion;
        boton.classList.add("opcion-btn");
        boton.onclick = () => validar(i);
        contenedorOpciones.appendChild(boton);
    });
}

function validar(seleccion) {
    if (seleccion === bancoPreguntas[indice].correcta) {
        aciertos++;
    }
    indice++;
    txtPuntos.innerText = `Aciertos: ${aciertos}`;
    cargarPregunta();
}

function mostrarNotaFinal() {
    const nota = (aciertos / bancoPreguntas.length) * 10;
    let feedback = "";
    if (nota >= 9) feedback = "¡Excelente! Eres un auténtico erudito del mundo clásico.";
    else if (nota >= 5) feedback = "Aprobado. Conoces las bases de nuestra civilización.";
    else feedback = "Debes repasar los textos clásicos, ciudadano.";
    
    contenedorOpciones.innerHTML = `
        <div style="text-align:center">
            <h2 style="font-size: 3rem; margin: 10px 0;">${nota.toFixed(1)}</h2>
            <p>${feedback}</p>
            <button onclick="location.reload()" class="opcion-btn" style="text-align:center">Reiniciar Examen</button>
        </div>
    `;
}

cargarPregunta();