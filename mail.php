<html>
<body>

<?php
    $to      = 'supererik098@yahoo.com';
    $subject = 'Expulsion';
    $message = 'you have been expelled from Virginia Tech';
    $headers = 'From: vtmoo@vtmoo.com' . "\r\n" .
        'Reply-To: vtmoo@vtmoo.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);

    echo 'Email Sent.';
?>

</body>
</html> 