document.addEventListener("DOMContentLoaded", () => {
  const pantallaCarga = document.getElementById("pantalla-carga");
  const video = pantallaCarga.querySelector("video");
  const menu = document.getElementById("menu");

  // Bloqueamos scroll al inicio
  document.body.classList.add("no-scroll");

  if (!video || !pantallaCarga) return;

  video.addEventListener("ended", () => {
    // Ocultamos pantalla de carga
    pantallaCarga.classList.add("ocultar");

    // Mostramos el menú
    menu.style.opacity = "1";
    menu.style.pointerEvents = "auto";

    // Quitamos el bloqueo de scroll
    document.body.classList.remove("no-scroll");

    // Eliminamos el section tras la animación
    setTimeout(() => {
      pantallaCarga.style.display = "none";
    }, 1000);
  });
});

