<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");


error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'connect.php';

$sql = "SELECT * FROM jokes ORDER BY RAND() LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $response = array(
            "question" => $row["question"],
            "joke" => $row["joke"],
            "explanation" => $row["explanation"]
        );
        echo json_encode($response);
        // echo $row["question"]. "<br><br>" . $row["joke"]. "<br>";
    }
} else {
    echo json_encode(array("error" => "No results"));
}

$conn->close();
?>