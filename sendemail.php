<?php
$to      = 'contato@mbeck.com.br';
$subject = 'Contato de ' . $_POST['name'];
$message = $_POST['message'];
$headers = 'From: ' . $_POST['name'] . '<' . $_POST['email'] . '>' . "\r\n" .
    	   'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);
?> 