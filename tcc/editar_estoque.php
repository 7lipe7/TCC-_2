<?php
include 'conexao.php';

// Verifica se o ID foi enviado via GET
if (!isset($_GET['id'])) {
    echo "ID do produto não fornecido.";
    exit;
}

$id = intval($_GET['id']);

// Se o formulário foi enviado via POST, atualiza o produto
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $produto = $conn->real_escape_string($_POST['produto']);
    $categoria = $conn->real_escape_string($_POST['categoria']);
    $unidade_de_medida = $conn->real_escape_string($_POST['unidade_de_medida']);
    $valor = str_replace(',', '.', $_POST['valor']);
    $fornecedor = $conn->real_escape_string($_POST['fornecedor']);
    $quantidade = (int)$_POST['quantidade'];
    $estoque_maximo = (int)$_POST['estoque_maximo'];
    $estoque_minimo = (int)$_POST['estoque_minimo'];
    $validade = $conn->real_escape_string($_POST['validade']);

    $sql = "UPDATE estoque SET 
                produto='$produto', categoria='$categoria', unidade_de_medida='$unidade_de_medida',
                valor=$valor, fornecedor='$fornecedor', quantidade=$quantidade,
                estoque_maximo=$estoque_maximo, estoque_minimo=$estoque_minimo,
                validade='$validade'
            WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        header("Location: estoque.php");
        exit;
    } else {
        echo "Erro ao atualizar: " . $conn->error;
    }
}

// Busca os dados do produto atual
$sql = "SELECT * FROM estoque WHERE id=$id";
$result = $conn->query($sql);

if ($result->num_rows != 1) {
    echo "Produto não encontrado!";
    exit;
}

$produto = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Editar Produto</title>
  <link rel="stylesheet" href="assets/estoque/style.css">
</head>
<body>
  <h1>Editar Produto</h1>

  <form action="editar_estoque.php?id=<?= $id ?>" method="POST" class="form-edit">
    <div class="form-grid">
      <input type="text" name="produto" value="<?= $produto['produto'] ?>" required>
      <input type="text" name="categoria" value="<?= $produto['categoria'] ?>" required>
      <input type="text" name="unidade_de_medida" value="<?= $produto['unidade_de_medida'] ?>" required>
      <input type="number" name="valor" step="0.01" value="<?= $produto['valor'] ?>" required>
      <input type="text" name="fornecedor" value="<?= $produto['fornecedor'] ?>" required>
      <input type="number" name="quantidade" value="<?= $produto['quantidade'] ?>" required>
      <input type="number" name="estoque_maximo" value="<?= $produto['estoque_maximo'] ?>" required>
      <input type="number" name="estoque_minimo" value="<?= $produto['estoque_minimo'] ?>" required>
      <input type="date" name="validade" value="<?= $produto['validade'] ?>" required>
    </div>
    <button type="submit">Atualizar Produto</button>
    <a href="estoque.php" class="btn-voltar">Cancelar</a>
  </form>
</body>
</html>
