<?php include("conexao.php"); ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Funcionários | Sistema de Gestão</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="assets/funcionario/style.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
  <h1>Gestão de Funcionários</h1>

  <div class="search-add">
    <div class="input-wrapper">
      <i class="fa fa-search"></i>
      <input type="text" placeholder="Buscar funcionário...">
    </div>
    <button type="button" onclick="toggleForm()"><i class="fas fa-user-plus"></i> Adicionar Funcionário</button>
  </div>

  <!-- FORMULÁRIO DE CADASTRO -->
  <form action="salvar_funcionario.php" method="post" onsubmit="event.preventDefault(); salvarFuncionario();">
    <div class="form-add" id="formAdd" style="display: none;">
      <div class="form-grid">
        
        <input type="text" id="nome" name="nome" placeholder="Nome do funcionário" required>
        <input type="text" id="cpf" name="cpf" placeholder="CPF" maxlength="11" oninput="this.value = this.value.replace(/[^0-9]/g, '')" required>
        <input type="text" id="funcao" name="funcao" placeholder="Função" required>
        <input type="text" id="telefone" name="telefone" placeholder="Telefone (apenas números)" maxlength="11" oninput="this.value = this.value.replace(/[^0-9]/g, '')" required>
        <input type="email" id="email" name="email" placeholder="E-mail" required>
        <input type="number" id="salario" name="salario" placeholder="Salário" step="0.01" required>
        <input type="date" id="data" name="data" placeholder="Data de admissão" required>
        <input type="text" id="estado" name="estado" placeholder="Estado" required>
      </div>
      <button type="submit" class="btn-salvar">Salvar Funcionário</button>
    </div>
  </form>

  <!-- TABELA DE FUNCIONÁRIOS -->
  <div class="table-responsive">
    <table id="tabela">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Função</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Salário</th>
          <th>Data de Admissão</th>
          <th>Estado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
  <?php
  $sql = "SELECT * FROM funcionarios ORDER BY id DESC";
  $resultado = $conn->query($sql);

  if ($resultado->num_rows > 0) {
      while ($row = $resultado->fetch_assoc()) {
          echo "<tr>";
          echo "<td>" . htmlspecialchars($row['nome']) . "</td>";
          echo "<td>" . htmlspecialchars($row['cpf']) . "</td>";
          echo "<td>" . htmlspecialchars($row['funcao']) . "</td>";
          echo "<td>" . htmlspecialchars($row['telefone']) . "</td>";
          echo "<td>" . htmlspecialchars($row['email']) . "</td>";
          echo "<td>R$ " . number_format($row['salario'], 2, ',', '.') . "</td>";
          echo "<td>" . date("d/m/Y", strtotime($row['data_admissao'])) . "</td>";
          echo "<td>" . htmlspecialchars($row['estado']) . "</td>";
          echo "<td>
                  <button class='btn-editar'><i class='fas fa-edit'></i></button>
                  <<a href='deletar_funcionario.php?id=" . $row['id'] . "' class='btn-excluir' ...>
" . $row['id'] . "' class='btn-excluir' onclick='return confirm(\"Tem certeza que deseja excluir este funcionário?\");'><i class='fas fa-trash'></i></a>
                </td>";
          echo "</tr>";
          
      }
  } else {
      echo "<tr><td colspan='9'>Nenhum funcionário cadastrado.</td></tr>";
  }
  ?>
</tbody>

    </table>
  </div>

  <a href="index.html" class="btn-voltar"><i class="fas fa-arrow-left"></i> Voltar</a>

  <!-- Scripts -->
  <script src="assets/funcionario/script.js"></script>
  <script>
    // Função para alternar a visibilidade do formulário
    function toggleForm() {
      const form = document.getElementById("formAdd");
      form.style.display = form.style.display === "none" ? "block" : "none";
    }
  </script>
</body>
</html>
