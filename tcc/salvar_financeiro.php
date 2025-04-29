<?php
include 'conexao.php';

// Captura os dados do formulário
$tipo = $conn->real_escape_string($_POST['tipo']);
$descricao = $conn->real_escape_string($_POST['descricao']);
$valor = str_replace(',', '.', $_POST['valor']);
$data = $conn->real_escape_string($_POST['data']);  // Sanitização da data

// Verifica se o valor de data está correto
// Remover após testar
// echo "Data: " . $data;

// Inserir os dados na tabela 'financeiro'
$sql = "INSERT INTO financeiro (tipo, descricao, valor, data) VALUES ('$tipo', '$descricao', $valor, '$data')";
if ($conn->query($sql) === TRUE) {
    // Redireciona para a página 'finaceiro.php' após a inserção bem-sucedida
    header("Location: finaceiro.php");
} else {
    // Exibe erro em caso de falha
    echo "Erro: " . $sql . "<br>" . $conn->error;
}
?>
