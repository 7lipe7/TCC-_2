<?php
include 'conexao.php';

// Verifica se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Captura os dados do formulário
    $produto = $conn->real_escape_string($_POST['produto']);
    $categoria = $conn->real_escape_string($_POST['categoria']);
    $unidade_de_medida = $conn->real_escape_string($_POST['unidade_de_medida']);
    $valor = str_replace(',', '.', $_POST['valor']);
    $fornecedor = $conn->real_escape_string($_POST['fornecedor']);
    $quantidade = (int)$_POST['quantidade'];
    $estoque_maximo = (int)$_POST['estoque_maximo'];
    $estoque_minimo = (int)$_POST['estoque_minimo'];
    $validade = $conn->real_escape_string($_POST['validade']);

    // Verifica se todos os campos estão preenchidos
    if (empty($produto) || empty($categoria) || empty($unidade_de_medida) || empty($valor) || empty($fornecedor) || empty($quantidade) || empty($estoque_maximo) || empty($estoque_minimo) || empty($validade)) {
        echo "Por favor, preencha todos os campos!";
        exit;
    }

    // Cria a query SQL para inserir o produto no banco de dados usando prepared statement
    $sql = "INSERT INTO estoque (produto, categoria, unidade_de_medida, valor, fornecedor, quantidade, estoque_maximo, estoque_minimo, validade)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Prepara a consulta
    $stmt = $conn->prepare($sql);
    
    // Verifica se a preparação da consulta foi bem-sucedida
    if ($stmt === false) {
        echo "Erro ao preparar a consulta: " . $conn->error;
        exit;
    }

    // Vincula os parâmetros da consulta
    $stmt->bind_param("ssssiiiss", $produto, $categoria, $unidade_de_medida, $valor, $fornecedor, $quantidade, $estoque_maximo, $estoque_minimo, $validade);

    // Executa a consulta
    if ($stmt->execute()) {
        // Redireciona para a página de estoque após o cadastro
        header("Location: estoque.php");
        exit;
    } else {
        echo "Erro: " . $stmt->error;
    }

    // Fecha a consulta
    $stmt->close();
}
?>
