// Función para agregar una tarea a la interfaz
function agregarTareaALaInterfaz(nuevaTarea) {
    let contenedorTareas = document.querySelector(".container");

    let nuevaTareaElemento = document.createElement("div");
    nuevaTareaElemento.classList.add("tareas");

    let nuevoTexto = document.createElement("div");
    nuevoTexto.classList.add("tarea");
    nuevoTexto.textContent = nuevaTarea;

    let nuevoCheck = document.createElement("div");
    nuevoCheck.classList.add("check");

    nuevaTareaElemento.appendChild(nuevoTexto);
    nuevaTareaElemento.appendChild(nuevoCheck);

    contenedorTareas.insertBefore(nuevaTareaElemento, contenedorTareas.lastElementChild);
}

// Función para guardar los datos en localStorage
function guardarDatosEnLocalStorage(datos) {
    localStorage.setItem('listaTareas', JSON.stringify(datos));
}

// Función para cargar los datos desde localStorage
function cargarDatosDesdeLocalStorage() {
    const datos = localStorage.getItem('listaTareas');
    return datos ? JSON.parse(datos) : [];
}

// Función para inicializar la lista de tareas al cargar la página
function inicializarListaTareas() {
    const datosGuardados = cargarDatosDesdeLocalStorage();
    datosGuardados.forEach(tarea => {
        agregarTareaALaInterfaz(tarea);
    });
}

// Llamada a la función para inicializar la lista de tareas al cargar la página
inicializarListaTareas();

// Función para agregar una tarea a la interfaz y guardarla en localStorage
function agregarTareaYGuardarEnLocalStorage(nuevaTarea) {
    agregarTareaALaInterfaz(nuevaTarea);
    const listaDeTareas = cargarDatosDesdeLocalStorage();
    listaDeTareas.push(nuevaTarea);
    guardarDatosEnLocalStorage(listaDeTareas);
}

// Creamos la función para enviar las notas del input
function enviarNota() {
    let nuevaNota = document.querySelector(".newNote").value;
    if (nuevaNota.trim() !== "") {
        agregarTareaYGuardarEnLocalStorage(nuevaNota);

        // Limpiar el input y devolver el foco
        document.querySelector(".newNote").value = "";
        document.querySelector(".newNote").focus(); 
    } else {
        alert("Ingresa una nota con contenido");
    }
}

// Obtener el elemento de botón
let botonEnviar = document.querySelector(".fa-paper-plane");

// Utilizamos la función de enviar el contenido en 2 casos, botón y enter

// Agregar evento de clic al botón 
botonEnviar.addEventListener("click", enviarNota);

// Agregar evento de teclado al input
document.querySelector(".newNote").addEventListener("keypress", function(event) {
    // Verificar si la tecla presionada es "Enter" (código de tecla 13)
    if (event.key === "Enter") {
        // Evitar el comportamiento predeterminado del "Enter" (enviar formulario)
        event.preventDefault();
        // Ejecutar la función para enviar la nota
        enviarNota();
    }
});

// ELIMINAR NOTAS
// Agregamos evento al hacer click en el check para eliminar las notas una vez completadas
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("check")) {
        let tareaCompletada = e.target.parentElement;

        // Agregar animación de aparecer check
        let nuevoCheck = document.createElement("i");
        nuevoCheck.classList.add("fa", "fa-check");
        tareaCompletada.appendChild(nuevoCheck);
        nuevoCheck.style.animation = "aparecerCheck 0.3s forwards";

        // Desvanecer y eliminar la tarea completada
        tareaCompletada.style.transition = "opacity 0.5s ease";
        tareaCompletada.style.opacity = "0";
        setTimeout(() => {
            // Eliminar la tarea completada del DOM
            tareaCompletada.remove();
            // Eliminar la tarea del almacenamiento local
            let listaDeTareas = cargarDatosDesdeLocalStorage();
            const tareaTexto = tareaCompletada.querySelector(".tarea").textContent;
            listaDeTareas = listaDeTareas.filter(tarea => tarea !== tareaTexto);
            guardarDatosEnLocalStorage(listaDeTareas);
        }, 500);
    }
});


// Para borrar todas las tareas
// Función para limpiar el localStorage y reiniciar el todo list
function limpiarLocalStorage() {
    localStorage.removeItem('listaTareas');
    // Limpiar también la interfaz eliminando todos los elementos con la clase "tareas"
    document.querySelectorAll('.tareas').forEach(tarea => tarea.remove());
}

// Obtener el botón de limpiar localStorage
const limpiarLocalStorageBtn = document.querySelector(".limpiar-btn");

// Agregar evento de clic al botón para limpiar localStorage
limpiarLocalStorageBtn.addEventListener("click", limpiarLocalStorage);
