<?php
include 'conexao.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $conn->query("DELETE FROM estoque WHERE id = $id");
}

header("Location: estoque.php");
exit;
?>
