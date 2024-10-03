$(document).ready(function () {
    const $comparisonSlider = $(".comparison-slider");

    if ($comparisonSlider.length) {
        function actualizarAnchoSlider() {
            const compSliderAncho = $comparisonSlider.width() + "px";
            $comparisonSlider.find(".resize img").css({ width: compSliderAncho });
        }

        function inicializarSlider($slider) {
            const compSliderAncho = $slider.width() + "px";
            $slider.find(".resize img").css({ width: compSliderAncho });
            drags($slider.find(".divider"), $slider.find(".resize"), $slider);
        }

        $comparisonSlider.each(function () {
            inicializarSlider($(this));
        });

        $(window).on("resize", function () {
            actualizarAnchoSlider();
        });
    }
});

function drags(dragElement, resizeElement, container) {
    let tocado = false;

    window.addEventListener("touchstart", function () {
        tocado = true;
    });
    window.addEventListener("touchend", function () {
        tocado = false;
    });

    dragElement.on("mousedown touchstart", function (e) {
        dragElement.addClass("arrastrable");
        resizeElement.addClass("redimensionable");

        const startX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
        const anchoArrastre = dragElement.outerWidth();
        const posX = dragElement.offset().left + anchoArrastre - startX;
        const desplazamientoContenedor = container.offset().left;
        const anchoContenedor = container.outerWidth();
        const limiteIzquierdo = desplazamientoContenedor + 10;
        const limiteDerecho =
            desplazamientoContenedor + anchoContenedor - anchoArrastre - 10;

        dragElement.parents().on("mousemove touchmove", function (e) {
            if (!tocado) {
                e.preventDefault();
            }

            const moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
            let valorIzquierdo = moveX + posX - anchoArrastre;

            if (valorIzquierdo < limiteIzquierdo) {
                valorIzquierdo = limiteIzquierdo;
            } else if (valorIzquierdo > limiteDerecho) {
                valorIzquierdo = limiteDerecho;
            }

            const valorAncho =
                ((valorIzquierdo + anchoArrastre / 2 - desplazamientoContenedor) * 100) /
                anchoContenedor +
                "%";

            $(".arrastrable")
                .css("left", valorAncho)
                .on("mouseup touchend touchcancel", function () {
                    $(this).removeClass("arrastrable");
                    resizeElement.removeClass("redimensionable");
                });

            $(".redimensionable").css("width", valorAncho);
        }).on("mouseup touchend touchcancel", function () {
            dragElement.removeClass("arrastrable");
            resizeElement.removeClass("redimensionable");
        });
    }).on("mouseup touchend touchcancel", function (e) {
        dragElement.removeClass("arrastrable");
        resizeElement.removeClass("redimensionable");
    });
}
// Definir arreglos de botones e imágenes
const buttons = [];
const images = [];

for (let i = 1; i <= 8; i++) {
  buttons.push(document.getElementById(`btn${i}`));
  images.push(document.getElementById(`image${i}`));
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    for (let j = 0; j < images.length; j++) {
      images[j].style.display = "none";
      images[j].style.zIndex = "auto";
    }

    images[i].style.display = "block";
    images[i].style.zIndex = 2;
  });
}