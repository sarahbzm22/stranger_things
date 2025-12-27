document.addEventListener("DOMContentLoaded", () => {
  const prePantalla = document.getElementById("pre-pantalla-carga");
  const pantallaCarga = document.getElementById("pantalla-carga");
  const video = pantallaCarga.querySelector("video");
  const menu = document.getElementById("menu");
  const boton = document.getElementById("btn-play");
  const audio = document.getElementById("st-audio");

  // Bloqueamos scroll al inicio
  document.body.classList.add("no-scroll");

  // El vídeo NO debe arrancar solo
  video.pause();

  boton.addEventListener("click", () => {
    // Ocultamos la pre-pantalla
    prePantalla.style.opacity = "0";
    prePantalla.style.pointerEvents = "none";

    setTimeout(() => {
      prePantalla.style.display = "none";
    }, 1000);

    // Arrancamos vídeo y audio A LA VEZ
    video.play();
    audio.play();
  });

  video.addEventListener("ended", () => {
    // Ocultamos pantalla de carga
    pantallaCarga.classList.add("ocultar");

    // Mostramos el menú
    menu.classList.add("visible");

    // Quitamos bloqueo de scroll
    document.body.classList.remove("no-scroll");

    // Eliminamos el section tras la animación
    setTimeout(() => {
      pantallaCarga.style.display = "none";
    }, 1000);
  });
});
