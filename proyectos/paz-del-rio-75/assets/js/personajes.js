$(function () {
    $("#container1").twentytwenty();
});
$(function () {
    $("#container2").twentytwenty();
});
$(function () {
    $("#container3").twentytwenty();
});

function moveToSelected(element) {
    if (element == "next") {
        var selected = $(".selected").next();
    } else if (element == "prev") {
        var selected = $(".selected").prev();
    } else {
        var selected = element;
    }

    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();

    $(selected).removeClass().addClass("selected");

    $(prev).removeClass().addClass("prev");
    $(next).removeClass().addClass("next");

    $(nextSecond).removeClass().addClass("nextRightSecond");
    $(prevSecond).removeClass().addClass("prevLeftSecond");

    $(nextSecond).nextAll().removeClass().addClass('hideRight');
    $(prevSecond).prevAll().removeClass().addClass('hideLeft');

    // Actualizar el indicador correspondiente cuando se mueve automáticamente
    var index = $("#carousel-per div").index(selected);
    $("#carousel-indicators .indicator-per").removeClass("active");
    $("#carousel-indicators .indicator-per[data-slide-to=" + index + "]").addClass("active");
}

// Función para mover automáticamente el carrusel
function autoMoveCarousel() {
    var $selected = $(".selected");
    var $next = $selected.next();

    // Verificar si hemos llegado al último elemento
    if ($next.length === 0) {
        $next = $("#carousel-per div:first"); // Saltar al primer elemento
    }

    moveToSelected($next);
}

// Iniciar el carrusel automático
var intervalId = setInterval(autoMoveCarousel, 6000);

$('#carousel-per').mouseenter(function () {
    clearInterval(intervalId);
});

$('#carousel-per').mouseleave(function () {
    intervalId = setInterval(autoMoveCarousel, 6000);
});

$(document).keydown(function (e) {
    switch (e.which) {
        case 37:
            moveToSelected('prev');
            break;

        case 39:
            moveToSelected('next');
            break;

        default: return;
    }
    e.preventDefault();
});

$('#carousel-per div').click(function () {
    moveToSelected($(this));
});

$('#per-prev').click(function () {
    moveToSelected('prev');
});

$('#per-next').click(function () {
    moveToSelected('next');
});

function moveToIndex(index) {
    var $selected = $("#carousel-per div").eq(index);
    moveToSelected($selected);
}

$("#carousel-indicators .indicator-per").click(function() {
    var index = $(this).data("slide-to");
    moveToIndex(index);
});
