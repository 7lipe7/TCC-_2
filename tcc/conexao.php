<?php
$servername = "localhost";
$username = "root";  // ou o nome de usuário do seu banco de dados
$password = "";  // ou a senha do seu banco de dados
$dbname = "tcc_site";  // nome do seu banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
