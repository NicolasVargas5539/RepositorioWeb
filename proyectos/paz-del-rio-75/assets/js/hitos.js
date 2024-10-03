let autoSwap = setInterval(swap, 5000);

//pausar la presentación de diapositivas y volver a crear una instancia fuera del mouse
$('.hitos_carousel, .hitos_buttom').hover(
    function () {
        clearInterval(autoSwap);
    },
    function () {
        autoSwap = setInterval(swap, 5000);
    });

//global variables
let items = [];
let startItem = 1;
let position = 0;
let itemCount = $('.hitos_carousel li.items').length;
let leftpos = itemCount;
let resetCount = itemCount;

//unused: reunir texto dentro de la clase de elementos
$('li.items').each(function (index) {
    items[index] = $(this).text();
});

//swap images function
function swap(action) {
    let direction = action;

    //moviendo el carrusel hacia atras
    if (direction == 'counter-clockwise') {
        let leftitem = $('.left-pos').attr('id') - 1;
        if (leftitem == 0) {
            leftitem = itemCount;
        }

        $('.right-pos-2').removeClass('right-pos-2').addClass('back-pos');
        $('.right-pos').removeClass('right-pos').addClass('right-pos-2');
        $('.main-pos').removeClass('main-pos').addClass('right-pos');
        $('.left-pos').removeClass('left-pos').addClass('main-pos');
        $('#' + leftitem + '').removeClass('back-pos').addClass('left-pos');

        // $().removeClass('textos-back').addClass('textos');

        startItem--;
        if (startItem < 1) {
            startItem = itemCount;
        }
    }

    if (direction == 'clockwise' || direction == '' || direction == null) {
        function pos(positionvalue) {
            if (positionvalue != 'leftposition') {
                position++;

                if ((startItem + position) > resetCount) {
                    position = 1 - startItem;
                }
            }

            if (positionvalue == 'leftposition') {
                position = startItem - 1;

                if (position < 1) {
                    position = itemCount;
                }
            }
            return position;
        }

        $('#' + startItem + '').removeClass('main-pos').addClass('left-pos');
        $('#' + (startItem + pos()) + '').removeClass('right-pos').addClass('main-pos');
        $('#' + (startItem + pos()) + '').removeClass('right-pos-2').addClass('right-pos');
        $('#' + (startItem + pos()) + '').removeClass('back-pos').addClass('right-pos-2');
        $('#' + pos('leftposition') + '').removeClass('left-pos').addClass('back-pos');



        startItem++;
        position = 0;
        if (startItem > itemCount) {
            startItem = 1;
        }
    }
    $('.indicator-hitos').removeClass('active');

    $('[data-section="' + startItem + '"]').addClass('active');
}

//next button click function
$('#next').click(function () {
    swap('clockwise');
});

//prev button click function
$('#prev').click(function () {
    swap('counter-clockwise');
});

//if any visible items are clicked
$('li').click(function () {
    if ($(this).attr('class') == 'items left-pos') {
        swap('counter-clockwise');
    }
    else {
        swap('clockwise');
    }
});

// Manejar el clic en un indicador
$('.indicator-hitos').click(function () {
   var targetSection = $(this).data('section');

   var direction = targetSection > startItem ? 'clockwise' : 'counter-clockwise';

    while (startItem != targetSection) {
        swap(direction);
    }

    $('.indicator-hitos').removeClass('active');
    $(this).addClass('active');
});

