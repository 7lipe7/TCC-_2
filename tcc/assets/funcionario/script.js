// Função para salvar o funcionário
function salvarFuncionario() {
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const funcao = document.getElementById("funcao").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const salario = document.getElementById("salario").value.trim();
  const data = document.getElementById("data").value;
  const estado = document.getElementById("estado").value.trim();

  if (!nome || !cpf || !funcao || !telefone || !email || !salario || !data || !estado) {
    Swal.fire("Erro", "Preencha todos os campos!", "error");
    return;
  }

  const novoFuncionario = { nome, cpf, funcao, telefone, email, salario, data, estado };

  // Recuperar lista de funcionários do localStorage, ou inicializar como um array vazio
  let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];

  // Adicionar o novo funcionário à lista
  funcionarios.push(novoFuncionario);

  // Atualizar o localStorage com a nova lista de funcionários
  localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

  // Enviar dados para o servidor (PHP)
  fetch('salvar_funcionario.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `nome=${encodeURIComponent(nome)}&cpf=${cpf}&funcao=${funcao}&telefone=${telefone}&email=${email}&salario=${salario}&data=${data}&estado=${estado}`
  })
  .then(response => response.text())
  .then(data => {
    console.log("Resposta do servidor:", data);

    // SweetAlert para sucesso
    Swal.fire({
      icon: 'success',
      title: 'Funcionário salvo!',
      text: `O funcionário ${nome} foi cadastrado com sucesso.`,
      confirmButtonColor: '#28a745'
    });

    // Limpar campos do formulário
    limparCampos();
    document.getElementById("formAdd").style.display = "none";
    renderizarTabela();
  })
  .catch(error => {
    console.error("Erro ao salvar:", error);
    Swal.fire("Erro", "Ocorreu um erro ao salvar!", "error");
  });
}

// Função para limpar os campos após salvar
function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("funcao").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("salario").value = "";
  document.getElementById("data").value = "";
  document.getElementById("estado").value = "";
}

// Função para alternar a visibilidade do formulário
function toggleForm() {
  const form = document.getElementById("formAdd");
  form.style.display = (form.style.display === "none" || form.style.display === "") ? "block" : "none";
}

// Função para confirmar e excluir funcionário
function excluirFuncionario(id) {
  Swal.fire({
    title: 'Tem certeza?',
    text: 'Você deseja excluir este funcionário?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Envia a requisição GET para excluir o funcionário
      fetch(`excluir_funcionario.php?id=${id}`, { method: 'GET' })
        .then(res => res.text())  // A resposta do servidor será tratada aqui
        .then(response => {
          if (response.includes('Funcionário excluído com sucesso!')) {
            // Se o funcionário foi excluído com sucesso, mostra uma mensagem e recarrega a página
            Swal.fire('Excluído!', 'Funcionário removido com sucesso.', 'success')
              .then(() => location.reload());  // Recarrega a página para atualizar a lista
          } else {
            // Se não conseguiu excluir, mostra uma mensagem de erro
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir o funcionário.', 'error');
          }
        })
        .catch(err => {
          // Caso ocorra algum erro na requisição
          Swal.fire('Erro!', 'Ocorreu um erro ao excluir.', 'error');
        });
    }
  });
}
{
// Função para editar um funcionário    
}

// Função para renderizar a tabela de funcionários a partir do localStorage
function renderizarTabela() {
  const tabela = document.getElementById("tabela").getElementsByTagName('tbody')[0];
  tabela.innerHTML = ''; // Limpar tabela antes de renderizar

  let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];

  if (funcionarios.length > 0) {
    funcionarios.forEach((funcionario, index) => {
      const row = tabela.insertRow();
      row.innerHTML = `
        <td>${funcionario.nome}</td>
        <td>${funcionario.cpf}</td>
        <td>${funcionario.funcao}</td>
        <td>${funcionario.telefone}</td>
        <td>${funcionario.email}</td>
        <td>R$ ${parseFloat(funcionario.salario).toFixed(2).replace('.', ',')}</td>
        <td>${new Date(funcionario.data).toLocaleDateString()}</td>
        <td>${funcionario.estado}</td>
        <td>
          <button class='btn-editar'><i class='fas fa-edit'></i></button>
          <button class='btn-excluir' onclick='excluirFuncionario(${index})'><i class='fas fa-trash'></i></button>
        </td>
      `;
    });
  } else {
    tabela.innerHTML = '<tr><td colspan="9">Nenhum funcionário cadastrado.</td></tr>';
  }
}

// Renderizar tabela ao carregar a página
window.onload = renderizarTabela;
// Função para salvar o funcionário
function salvarFuncionario() {
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const funcao = document.getElementById("funcao").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const salario = document.getElementById("salario").value.trim();
  const data = document.getElementById("data").value;
  const estado = document.getElementById("estado").value.trim();

  if (!nome || !cpf || !funcao || !telefone || !email || !salario || !data || !estado) {
    Swal.fire("Erro", "Preencha todos os campos!", "error");
    return;
  }

  const novoFuncionario = { nome, cpf, funcao, telefone, email, salario, data, estado };

  // Recuperar lista de funcionários do localStorage, ou inicializar como um array vazio
  let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];

  // Adicionar o novo funcionário à lista
  funcionarios.push(novoFuncionario);

  // Atualizar o localStorage com a nova lista de funcionários
  localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

  // Enviar dados para o servidor (PHP)
  fetch('salvar_funcionario.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `nome=${encodeURIComponent(nome)}&cpf=${cpf}&funcao=${funcao}&telefone=${telefone}&email=${email}&salario=${salario}&data=${data}&estado=${estado}`
  })
  .then(response => response.text())
  .then(data => {
    console.log("Resposta do servidor:", data);

    // SweetAlert para sucesso
    Swal.fire({
      icon: 'success',
      title: 'Funcionário salvo!',
      text: `O funcionário ${nome} foi cadastrado com sucesso.`,
      confirmButtonColor: '#28a745'
    });

    // Limpar campos do formulário
    limparCampos();
    document.getElementById("formAdd").style.display = "none";

    // Atualiza a página após salvar
    location.reload(); // Recarregar a página para refletir as mudanças
  })
  .catch(error => {
    console.error("Erro ao salvar:", error);
    Swal.fire("Erro", "Ocorreu um erro ao salvar!", "error");
  });
}

