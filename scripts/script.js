window.onload = function () {
    new WOW().init();
    $('.assortiment-cars').slick({
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next'),
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                }
            }
        ],
    });

    $('.feedback-elements').slick({
        prevArrow: $('.slick-feed-prev'),
        nextArrow: $('.slick-feed-next'),
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 611,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        // autoplay: true,
        // autoplaySpeed: 3000,
        initialSlide: 3,
        dots: true,
        appendDots: $('.slick-dots')
    });

//-----Селекты!--------------------------------------
    const inputSelectCar = $('#input-select-car')
    const selBoxCarLabel = inputSelectCar.find('.select-label'); //Список машин в selectbox
    const orderPlace = $('#input-select-location');
    const orderCarDefText = inputSelectCar.children().eq(0).text();
    const selectBoxDefColor = inputSelectCar.children().eq(0).css('color');
    const orderPlaceDefText = orderPlace.children().eq(0).text();

    addClick(inputSelectCar);
    addClick(orderPlace);

    function addClick(element) {
        const selectBox_title = element.find('.input-select-title');
        const selectBox_labels = element.find('.select-label');
        selectBox_title.on("click", function () {
            element.parent().removeClass('error-info');
            if ('active' === element.attr('data-state')) {
                element.attr('data-state', '');
                selectBox_title.css('border-color', '#464646').css('border-bottom', 'solid 1px #464646'); //Границы при открытии
            } else {
                element.attr('data-state', 'active');
                selectBox_title.css('border-color', '#777575').css('border-bottom', 'none');//Границы при закрытии
            }
        });
        selectBox_labels.click((evt) => { //закрытие списка при выборе
            selectBox_title.text(evt.target.textContent);
            selectBox_title.css('border-color', '#464646').css('border-bottom', 'solid 1px #464646').css('color', 'rgb(248, 229, 165)');//Границы при закрытии
            element.attr('data-state', '');
        });
    }

//-----------------------------------------------------
    const body = $('body');
    const loader = $('#loader');
    const btnCall = $('#btnCall');
    const btnOrder = $('#btnOrder');
    const orderCallWindow = $('.order-call-modal');
    const orderCarWindow = $('.order-car-modal');
    const callCloseBtn = $('#call-close-btn');
    const orderCloseBtn = $('#order-close-btn');
    const menuCloseBtn = $('#menu-close-btn');
    const menuShowBtn = $('#burder-button');


    //Главное меню
    menuShowBtn.click(() => {
        $('#header-menu').addClass('menu-opened');
        body.addClass('fixed');
    });
    menuCloseBtn.click(() => {
        closeMainMenu();
    });
    $(document).on("click", "nav a", function (e) {
        e.preventDefault();
        closeMainMenu();
        let id = $(this).attr('href');
        let top = $(id).offset().top; // получаем координаты блока
        $('body, html').animate({scrollTop: top}, 800); // плавно переходим к блоку
    });
    $(document).on("click", "#topUp", function (e) {
        e.preventDefault();
        $('body, html').animate({scrollTop: 0}, 800);
    });

    function closeMainMenu() {
        $('#header-menu').removeClass('menu-opened');
        body.removeClass('fixed');
    } // Функция закрытия главного меню

    function showLoader() {
        loader.css('display', 'flex');
        body.addClass('fixed');
    } //Отображение лоадера
    function closeLoader() {
        loader.css('display', 'none');
        body.removeClass('fixed');
    } //Закрытие лоадера

//Работа с окнами и кнопками
    btnCall.click(() => {
        orderCallWindow.css('display', 'grid');
        body.addClass('fixed');
    });
    btnOrder.click(() => {
        openOrderForm();
    });

    function openOrderForm(carIndex = 0) {
        orderCarWindow.css('display', 'grid');
        body.addClass('fixed');
        if (carIndex > 0) {
            selBoxCarLabel.eq(carIndex).click();
        }
    } //Функция открытия окна заказа машины
    $('.rent-car-btn').click((event) => {
        openOrderForm($(event.target).parent().parent().index());
    }); //Заказ определенной машины через карточку
    $('.modal-window').click((event) => {
        let Sender = $(event.target);
        if (Sender.hasClass('order-call-modal')) {
            closeCallForm();
        }
        if (Sender.hasClass('order-car-modal')) {
            closeOrderForm();
        }
    }); //Закрытие форм
    callCloseBtn.click(() => {
        closeCallForm();
    }); //Закрытие формы обратного звонка кнопкой
    orderCloseBtn.click(() => {
        closeOrderForm();
    });//Закрытие формы заказа кнопкой

    //Маска ввода телефона
    $('[name=client-phone]').keydown((event) => {
        let dop4tel = $(event.target);
        if (isNaN(parseInt(event.key)) && !(event.key === 'Backspace') && !(event.key === 'Delete')) {
            return false;
        }
        if ((dop4tel.val().length === 18) && !(event.key === 'Backspace') && !(event.key === 'Delete')) {
            return false;
        }
        if (!(event.key === 'Backspace') && !(event.key === 'Delete')) {
            if (dop4tel.val().length === 2) {
                dop4tel.val(dop4tel.val() + ' (');
            } else if (dop4tel.val().length === 3) {
                dop4tel.val(dop4tel.val() + '(');
            } else if (dop4tel.val().length === 7) {
                dop4tel.val(dop4tel.val() + ') ');
            } else if (dop4tel.val().length === 8) {
                dop4tel.val(dop4tel.val(dop4tel.val() + ' '));
            } else if (dop4tel.val().length === 12 || dop4tel.val().length === 15) {
                dop4tel.val(dop4tel.val() + '-');
            }
        }
    })

    function closeCallForm() {
        orderCallWindow.css('display', 'none');
        body.removeClass('fixed');
        if (callForm.css('display') === 'none') {
            callSuccessText.hide();
            callForm.css('display', 'flex');
            callForm.trigger('reset');
        }
    } //Функция закрытие формы заказа звонка
    function closeOrderForm() {
        orderCarWindow.css('display', 'none');
        body.removeClass('fixed');
        if (orderForm.css('display') === 'none') {
            orderSuccessText.hide();
            orderForm.css('display', 'flex');
            orderForm.trigger('reset');
            inputSelectCar.children().eq(0).text(orderCarDefText);
            inputSelectCar.children().eq(0).css('color', selectBoxDefColor);
            orderPlace.children().eq(0).text(orderPlaceDefText);
            orderPlace.children().eq(0).css('color', selectBoxDefColor);
        }
    } //Функция закрытие формы заказа машины
//Обработка форм
    const url = 'https://testologia.site/checkout';
    const callForm = $('#callForm');
    const orderForm = $('#orderForm');
    const callSuccessText = $('#callSuccessText');
    const orderSuccessText = $('#orderSuccessText');
    const orderDetails = $('#orderDetails');

    let clientNameCall = $('#callClientName');
    let clientPhoneCall = $('#callClientPhone');

    function makeError(elem) {
        if (elem.hasClass('input-select')) {
            elem.parent().addClass('error-info');
        } else {
            elem.parent().parent().addClass('error-info');
        }
    }

    function clearError(elem) {
        if (elem.hasClass('input-select')) {
            elem.parent().removeClass('error-info');
        } else {
            elem.parent().parent().removeClass('error-info');
        }

    }

//Обработка заказа звонка
    function validRecallForm() {
        let errorHas = false;
        if (clientNameCall.val().length < 2) {
            errorHas = true;
            makeError(clientNameCall);
        } else {
            clearError(clientNameCall);
        }
        if (clientPhoneCall.val().length < 2) {
            errorHas = true;
            makeError(clientPhoneCall);
        } else {
            clearError(clientPhoneCall);
        }
        return errorHas;
    }

    $('#recall-button').click(() => {
        if (validRecallForm() === true) {
            return;
        }
        showLoader();
        $.ajax({
            method: "post",
            url: url,
            data: {name: clientNameCall.val(), phone: clientPhoneCall.val()}
        })
            .done(function (message) {
                closeLoader();
                if (message && message.hasOwnProperty('success')) {
                    if (message.success === 1) {
                        callForm.hide();
                        callSuccessText.css('display', 'flex');
                    } else if (message.success === 0) {
                        alert('Извините, Вы внесены в черный список клиентов!')
                    } else {
                        alert('Ошибка. Непредвиденный ответ от сервера. Повторите пожалуйста попытку.');
                    }
                } else {
                    alert('Произошла ошибка на сервере. Повторите запрос позже');
                }
            });
    });

//Обработка заказа машины
    let orderCar = inputSelectCar; //так удобнее работать
    let orderStartDate = $('#orderStartDate');
    let orderEndDate = $('#orderEndDate');
    //orderPlace объявлен ранее
    let orderClientName = $('#orderClientName');
    let orderClientPhone = $('#orderClientPhone');
    let orderClientEMail = $('#orderClientEMail');
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }

    function validOrderForm() {
        let errorHas = false;
        if (orderCar.find('input:checked').length === 1) { //Выбор машины
            clearError(orderCar);
        } else {//Если не найден выбранный элемент
            errorHas = true;
            makeError(orderCar);
        }
        if (orderPlace.find('input:checked').length === 1) { //Выбор места
            clearError(orderPlace);
        } else {//Если не найден выбранный элемент
            errorHas = true;
            makeError(orderPlace);
        }
        if (orderStartDate.val().length === 10) { //Дата начала
            clearError(orderStartDate);
        } else {
            errorHas = true;
            makeError(orderStartDate);
        }
        if (orderEndDate.val().length === 10) { //Дата окончания
            clearError(orderEndDate);
        } else {
            errorHas = true;
            makeError(orderEndDate);
        }
        if (orderClientName.val().length < 2) { //Имя клиента
            errorHas = true;
            makeError(orderClientName);
        } else {
            clearError(orderClientName);
        }
        if (orderClientPhone.val().length === 18) { //Телефон клиента
            clearError(orderClientPhone);
        } else {
            errorHas = true;
            makeError(orderClientPhone);
        }
        if (orderClientEMail.val().length < 5) { //Почта
            errorHas = true;
            makeError(orderClientEMail);
        } else {
            if (isEmailValid(orderClientEMail.val())) {
                clearError(orderClientEMail);
            } else {
                errorHas = true;
                makeError(orderClientEMail);
            }
        }

        return errorHas;
    }

    function validDates() {
        let currentDate = new Date();
        let err = false;
        let errMSG = '';
        currentDate = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
        if (orderStartDate.val() < currentDate) {
            makeError(orderStartDate);
            err = true;
            errMSG = 'Начальная дата не должна быть меньше текущей.';
        }
        if (orderStartDate.val() > orderEndDate.val()) {
            makeError(orderEndDate);
            err = true;
            if (errMSG.length > 0) {
                errMSG += ' Начальная дата не должна быть больше конечной.';
            } else {
                errMSG = 'Начальная дата не должна быть больше конечной.';
            }
        }
        if (err) {
            alert(errMSG);
            return true;
        }
    }

    $('#order-button').click(() => {
        if (validOrderForm() === true) {
            return;
        }
        if (validDates() === true) {
            return;
        }

        showLoader();
        $.ajax({
            method: "post",
            url: url,
            data: {
                car: orderCar.children().eq(0).text(),
                startDate: orderStartDate.val(),
                endDate: orderEndDate.val(),
                place: orderPlace.children().eq(0).text(),
                name: orderClientName.val(),
                phone: orderClientPhone.val(),
                EMail: orderClientEMail.val(),
                msg: $('#orderMessage').val()
            }
        })
            .done(function (message) { //результат запроса в переменную message уже пропарсеный
                closeLoader();
                if (message && message.hasOwnProperty('success')) {
                    if (message.success === 1) {
                        orderForm.hide();
                        orderDetails.hide();
                        orderSuccessText.css('display', 'flex');
                    } else if (message.success === 0) {
                        alert('Извините, Вы внесены в черный список клиентов!')
                    } else {
                        alert('Ошибка. Непредвиденный ответ от сервера. Повторите пожалуйста попытку.');
                    }

                } else {
                    alert('Произошла ошибка на сервере. Повторите запрос позже');
                }
            });
    })
//Работа с кнопкой попап
    const topUp = $('#topUp');
    const footer = document.getElementById('footer');
    const maxBottom = document.querySelector('.footer-container').getBoundingClientRect();
    let currPos = '123px';
    let footerHeight = footer.offsetHeight;
    let docHeight = document.documentElement.scrollHeight;
    let screenHeight = document.documentElement.clientHeight;
    let currentScroll = window.scrollY;
    let stopCoords = 'px';
    const windowScroller = $(window);

    // $(window).resize(() => {})
    function topUpFixer() {
        footerHeight = footer.offsetHeight;
        docHeight = document.documentElement.scrollHeight;
        screenHeight = document.documentElement.clientHeight;
        currentScroll = window.scrollY;
        if (document.documentElement.clientWidth > 610) {
            window.removeEventListener('scroll', topUpFixer);
        }
        if ((footerHeight + screenHeight + currentScroll) > docHeight+50) {
            stopCoords = +(footerHeight + screenHeight + currentScroll - docHeight - 50) + 'px';
            topUp.css('bottom', stopCoords);
        } else {
            topUp.css('bottom', '20px');
        }
    }

    if (document.documentElement.clientWidth <= 610) {
        window.addEventListener('scroll', topUpFixer);
    }
    window.onresize = () => {
        if (document.documentElement.clientWidth <= 610) {
            window.addEventListener('scroll', topUpFixer);
        }
    }
}
