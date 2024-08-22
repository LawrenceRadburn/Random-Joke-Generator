<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../connect.php';

header('Content-Type: application/json');

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 1; // Only one joke per page
$offset = ($page - 1) * $limit;

$stmt = $pdo->prepare("SELECT * FROM jokes LIMIT :limit OFFSET :offset");
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();

$jokes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['jokes' => $jokes]);
?>