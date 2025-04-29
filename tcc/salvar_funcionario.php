<?php
include("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST["nome"]);
    $cpf = trim($_POST["cpf"]);
    $funcao = trim($_POST["funcao"]);
    $telefone = trim($_POST["telefone"]);
    $email = trim($_POST["email"]);
    $salario = floatval($_POST["salario"]);
    $data = $_POST["data"];
    $estado = trim($_POST["estado"]);

    // Validações
    if (strlen($cpf) != 11 || !is_numeric($cpf)) {
        die("CPF inválido.");
    }
    if ($salario <= 0) {
        die("Salário deve ser maior que 0.");
    }

    $sql = "INSERT INTO funcionarios (nome, cpf, funcao, telefone, email, salario, data_admissao, estado)
            VALUES ('$nome', '$cpf', '$funcao', '$telefone', '$email', $salario, '$data', '$estado')";
    if ($conn->query($sql) === TRUE) {
        header("Location: funcionario.php");
        exit();
    } else {
        echo "Erro ao salvar: " . $conn->error;
    }
}
?>
