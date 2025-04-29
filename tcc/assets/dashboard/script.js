new Chart(document.getElementById('graficoEstoque'), {
    type: 'pie',
    data: {
      labels: ['Em Estoque', 'Capacidade Máxima'],
      datasets: [{
        label: 'Produtos',
        data: [120, 80], // total 200
        backgroundColor: ['#3498db', '#ecf0f1']
      }]
    },
    options: {
      plugins: {
        title: { display: true, text: 'Produtos em Estoque' }
      }
    }
  });


    
    

  
  new Chart(document.getElementById('graficoFuncionarios'), {
    type: 'pie',
    data: {
      labels: ['Ativos', 'Vagas Disponíveis'],
      datasets: [{
        label: 'Funcionários',
        data: [8, 2],
        backgroundColor: ['#2ecc71', '#bdc3c7']
      }]
    },
    options: {
      plugins: {
        title: { display: true, text: 'Funcionários Ativos' }
      }
    }
  });

  
  new Chart(document.getElementById('graficoGastos'), {
    type: 'pie',
    data: {
      labels: ['Gastos', 'Receita'],
      datasets: [{
        label: 'Financeiro',
        data: [4500, 8500], 
        backgroundColor: ['#f39c12', '#2ecc71']
      }]
    },
    options: {
      plugins: {
        title: { display: true, text: 'Gastos vs Receita' }
      }
    }
  });

  // Gráfico Pizza - Produtos com Estoque Baixo
  new Chart(document.getElementById('graficoEstoqueBaixo'), {
    type: 'pie',
    data: {
      labels: ['Estoque Baixo', 'Estoque OK'],
      datasets: [{
        label: 'Produtos',
        data: [3, 117],
        backgroundColor: ['#e74c3c', '#2ecc71']
      }]
    },
    options: {
      plugins: {
        title: { display: true, text: 'Produtos com Estoque Baixo' }
      }
    }
 
  });