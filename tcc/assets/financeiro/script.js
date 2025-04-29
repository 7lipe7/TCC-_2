function toggleFormLancamento() {
  const form = document.getElementById('formLancamento');
  form.style.display = form.style.display === 'flex' ? 'none' : 'flex';
}

function salvarLancamento() {
  const data = document.getElementById('dataLancamento').value;
  const descricao = document.getElementById('descricaoLancamento').value.trim();
  const tipo = document.getElementById('tipoLancamento').value;
  const valorInput = document.getElementById('valorLancamento').value.trim();
  const valor = parseFloat(valorInput);

  if (!data || !descricao || !tipo || isNaN(valor) || valor <= 0) return;

  const novoLancamento = { data, descricao, tipo, valor };

  const lancamentos = JSON.parse(localStorage.getItem('lancamentos')) || [];
  lancamentos.push(novoLancamento);
  localStorage.setItem('lancamentos', JSON.stringify(lancamentos));

  limparCampos();
  toggleFormLancamento();
  carregarLancamentos();
  atualizarTotaisFinanceiros();
}

function limparCampos() {
  document.getElementById('dataLancamento').value = '';
  document.getElementById('descricaoLancamento').value = '';
  document.getElementById('tipoLancamento').value = '';
  document.getElementById('valorLancamento').value = '';
}

function carregarLancamentos() {
  const tbody = document.querySelector('#tabelaLancamento tbody');
  tbody.innerHTML = '';

  const lancamentos = JSON.parse(localStorage.getItem('lancamentos')) || [];

  if (lancamentos.length === 0) {
    document.getElementById('totalEntradas').textContent = 'R$ 0,00';
    document.getElementById('totalSaidas').textContent = 'R$ 0,00';
    document.getElementById('saldoFinal').textContent = 'R$ 0,00';
    document.getElementById('totalLancamentos').textContent = '0';
    atualizarTotaisFinanceiros();
    return;
  }

  let totalEntradas = 0;
  let totalSaidas = 0;

  lancamentos.forEach((lancamento, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${lancamento.data}</td>
      <td>${lancamento.descricao}</td>
      <td>${lancamento.tipo}</td>
      <td>R$ ${lancamento.valor.toFixed(2).replace('.', ',')}</td>
      <td>
        <button onclick="excluirLancamento(${index})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);

    if (lancamento.tipo === 'Entrada') {
      totalEntradas += lancamento.valor;
    } else if (lancamento.tipo === 'Saída') {
      totalSaidas += lancamento.valor;
    }
  });

  document.getElementById('totalEntradas').textContent = `R$ ${totalEntradas.toFixed(2).replace('.', ',')}`;
  document.getElementById('totalSaidas').textContent = `R$ ${totalSaidas.toFixed(2).replace('.', ',')}`;
  document.getElementById('saldoFinal').textContent = `R$ ${(totalEntradas - totalSaidas).toFixed(2).replace('.', ',')}`;
  document.getElementById('totalLancamentos').textContent = lancamentos.length;

  atualizarTotaisFinanceiros();
}

function excluirLancamento(index) {
  let lancamentos = JSON.parse(localStorage.getItem('lancamentos')) || [];
  lancamentos.splice(index, 1);
  localStorage.setItem('lancamentos', JSON.stringify(lancamentos));
  carregarLancamentos();
  atualizarTotaisFinanceiros();
}

function atualizarTotaisFinanceiros() {
  const lancamentos = JSON.parse(localStorage.getItem('lancamentos')) || [];

  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  let totalEntradas = 0;
  let totalSaidas = 0;

  lancamentos.forEach(lanc => {
    const data = new Date(lanc.data);
    if (data.getMonth() === mesAtual && data.getFullYear() === anoAtual) {
      if (lanc.tipo === 'Entrada') {
        totalEntradas += parseFloat(lanc.valor);
      } else if (lanc.tipo === 'Saída') {
        totalSaidas += parseFloat(lanc.valor);
      }
    }
  });

  localStorage.setItem("vendasMes", totalEntradas.toFixed(2));
  localStorage.setItem("gastosMes", totalSaidas.toFixed(2));

  const span = document.getElementById("gastosMes");
  if (span) {
    span.textContent = totalSaidas.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}

carregarLancamentos();
atualizarTotaisFinanceiros();
// conexao do my sql
function salvarLancamento() {
  const tipo = document.getElementById("tipoLancamento").value;
  const descricao = document.getElementById("descricaoLancamento").value;
  const valor = document.getElementById("valorLancamento").value;

  fetch("salvar_financeiro.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `tipo=${tipo}&descricao=${descricao}&valor=${valor}`,
  })
    .then(response => response.text())
    .then(data => {
      console.log("Lançamento salvo!", data);
      location.reload();
    })
    .catch(error => console.error("Erro:", error));
}
