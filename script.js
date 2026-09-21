/* =========================================
   CARRUSEL DEL HERO
========================================= */

const imagenesCarrusel = [

    "assets/carrusel/autobus.jpg",
    "assets/carrusel/chiclero.jpg",
    "assets/carrusel/dann.JPG",
    "assets/carrusel/familia.jpg",
    "assets/carrusel/imagen10.jpg",
    "assets/carrusel/imagen11.jpeg",
    "assets/carrusel/imagen12.jpg",
    "assets/carrusel/monumento.jpg",
    "assets/carrusel/piterpan.jpg",
    "assets/carrusel/puerta.jpg",
    "assets/carrusel/puesta.jpg"

];


const slides =
    document.querySelectorAll(".hero-slide");


let indiceActual = 0;

let slideActual = 0;


/* =========================================
   PRECARGAR IMÁGENES
========================================= */

imagenesCarrusel.forEach((ruta) => {

    const imagen = new Image();

    imagen.src = ruta;

});


/* =========================================
   PRIMERA IMAGEN
========================================= */

slides[0].style.backgroundImage =
    `url("${imagenesCarrusel[0]}")`;


/* =========================================
   CAMBIAR IMAGEN
========================================= */

setInterval(() => {


    const siguienteIndice =
        (indiceActual + 1) %
        imagenesCarrusel.length;


    const siguienteSlide =
        slideActual === 0
            ? 1
            : 0;


    slides[siguienteSlide].style.backgroundImage =
        `url("${imagenesCarrusel[siguienteIndice]}")`;


    slides[siguienteSlide].classList.add("active");


    slides[slideActual].classList.remove("active");


    slideActual =
        siguienteSlide;


    indiceActual =
        siguienteIndice;


},4000);



/* =========================================
   CONTADOR
========================================= */

const targetDate =
    new Date(
        "October 27, 2026 00:00:00"
    ).getTime();


const timer =
    setInterval(function(){


        const now =
            new Date().getTime();


        const distance =
            targetDate - now;


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (distance %
                (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (distance %
                (1000 * 60 * 60))
                /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (distance %
                (1000 * 60))
                /
                1000
            );


        document.getElementById("days")
            .innerHTML = days;


        document.getElementById("hours")
            .innerHTML = hours;


        document.getElementById("minutes")
            .innerHTML = minutes;


        document.getElementById("seconds")
            .innerHTML = seconds;



        if(distance < 0){

            clearInterval(timer);


            document.querySelector(".countdown")
                .innerHTML =
                "<h2>¡El Congreso ha comenzado!</h2>";

        }


    },1000);



/* =========================================
   PANEL DE INFORMACIÓN DE PONENTES
========================================= */

const speakerCards =
    document.querySelectorAll(
        ".speaker-card"
    );


const speakerModal =
    document.getElementById(
        "speakerModal"
    );


const modalSpeakerImage =
    document.getElementById(
        "modalSpeakerImage"
    );


const modalSpeakerName =
    document.getElementById(
        "modalSpeakerName"
    );


const modalSpeakerDescription =
    document.getElementById(
        "modalSpeakerDescription"
    );


const speakerModalClose =
    document.getElementById(
        "speakerModalClose"
    );



/* =========================================
   ABRIR PANEL
========================================= */

speakerCards.forEach(card => {


    card.addEventListener(
        "click",
        () => {


            /*
                Nombre completo utilizado
                dentro del modal.
            */

            const name =
                card.dataset.modalName ||
                card.dataset.name;


            /*
                Ruta de la fotografía.
            */

            const image =
                card.dataset.image;


            /*
                Contenido oculto de la tarjeta.
            */

            const modalContent =
                card.querySelector(
                    ".speaker-hidden-content"
                );


            /*
                Colocar imagen.
            */

            modalSpeakerImage.src =
                image;


            modalSpeakerImage.alt =
                name;



            /*
                Si es Omar agregamos
                la clase especial que
                evita recortar su fotografía.

                Si es otro ponente,
                la clase se elimina.
            */

            modalSpeakerImage.classList.toggle(

                "omar-modal-image",

                card.dataset.name ===
                "Dr Omar Ramirez"

            );



            /*
                Colocar nombre completo.
            */

            modalSpeakerName.textContent =
                name;



            /*
                Copiar el contenido
                curricular al modal.
            */

            if(modalContent){

                modalSpeakerDescription.innerHTML =
                    modalContent.innerHTML;

            }else{

                modalSpeakerDescription.innerHTML =
                    "";

            }



            /*
                Mostrar modal.
            */

            speakerModal.classList.add(
                "active"
            );


            /*
                Evitar que la página
                principal se desplace
                mientras el modal está abierto.
            */

            document.body.style.overflow =
                "hidden";

        }

    );

});



/* =========================================
   CERRAR CON X
========================================= */

speakerModalClose.addEventListener(

    "click",

    cerrarSpeakerModal

);



/* =========================================
   CERRAR HACIENDO CLICK
   FUERA DEL CONTENIDO
========================================= */

speakerModal.addEventListener(

    "click",

    (event) => {


        if(
            event.target ===
            speakerModal
        ){

            cerrarSpeakerModal();

        }

    }

);



/* =========================================
   CERRAR CON ESC
========================================= */

document.addEventListener(

    "keydown",

    (event) => {


        if(
            event.key === "Escape" &&
            speakerModal.classList.contains(
                "active"
            )
        ){

            cerrarSpeakerModal();

        }

    }

);



/* =========================================
   FUNCIÓN PARA CERRAR MODAL
========================================= */

function cerrarSpeakerModal(){


    speakerModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";


    /*
        Quitamos la clase especial
        de Omar al cerrar.
    */

    modalSpeakerImage.classList.remove(
        "omar-modal-image"
    );


}