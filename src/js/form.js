$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();

        let form = $(this);
        let isValid = true;


        // Валидация номера телефона для Беларуси
        let phoneInput = form.find('input[name="phone"]');
        let phoneValue = phoneInput.val().replace(/\D/g, ''); // Убираем все нецифровые символы

        // Проверка, что номер телефона начинается с кода Беларуси (+375) и имеет длину 12 символов
        if (!/^(\+375)[0-9]{9}$/.test(phoneValue)) {
            alert('Пожалуйста, введите корректный номер телефона Беларуси.');
            isValid = false;
        }


        // Валидация текста сообщения на минимальное количество символов
        let messageInput = form.find('textarea[name="message"]');
        let messageValue = messageInput.val();

        if (messageValue.length < 20) {
            alert('Сообщение должно содержать не менее 20 символов.');
            isValid = false;
        }

        let submitButton = form.find('button[type="submit"]');
        submitButton.prop('disabled', !isValid);

        if (isValid) {
            let form_data = jQuery(this).serialize(); // Собираем данные из полей
            if (event.target.classList.contains('callback-form')) {
                // Событие отправки с формы
                $.ajax({
                    type: "POST", // Метод отправки
                    url: "sendform.php", // Путь к PHP обработчику sendform.php
                    data: form_data,
                    success: swal({
                        title: "Спасибо за заявку!",
                        type: "success",
                        showConfirmButton: false,
                        timer: 2000
                    })
                });
            } else {
                // Событие отправки с формы
                $.ajax({
                    type: "POST", // Метод отправки
                    url: "sendform.php", // Путь к PHP обработчику sendform.php
                    data: form_data,
                    success: swal({
                        title: "Ваше сообщение отправлено!",
                        type: "success",
                        showConfirmButton: false,
                        timer: 2000
                    })
                });
            }
            event.target.reset();
        }


    });
});