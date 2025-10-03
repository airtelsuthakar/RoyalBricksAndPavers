<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
	$phone = htmlspecialchars($_POST['phone']);
        $message = htmlspecialchars($_POST['message']);

        $to = 'kapoor.rk.airvaoice@gmail.com';
        $subject = "New Contact Form Submission from " . $name;
        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
	$headers .= 'Cc: mailtohabib@gmail.com' . "\r\n";
	$headers .= 'Bcc: airtelsuthakar@gmail.com' . "\r\n";
        $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

        $email_content = "<h2>Contact Form Submission</h2>";
        $email_content .= "<p><strong>Name:</strong> " . $name . "</p>";
        $email_content .= "<p><strong>Email:</strong> " . $email . "</p>";
	$email_content .= "<p><strong>Mobile:</strong> " . $phone . "</p>";
        $email_content .= "<p><strong>Message:</strong> " . $message . "</p>";

        if (mail($to, $subject, $email_content, $headers)) {
            echo "Email sent successfully!";
        } else {
            echo "Failed to send email.";
        }
    }
?>