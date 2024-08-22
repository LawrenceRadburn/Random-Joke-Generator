<?php 
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "jokes_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// $host = "localhost";
// $dbname = "jokes_db";
// $username = "root";
// $password = "password";

// try {
//     $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
//     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// }   catch (PDOException $e) {
//     echo 'Connection failed: ' . $e->getMessage();
// }
?>