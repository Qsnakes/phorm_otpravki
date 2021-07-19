"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        const error = formValidate(form);
        //Строка 12 вытягивает данные с полей, а 13 подтягивает img
        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);
        //Тут ебейшая магия отправки с помощью Ajax(fetch)
        if (error === 0) {
            //Сказать пользователю что идет отправка данных
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok){
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            }else {
                alert('Что-то пошло не так');
                form.classList.remove('_sending');
            }



        } else{
            alert('Заполните обязательные поля');
        }

    }


    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === 'checkbox' && !input.checked) {
                formAddError(input)
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    //Функция проверки E-mail
    function emailTest(input) {
        const re = /^\w+([\.-]?\w+)*@(\w+[\.-]?\w+)*(\.\w{2,8})+$/
        return !re.test(input.value);
    }


    // Получаем input file в переменную
    const formImage = document.getElementById('formImage');
    // Получаем див в превью в переменную
    const formPreview = document.getElementById('formPreview');

    //Слушаем изменения в input file 
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        //Проверяем тип файла
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Разрешены только изображения.');
            formImage.value = '';
            return;
        }

        //Проверка размера файла
        if (file.size >2 * 1024 * 1024) {
            alert('Файл должен быть не более 2 МБ.');
            return;
        }


        //Функция вывода после валидации файлов
        //На 93 строке можно регулировать width: Вставляемого img
        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото" style="width: 150px">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }   
});
