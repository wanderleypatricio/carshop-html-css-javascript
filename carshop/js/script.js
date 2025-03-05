let slideIndex = 0;

function mudarSlide(direction) {
    const slides = document.querySelector(".banner-slide");
    const totalSlides = document.querySelectorAll(".slide").length;
    
    slideIndex = (slideIndex + direction + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Troca automática a cada 5 segundos
setInterval(() => mudarSlide(1), 5000);


function abrirModal(imagemSrc) {
    document.getElementById("imgModal").src = imagemSrc;
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}
