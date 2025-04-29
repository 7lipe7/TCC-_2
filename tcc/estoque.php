<?php
include 'conexao.php';

// Altere a consulta SQL para usar o nome correto da coluna
$result = $conn->query("SELECT id, produto, quantidade, valor, estoque_minimo FROM estoque");
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Estoque | Sistema de Gestão</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <div class="container" data-aos="fade-up">
    <div class="sidebar">
      <h2>Meu Sistema</h2>
      <a href="dashboard.php"><i class="fas fa-chart-line"></i><span>Dashboard</span></a>
      <a href="estoque.php"><i class="fas fa-boxes"></i><span>Estoque</span></a>
      <a href="funcionario.php"><i class="fas fa-users"></i><span>Funcionários</span></a>
      <a href="finaceiro.html"><i class="fas fa-dollar-sign"></i><span>Financeiro</span></a>
      <a href="#"><i class="fas fa-chart-pie"></i><span>Relatórios</span></a>
    </div>

    <div class="main" data-aos="fade-up">
      <div class="topbar">
        <h1>Estoque</h1>
      </div>

      <div class="content">
        <table border="1" cellpadding="10" class="estoque-tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor</th>
              <th>Estoque Mínimo</th>
            </tr>
          </thead>
          <tbody>
            <?php while($row = $result->fetch_assoc()): ?>
              <tr>
                <td><?= $row['id'] ?></td>
                <td><?= $row['produto'] ?></td> <!-- Corrigido para o nome correto da coluna -->
                <td><?= $row['quantidade'] ?></td>
                <td>R$ <?= number_format($row['valor'], 2, ',', '.') ?></td>
                <td><?= $row['estoque_minimo'] ?></td>
              </tr>
            <?php endwhile; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>
    AOS.init();
  </script>
</body>
</html>
