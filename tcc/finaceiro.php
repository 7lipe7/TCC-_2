<?php
include 'conexao.php';



// Recebe os dados do formulário
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tipo = $_POST['tipo'];
    $descricao = $_POST['descricao'];
    $valor = $_POST['valor'];

    // Prepara e executa a query para inserir o lançamento
    $sql = $conn->prepare("INSERT INTO financeiro (tipo, descricao, valor) VALUES (?, ?, ?)");
    $sql->bind_param("ssd", $tipo, $descricao, $valor);
    $sql->execute();
}

// Recupera os lançamentos e calcula totais
$sql = "SELECT * FROM financeiro";
$result = $conn->query($sql);

// Variáveis para totais
$totalEntradas = 0;
$totalSaidas = 0;
$totalLancamentos = 0;

$lancamentos = [];
while ($row = $result->fetch_assoc()) {
    $lancamentos[] = $row;
    if ($row['tipo'] == 'entrada') {
        $totalEntradas += $row['valor'];
    } else {
        $totalSaidas += $row['valor'];
    }
    $totalLancamentos++;
}

$saldoFinal = $totalEntradas - $totalSaidas;


// Passa os dados para o HTML
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Financeiro | Sistema de Gestão</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="assets/financeiro/style.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>

  <h1>Gestão Financeira</h1>

  <form action="salvar_financeiro.php" method="post">
    <div class="search-add">
      <div class="input-wrapper">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="Buscar lançamento...">
      </div>
      <button type="button" onclick="toggleFormLancamento()">
        <i class="fas fa-plus-circle"></i> Adicionar Lançamento
      </button>
    </div>

    <div class="form-add" id="formLancamento" style="display: none;">
      <div class="form-grid">
      <input type="date" name="data" placeholder="Data do Lançamento" required>
        <input type="text" name="descricao" placeholder="Descrição" required>
        <select name="tipo" required>
          <option value="">Selecione o Tipo</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <input type="number" name="valor" placeholder="Valor (ex: 99.90)" step="0.01" required>
      </div>
      <button type="submit" class="btn-salvar">Salvar Lançamento</button>
    </div>
  </form>

  <div class="resumo">
    <div class="resumo-card">
      <h2>Total de Entradas</h2>
      <div class="valor entrada" id="totalEntradas">R$ <?php echo number_format($totalEntradas, 2, ',', '.'); ?></div>
    </div>
    <div class="resumo-card">
      <h2>Total de Saídas</h2>
      <div class="valor saida" id="totalSaidas">R$ <?php echo number_format($totalSaidas, 2, ',', '.'); ?></div>
    </div>
    <div class="resumo-card">
      <h2>Saldo Final</h2>
      <div class="valor" id="saldoFinal">R$ <?php echo number_format($saldoFinal, 2, ',', '.'); ?></div>
    </div>
    <div class="resumo-card">
      <h2>Lançamentos Registrados</h2>
      <div class="valor" id="totalLancamentos"><?php echo $totalLancamentos; ?></div>
    </div>
  </div>

  <div class="tabela-wrapper">
    <table id="tabelaLancamento">
      <thead>
        <tr>
          <th>Data</th>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>Valor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <?php
        foreach ($lancamentos as $lancamento) {
            echo "<tr>";
            echo "<td>" . $lancamento['data'] . "</td>";
            echo "<td>" . $lancamento['descricao'] . "</td>";
            echo "<td>" . ucfirst($lancamento['tipo']) . "</td>";
            echo "<td>R$ " . number_format($lancamento['valor'], 2, ',', '.') . "</td>";
            echo "<td><button class='btn-editar'>Editar</button> <button class='btn-deletar'>Deletar</button></td>";
            echo "</tr>";
        }
        ?>
      </tbody>
    </table>
  </div>

  <a href="index.html" class="btn-voltar"><i class="fas fa-arrow-left"></i> Voltar</a>
  <script src="assets/financeiro/script.js"></script>
</body>
</html>
