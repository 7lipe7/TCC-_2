<?php
include 'conexao.php';

// Consultar dados para o dashboard
$vendas_query = "SELECT SUM(valor) AS total_vendas FROM vendas WHERE MONTH(data) = MONTH(CURRENT_DATE)";
$vendas_result = $conn->query($vendas_query);
$vendas_data = $vendas_result->fetch_assoc();
$vendas_mes = $vendas_data['total_vendas'] ?? 0;

$gastos_query = "SELECT SUM(valor) AS total_gastos FROM gastos WHERE MONTH(data) = MONTH(CURRENT_DATE)";
$gastos_result = $conn->query($gastos_query);
$gastos_data = $gastos_result->fetch_assoc();
$gastos_mes = $gastos_data['total_gastos'] ?? 0;

$produtos_query = "SELECT COUNT(*) AS produtos_baixa FROM estoque WHERE quantidade < estoque_minimo";
$produtos_result = $conn->query($produtos_query);
$produtos_data = $produtos_result->fetch_assoc();
$produtos_baixa = $produtos_data['produtos_baixa'] ?? 0;

$funcionarios_query = "SELECT COUNT(*) AS funcionarios_ativos FROM funcionarios WHERE status = 'Ativo'";
$funcionarios_result = $conn->query($funcionarios_query);
$funcionarios_data = $funcionarios_result->fetch_assoc();
$funcionarios_ativos = $funcionarios_data['funcionarios_ativos'] ?? 0;

$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard | Sistema de Gestão</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

  <div class="container" data-aos="zoom-in">
    <div class="sidebar">
      <h2>Meu Sistema</h2>
      <a href="dashboard.php"><i class="fas fa-chart-line"></i><span>Dashboard</span></a>
      <a href="estoque.php"><i class="fas fa-boxes"></i><span>Estoque</span></a>
      <a href="funcionario.php"><i class="fas fa-users"></i><span>Funcionários</span></a>
      <a href="finaceiro.php"><i class="fas fa-dollar-sign"></i><span>Financeiro</span></a>
      <a href="#"><i class="fas fa-chart-pie"></i><span>Relatórios</span></a>
    </div>

    <div class="main" data-aos="zoom-in">
      <div class="topbar">
        <h1>Visão Geral</h1>
        <button class="logout">Sair</button>
      </div>

      <div class="cards" data-aos="zoom-in">
        <div class="card">
          <h3><i class="fas fa-dollar-sign"></i> Vendas do Mês</h3>
          <p id="vendasMes">R$ <?= number_format($vendas_mes, 2, ',', '.') ?></p>
        </div>
        <div class="card">
          <h3><i class="fas fa-wallet"></i> Gastos do Mês</h3>
          <p id="gastosMes">R$ <?= number_format($gastos_mes, 2, ',', '.') ?></p>
        </div>
        <div class="card">
          <h3><i class="fas fa-box"></i> Produtos em Baixa</h3>
          <p id="produtos-em-baixa"><?= $produtos_baixa ?></p>
        </div>
        <div class="card">
          <h3><i class="fas fa-user-friends"></i> Funcionários Ativos</h3>
          <p id="funcionariosAtivos"><?= $funcionarios_ativos ?></p>
        </div>
      </div>
      
      <hr class="custom-divider"> 

      <div class="grafico-linha">
        <canvas id="graficoMensal"></canvas>
      </div>
    </div>
  </div>

  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>
    AOS.init();
  </script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="assets/script.js"></script>
</body>
</html>
