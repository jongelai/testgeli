let indice = 0;
let aciertos = 0;
let bancoPreguntas = [];

const txtTitulo = document.querySelector(".main-header h1");
const txtPregunta = document.getElementById("pregunta-texto");
const contenedorOpciones = document.getElementById("opciones-container");
const barraRelleno = document.getElementById("barra-progreso-relleno");
const txtProgreso = document.getElementById("progreso");
const txtPuntos = document.getElementById("puntos");

const urlParams = new URLSearchParams(window.location.search);
const nombreTest = urlParams.get('test'); 

if (nombreTest) {
    import(`./data/${nombreTest}.js`)
        .then(modulo => {
            txtTitulo.innerText = modulo.datosTest.titulo;
            bancoPreguntas = modulo.datosTest.preguntas;
            cargarPregunta();
        })
        .catch(err => {
            txtPregunta.innerText = "Error al cargar el test.";
            console.error(err);
        });
}

function cargarPregunta() {
    // IMPORTANTE: Limpiar el contenedor antes de generar nuevos botones
    contenedorOpciones.innerHTML = "";
    
    if (indice >= bancoPreguntas.length) {
        mostrarResultadoFinal();
        return;
    }

    const p = bancoPreguntas[indice];
    txtPregunta.innerText = p.q;
    
    const porcentaje = (indice / bancoPreguntas.length) * 100;
    if (barraRelleno) barraRelleno.style.width = `${porcentaje}%`;
    if (txtProgreso) txtProgreso.innerText = `Pregunta ${indice + 1} de ${bancoPreguntas.length}`;

    p.a.forEach((opcion, i) => {
        const btn = document.createElement("button");
        btn.innerText = opcion;
        btn.classList.add("opcion-btn");
        // Usamos una función anónima para pasar el evento y el índice correctamente
        btn.onclick = (e) => validar(i, e); 
        contenedorOpciones.appendChild(btn);
    });
}

function validar(seleccion, evento) {
    const pActual = bancoPreguntas[indice];
    const botones = document.querySelectorAll(".opcion-btn");
    
    // Bloqueo inmediato de clics
    botones.forEach(btn => btn.style.pointerEvents = "none");

    const esCorrecta = (seleccion === pActual.correcta);

    if (esCorrecta) {
        aciertos++;
        // Usamos directamente el target del evento para asegurar que pintamos el botón clickeado
        evento.target.classList.add("correcto");
    } else {
        evento.target.classList.add("incorrecto");
        // Mostramos la correcta resaltándola
        botones[pActual.correcta].classList.add("correcto");
    }

    if (txtPuntos) txtPuntos.innerText = `Aciertos: ${aciertos}`;

    // Espera un segundo y pasa a la siguiente
    setTimeout(() => {
        indice++;
        cargarPregunta();
    }, 1000);
}

function mostrarResultadoFinal() {
    if (barraRelleno) barraRelleno.style.width = "100%";
    const nota = (aciertos / bancoPreguntas.length) * 10;
    txtPregunta.innerText = "Test finalizado";
    
    contenedorOpciones.innerHTML = `
        <div style="text-align: center;">
            <h2 style="font-size: 3rem; color: #2c3e50;">${nota.toFixed(1)}</h2>
            <button onclick="location.reload()" class="opcion-btn" style="text-align:center; background:#3498db; color:white;">Repetir Test</button>
            <button onclick="window.location.href='index.html'" class="opcion-btn" style="text-align:center; margin-top:10px;">Inicio</button>
        </div>
    `;
}