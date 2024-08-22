<?php

include 'connect.php';

// Get the joke ID from the query parameter
$joke_id = isset($_GET['id']) ? intval($_GET['id']) :0;

// Fetch the joke from the database
$stmt = $pdo->prepare("Select * FROM jokes WHERE id = :id");
$stmt->execute(['id' => $joke_id]);
$joke = $stmt-> fetch();

if (!$joke) {
    echo "Joke not found.";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($joke['question']); ?></title>
</head>
<body>
    <h1><?php echo htmlspecialchars($joke['question']); ?></h1>
    <p><?php echo htmlspecialchars($joke['joke']); ?></p>
    <p><em><?php echo htmlspecialchars($joke['explanation']); ?></em></p>
</body>
</html>