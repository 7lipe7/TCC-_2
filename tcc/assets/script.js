function obterGastosPorMes() {
  const lancamentos = JSON.parse(localStorage.getItem('lancamentos')) || [];
  const gastosPorMes = new Array(12).fill(0);

  lancamentos.forEach(lancamento => {
    if (lancamento.tipo === 'Saída') {
      const data = new Date(lancamento.data);
      const mes = data.getMonth();
      const ano = data.getFullYear();
      const anoAtual = new Date().getFullYear();
      if (ano === anoAtual) {
        gastosPorMes[mes] += parseFloat(lancamento.valor);
      }
    }
  });

  return gastosPorMes;
}

function obterVendasPorMes() {
  const lancamentos = JSON.parse(localStorage.getItem('lancamentos')) || [];
  const vendasPorMes = new Array(12).fill(0);

  lancamentos.forEach(lancamento => {
    if (lancamento.tipo === 'Entrada') {
      const data = new Date(lancamento.data);
      const mes = data.getMonth();
      const ano = data.getFullYear();
      const anoAtual = new Date().getFullYear();
      if (ano === anoAtual) {
        vendasPorMes[mes] += parseFloat(lancamento.valor);
      }
    }
  });

  return vendasPorMes;
}

function gerarGraficoMensal() {
  const gastosReais = obterGastosPorMes();
  const vendasReais = obterVendasPorMes();

  const ctx = document.getElementById('graficoMensal').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      datasets: [
        {
          label: 'Vendas',
          data: vendasReais,
          borderColor: '#2ecc71',
          backgroundColor: 'rgba(46, 204, 113, 0.2)',
          fill: true,
          tension: 0.3
        },
        {
          label: 'Gastos',
          data: gastosReais,
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231, 76, 60, 0.2)',
          fill: true,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Vendas e Gastos Mensais'
        }
      }
    }
  });
}

function carregarGastosMes() {
  const gastos = parseFloat(localStorage.getItem("gastosMes")) || 0;
  document.getElementById("gastosMes").textContent = `R$ ${gastos.toFixed(2).replace('.', ',')}`;
}

function calcularVendasMes() {
  const lancamentos = JSON.parse(localStorage.getItem('lancamentos')) || [];
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  const totalEntradasMes = lancamentos.reduce((total, lancamento) => {
    const dataLanc = new Date(lancamento.data);
    const mesLanc = dataLanc.getMonth();
    const anoLanc = dataLanc.getFullYear();

    if (lancamento.tipo === 'Entrada' && mesLanc === mesAtual && anoLanc === anoAtual) {
      return total + lancamento.valor;
    }
    return total;
  }, 0);

  const vendasMesEl = document.getElementById("vendasMes");
  if (vendasMesEl) {
    vendasMesEl.textContent = totalEntradasMes.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  localStorage.setItem("vendasMes", totalEntradasMes.toFixed(2));
}

function atualizarVisaoGeral() {
  calcularVendasMes();
  carregarGastosMes();
  gerarGraficoMensal();

  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const produtosEmBaixa = produtos.filter(p => parseInt(p.quantidade) < parseInt(p.estoqueminimo));
  document.getElementById('produtos-em-baixa').innerText = `${produtosEmBaixa.length} item${produtosEmBaixa.length === 1 ? '' : 's'}`;

  const total = localStorage.getItem("totalFuncionarios") || 0;
  document.getElementById("funcionariosAtivos").innerText = `${total} funcionário${total == 1 ? '' : 's'}`;
}

window.onload = atualizarVisaoGeral;
