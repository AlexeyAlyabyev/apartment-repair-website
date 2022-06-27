<?php

if(isset($_POST['submit'])){
	$to = "admin@rumexpert.ru";
	$from = "info@rumexpert.ru";

	$subject = "Zayavka rumexpert";//Фиксированная тема письма
	$utm_source = trim($_POST["utm_source"]);
	$utm_medium = trim($_POST["utm_medium"]);
	$utm_campaign = trim($_POST["utm_campaign"]);
	$utm_term = trim($_POST["utm_term"]);
	$utm_content = trim($_POST["utm_content"]);

	$mail_to_myemail = "
	Имя: ".$_POST['name']."
	Телефон: ".$_POST['phone']."
	Цель обращения: ".$_POST['goal']."
	Страница: ".$_POST['page']."
	Комментарий: ".$_POST['comment']."
	Предпочитаемый способ связи: ".$_POST['call_type']."
	
	Фактура из калькулятора: ".$_POST['facture']."
	Производитель: ".$_POST['manufacturer']."
	Площадь из калькулятора: ".$_POST['square']."
	Углы из калькулятора: ".$_POST['angles']."
	Светильники из калькулятора: ".$_POST['fixtures']."
	Люстры из калькулятора: ".$_POST['chandeliers']."
	Сумма из калькулятора: ".$_POST['summa']."

	utm_source: ".$utm_source."
	utm_medium: ".$utm_medium."
	utm_campaign: ".$utm_campaign."
	utm_term: ".$utm_term."
	utm_content: ".$utm_content."
	rumexpert.ru";

	$headers = "From: $from \r\n";

	/* Отправка сообщения, с помощью функции mail() */
	if(mail($to, $subject, $mail_to_myemail, $headers . 'Content-type: text/plain; charset=utf-8')){
		header('Location: thank-you.html');
	}else{
		echo "Возникла ошибка. " . $first_name . ", попробуйте перейти на главную и повторить попытку.";
	echo "<br /><br /><a href='https://rumexpert.ru'>Вернуться на сайт.</a>";
	}
}
?>
