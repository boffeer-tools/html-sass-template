<?php

	// configs

    $formname = strip_tags($_POST['formname']);
    $formname = htmlentities($_POST['formname'], ENT_QUOTES, "UTF-8");
    $formname = htmlspecialchars($_POST['formname'], ENT_QUOTES);

    $name = strip_tags($_POST['user_name']);
    $name = htmlentities($_POST['user_name'], ENT_QUOTES, "UTF-8");
    $name = htmlspecialchars($_POST['user_name'], ENT_QUOTES);

    $tel = strip_tags($_POST['user_tel']);
    $tel = htmlentities($_POST['user_tel'], ENT_QUOTES, "UTF-8");
    $tel = htmlspecialchars($_POST['user_tel'], ENT_QUOTES);

    $actual_link = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];


    $message_body = "<a href=\"$actual_link\">$actual_link</a><br/><br/>
    Форма: $formname<br/><br/>
    Имя: $name<br/><br/>
    Телефон: $tel<br/><br/>";


	$email_to = '';
	$email_from = '';
	$email_subject = "Заявка на бесплатный замер";

    $msg_box = ""; 
    $errors = array(); 

    // если форма без ошибок
    if(empty($errors)){     
        // собираем данные из формы
        $message = "Имя: " . $_POST['user_name'] . "<br/> Телефон: " . $_POST['user_tel'];
        send_mail($message, $email_to, $email_subject, $email_from); // отправим письмо
    }

    // функция отправки письма
    function send_mail($message, $email_to, $email_subject, $email_from){

		
        // почта, на которую придет письмо
        $mail_to = $email_to; 

        // тема письма
        $subject = $email_subject;

        // заголовок письма
        $headers= "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
        $headers .= "From: <". $email_from .">\r\n"; // от кого письмо

        // отправляем письмо 
        mail($mail_to, $subject, $message, $headers);
    }
?>




<?php

//В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "";

//Сюда вставляем chat_id
$chat_id = "";

//Определяем переменные для передачи данных из нашей формы
// if ($_POST['act'] == 'order') {
    $name = ($_POST['user_name']);
    $phone = ($_POST['user_tel']);
// }

//Собираем в массив то, что будет передаваться боту
    $arr = array(
        'Имя:' => $name,
        'Телефон:' => $phone
    );

//Настраиваем внешний вид сообщения в телеграме
    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

//Передаем данные боту
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>

<?php


// формируем запись в таблицу google (изменить)
$url = "https://docs.google.com/forms/d/ссылка_на_твой_опросник/formResponse";

// массив данных (изменить entry, draft и fbzx)
$post_data = array (
	"entry.286082292" => $_POST['user_name'],
	"entry.1033324795" => $_POST['user_tel'],
	"draftResponse" => "[,,&quot;2360450121179784330&quot;]",
	"pageHistory" => "0",
	"fbzx" => "-2360450121179784330"
);

// Далее не трогать
// с помощью CURL заносим данные в таблицу google
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// указываем, что у нас POST запрос
curl_setopt($ch, CURLOPT_POST, 1);
// добавляем переменные
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
//заполняем таблицу google
$output = curl_exec($ch);
curl_close($ch);

?>