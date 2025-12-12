//Pestañas y contenidos
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Añadir un event listener a cada pestaña
tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        // Verificar si la pestaña ya está activa
        const isActive = tab.classList.contains('active');

        // Remover la clase 'active' de todas las pestañas y contenidos
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active')); // Ocultar todo

        // Si la pestaña no estaba activa, activarla; si ya estaba activa, cerrarla
        if (!isActive) {
            tab.classList.add('active');  // Hacer la pestaña activa
            const tabId = tab.getAttribute('data-tab'); // Obtener el id del contenido
            document.getElementById(tabId).classList.add('active'); // Mostrar el contenido
        }
    });
});

//Efecto scroll
window.addEventListener('scroll', function () {
    const menu = document.querySelector('nav');

    // Si el usuario hace scroll más de 50px
    if (window.scrollY > 50) {
        menu.classList.add('active');  // Activa el fondo verde y el padding extra
    } else {
        menu.classList.remove('active');  // Elimina el fondo verde cuando no hay scroll
    }
});


// Inicializa el lightbox para las imágenes con la clase 'lightbox'

// Abre el lightbox y carga la imagen seleccionada
/* function modalLightbox() {
    document.getElementById("modalLightbox").style.display = "block";
    document.documentElement.style.overflow = 'hidden'; // Correcto "hidden" en lugar de "hiden"

    let listaImgDieta = document.getElementsByClassName("imgDieta");

    for (let i = 0; i < listaImgDieta.length; i++) {
        listaRutaImgDieta.push(listaImgDieta[i].src);  // Almacenar las rutas de las imágenes
    }
    document.getElementById("imageToShow").innerHTML = `<img class='image-lb' src='${listaRutaImgDieta[numIMG]}'>`;
} */

let listaRutaImgDieta = [];  // Array para almacenar las rutas de las imágenes
let numIMG = 0;  // Variable para almacenar el índice de la imagen actual

// Esta función se debe llamar cuando la página esté lista
function readyLightbox() {
    // Obtener todas las imágenes con la clase 'imgDieta'
    let listaImgDieta = document.getElementsByClassName("imgDieta");

    // Limpiar la lista de imágenes para evitar duplicados
    listaRutaImgDieta = [];

    // Llenar el array con las rutas de las imágenes
    for (let i = 0; i < listaImgDieta.length; i++) {
        listaRutaImgDieta.push(listaImgDieta[i].src);  // Almacenar las rutas de las imágenes

        // Añadir el eventListener a cada imagen
        listaImgDieta[i].addEventListener('click', openLightbox);
    }
}


// Abre el lightbox y muestra la imagen seleccionada
function openLightbox(event) {
    let rutaImgClick = event.currentTarget.src;  // Obtener la ruta de la imagen seleccionada
    numIMG = listaRutaImgDieta.indexOf(rutaImgClick);  // Obtener el índice de la imagen seleccionada

    // Mostrar la imagen en el modal
    document.getElementById("imageToShow").innerHTML = `<img class='image-lb' src='${listaRutaImgDieta[numIMG]}'>`;

    // Abrir el modal
    document.getElementById("modalLightbox").style.display = "block";
    document.documentElement.style.overflow = 'hidden';  // Desactivar el scroll mientras el modal está abierto

    // Añadir el evento de clic para cerrar el modal cuando se haga clic fuera de la imagen
    document.getElementById("modalLightbox").addEventListener("click", function(event) {
        // Verificar si el clic fue fuera de la imagen
        if (!event.target.closest("#imageToShow")) {  // Verifica si el clic fue fuera de la imagen
            closeLightboxModal();  // Cerrar el modal
        }
    });
}

// Muestra la siguiente imagen
function nextImgDieta(event) {
    event.stopPropagation(); // Detener la propagación del evento al modal
    numIMG++;
    if (numIMG >= listaRutaImgDieta.length) {
        numIMG = 0; // Si llegamos al final, volvemos a la primera imagen
    }
    document.getElementById("imageToShow").innerHTML = `<img class='image-lb' src='${listaRutaImgDieta[numIMG]}'>`;
}

// Muestra la imagen anterior
function previousImgDieta(event) {
    event.stopPropagation(); // Detener la propagación del evento al modal
    numIMG--;
    if (numIMG < 0) {
        numIMG = listaRutaImgDieta.length - 1; // Si estamos al principio, vamos a la última imagen
    }
    document.getElementById("imageToShow").innerHTML = `<img class='image-lb' src='${listaRutaImgDieta[numIMG]}'>`;
}

function closeLightboxModal() {
    document.getElementById("modalLightbox").style.display = "none";  // Ocultar el modal del lightbox
    document.documentElement.style.overflow = 'auto';  // Restaurar el scroll
}

// Asegúrate de que el script sea ejecutado cuando la página se haya cargado completamente
window.onload = function () {
    readyLightbox();  // Inicializa el lightbox
}



// Validación de formulario
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        let valid = true;
        const inputs = form.querySelectorAll("input, textarea");

        inputs.forEach(function (input) {
            if (input.value.trim() === "") {
                valid = false;
                input.style.borderColor = "red";  // resaltar campos vacíos en rojo
            } else {
                input.style.borderColor = "#ccc"; // restaurar color de borde
            }
        });

        if (!valid) {
            event.preventDefault();  // Evitar el envío del formulario si no es válido
            alert("Por favor, completa todos los campos.");
        }
    });
});

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página

    // Obtener el valor del campo
    const pesoEdadEstatura = document.getElementById('pesoEdadEstatura').value;

    // Validar que los valores estén separados por dos barras (formato: "Peso / Edad / Estatura")
    const regex = /^[0-9]+(kg)\s*\/\s*[0-9]+(\s*\/\s*[0-9]+(cm))$/;

    if (!regex.test(pesoEdadEstatura)) {
        alert("Por favor, ingresa los valores en el formato correcto: Peso(kg) / Edad / Estatura (cm)");
    } else {
        // Si la validación pasa, puedes proceder con el envío del formulario o mostrar el modal
        console.log("Formulario enviado correctamente.");
    }
});

//modal contacto
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página

    // Obtener los valores del formulario
    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const pesoEdadEstatura = document.getElementById('pesoEdadEstatura').value;
    const diaCita = document.getElementById('diaCita').value;


    // Crear el mensaje de confirmación
    const mensaje = `
        <p>Gracias, ${nombreCompleto}. Hemos recibido tu solicitud de cita para el día: ${diaCita} con los siguientes datos:</p>
        <ul>
            <li>Numero de contacto: ${telefono}</li>
            <li>Email: ${email}</li>
            <li>Su peso, edad y estatura: ${pesoEdadEstatura}</li>
        </ul>
    <P>Comprabaremos nuestra disponibilidad y le contactaremos.</P>`;

    // Mostrar el mensaje de confirmación en el modal
    document.getElementById('confirmation-message').innerHTML = mensaje;

    // Mostrar el modal
    document.getElementById('modal').style.display = 'flex';
});



function closeModal() {
    document.getElementById('modal').style.display = 'none';  // Cierra el modal al ponerlo en display 'none'
}

//Boton para pausar animacion de imagenes hero
function pauseAnimation() {
    document.getElementById("animacionHero").pause();
}


//mensaje de confirmacion antes de enviar
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        let confirmSubmit = confirm("¿Estás seguro de que deseas enviar el formulario?");
        if (!confirmSubmit) {
            event.preventDefault();  // Detiene el envío del formulario
        }
    });