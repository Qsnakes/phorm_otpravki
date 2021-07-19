<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    //От кого письмо
    $mail->setForm('nikus1922@icloud.com', 'Никита Андреевич');
    // Кому отправить
    $mail->addAddress('nikus1922@icloud.com');
    //Тема письма
    $mail->Subject = 'Неужели ты смог, спасибо папаша';

    //Рука
    $hand = 'Правая';
    if($_POST['hand'] == 'left') {
        $hand = 'Левая';
    }

    //
?>
