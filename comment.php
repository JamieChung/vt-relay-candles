<html>
<body>

<?php
	$comment = (string)$_POST['comment'];
    $to      = 'supererik098@yahoo.com';
    $subject = 'Relay Site Issue From User';
    $message = 'Issue from user: ' . "\n\n" . $comment;
    $headers = 'From: RelayIssue@R4L.com' . "\r\n" .
        'Reply-To: RelayIssue@R4L.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);

    echo 'Email Sent.';
?>

</body>
</html> 