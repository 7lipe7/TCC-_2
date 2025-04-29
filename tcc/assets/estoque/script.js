let linhaEditando = null;

function toggleForm() {
  const form = document.getElementById('formAdd');
  form.style.display = form.style.display === 'flex' ? 'none' : 'flex';

  if (linhaEditando !== null) {
    limparCampos();
    linhaEditando = null;
    document.getElementById('btnSalvar').innerText = "Salvar Produto";
  }
}

function salvarProduto() {
  const produto = document.getElementById('produto').value.trim();
  const categoria = document.getElementById('categoria').value.trim();
  const unidadedemedida = document.getElementById('unidade-de-medida').value.trim();
  const valor = document.getElementById('valor').value.trim();
  const fornecedor = document.getElementById('fornecedor').value.trim();
  const quantidade = document.getElementById('quantidade').value.trim();
  const estoquemaximo = document.getElementById('estoque-maximo').value.trim();
  const estoqueminimo = document.getElementById('estoque-minimo').value.trim();
  const validade = document.getElementById('validade').value.trim();

  if (!produto || !categoria || !unidadedemedida || !fornecedor || !quantidade || !estoquemaximo || !estoqueminimo || !validade) {
    Swal.fire({
      icon: 'warning',
      title: 'Preencha todos os campos!',
      text: 'Todos os campos são obrigatórios para salvar o produto.',
      confirmButtonColor: '#f39c12'
    });
    return;
  }

  const novoProduto = {
    produto, categoria, unidadedemedida, valor, fornecedor, quantidade, estoquemaximo, estoqueminimo, validade
  };

  const tbody = document.getElementById('tabela-body');

  if (linhaEditando !== null) {
    linhaEditando.cells[0].innerText = produto;
    linhaEditando.cells[1].innerText = categoria;
    linhaEditando.cells[2].innerText = unidadedemedida;
    linhaEditando.cells[3].innerText = valor;
    linhaEditando.cells[4].innerText = fornecedor;
    linhaEditando.cells[5].innerText = quantidade;
    linhaEditando.cells[6].innerText = estoquemaximo;
    linhaEditando.cells[7].innerText = estoqueminimo;
    linhaEditando.cells[8].innerText = validade;

    const nomeAntigo = linhaEditando.dataset.nomeProduto;
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const index = produtos.findIndex(p => p.produto === nomeAntigo);
    if (index !== -1) {
      produtos[index] = novoProduto;
      localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    linhaEditando = null;
    document.getElementById('btnSalvar').innerText = "Salvar Produto";

    Swal.fire({
      icon: 'success',
      title: 'Produto atualizado!',
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    const novaLinha = document.createElement('tr');
    novaLinha.setAttribute('data-nome-produto', produto);
    novaLinha.innerHTML = `
      <td>${produto}</td>
      <td>${categoria}</td>
      <td>${unidadedemedida}</td>
      <td>${valor}</td>
      <td>${fornecedor}</td>
      <td>${quantidade}</td>
      <td>${estoquemaximo}</td>
      <td>${estoqueminimo}</td>
      <td>${validade}</td>
      <td>
        <button onclick="editarProduto(this)" style="background:#3498db; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;"><i class="fas fa-edit"></i></button>
        <button onclick="excluirProduto(this)" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(novaLinha);

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(novoProduto);
    localStorage.setItem('produtos', JSON.stringify(produtos));

    const lancamentos = JSON.parse(localStorage.getItem('lancamentos')) || [];
    lancamentos.push({
      data: new Date().toISOString().split('T')[0],
      descricao: produto,
      tipo: 'Saída',
      valor: parseFloat(valor)
    });
    localStorage.setItem('lancamentos', JSON.stringify(lancamentos));

    Swal.fire({
      icon: 'success',
      title: 'Produto adicionado!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  limparCampos();
  toggleForm();
}

function editarProduto(botao) {
  const linha = botao.closest('tr');
  linhaEditando = linha;

  linhaEditando.dataset.nomeProduto = linha.cells[0].innerText;

  document.getElementById('produto').value = linha.cells[0].innerText;
  document.getElementById('categoria').value = linha.cells[1].innerText;
  document.getElementById('unidade-de-medida').value = linha.cells[2].innerText;
  document.getElementById('valor').value = linha.cells[3].innerText;
  document.getElementById('fornecedor').value = linha.cells[4].innerText;
  document.getElementById('quantidade').value = linha.cells[5].innerText;
  document.getElementById('estoque-maximo').value = linha.cells[6].innerText;
  document.getElementById('estoque-minimo').value = linha.cells[7].innerText;
  document.getElementById('validade').value = linha.cells[8].innerText;

  document.getElementById('btnSalvar').innerText = "Atualizar Produto";
  document.getElementById('formAdd').style.display = 'flex';
}

function excluirProduto(botao) {
  const linha = botao.closest('tr');
  const nomeProduto = linha.cells[0].innerText;
  linha.remove();

  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos = produtos.filter(p => p.produto !== nomeProduto);
  localStorage.setItem('produtos', JSON.stringify(produtos));

  Swal.fire({
    icon: 'success',
    title: 'Produto removido!',
    showConfirmButton: false,
    timer: 1500
  });
}

function limparCampos() {
  document.getElementById('produto').value = '';
  document.getElementById('categoria').value = '';
  document.getElementById('unidade-de-medida').value = '';
  document.getElementById('valor').value = '';
  document.getElementById('fornecedor').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('estoque-maximo').value = '';
  document.getElementById('estoque-minimo').value = '';
  document.getElementById('validade').value = '';
}

function carregarProdutos() {
  const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
  const tbody = document.getElementById('tabela-body');

  produtosSalvos.forEach(produto => {
    const novaLinha = document.createElement('tr');
    novaLinha.setAttribute('data-nome-produto', produto.produto);
    novaLinha.innerHTML = `
      <td>${produto.produto}</td>
      <td>${produto.categoria}</td>
      <td>${produto.unidadedemedida}</td>
      <td>${produto.valor}</td>
      <td>${produto.fornecedor}</td>
      <td>${produto.quantidade}</td>
      <td>${produto.estoquemaximo}</td>
      <td>${produto.estoqueminimo}</td>
      <td>${produto.validade}</td>
      <td>
        <button onclick="editarProduto(this)" style="background:#3498db; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;"><i class="fas fa-edit"></i></button>
        <button onclick="excluirProduto(this)" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(novaLinha);
  });
  function toggleForm() {
    const form = document.getElementById("formAdd");
    form.style.display = form.style.display === "none" ? "block" : "none";
  }
  
} 

carregarProdutos(); 

document.getElementById("buscaProduto").addEventListener("keyup", function () {
  let valorBusca = this.value.toLowerCase();
  let linhas = document.querySelectorAll("#tabela-body tr");

  linhas.forEach(linha => {
    let textoLinha = linha.innerText.toLowerCase();
    linha.style.display = textoLinha.includes(valorBusca) ? "" : "none";
  });
});

