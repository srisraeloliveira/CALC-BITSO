document.addEventListener("DOMContentLoaded", function () {
  // Adiciona eventos de escuta para os campos de entrada
  document
    .getElementById("cambio-oficial")
    .addEventListener("input", calcularCambioRevenda);
  document
    .getElementById("percentual-lucro")
    .addEventListener("input", calcularCambioRevenda);
  document
    .getElementById("spread-medio")
    .addEventListener("input", calcularCambioRevenda);
  document
    .getElementById("taxa-conversao")
    .addEventListener("input", calcularCambioRevenda);
  document.getElementById("valor").addEventListener("input", calcular);

  // Calcula o câmbio de revenda quando a página é carregada
  calcularCambioRevenda();
});

// Função para calcular o câmbio de revenda
function calcularCambioRevenda() {
  var cambioOficial = parseFloat(
    document.getElementById("cambio-oficial").value
  );
  var percentualLucro =
    parseFloat(document.getElementById("percentual-lucro").value) / 100;
  var spreadMedio =
    parseFloat(document.getElementById("spread-medio").value) / 100;
  var taxaConversao =
    parseFloat(document.getElementById("taxa-conversao").value) || 0;

  var cambioRevendaTemp = cambioOficial + taxaConversao;
  var cambioRevenda =
    cambioRevendaTemp * (1 + percentualLucro) * (1 + spreadMedio);

  // Atualiza o valor de câmbio de revenda na página
  atualizarValor("cambio-revenda", cambioRevenda);

  // Exibe o contêiner de câmbio de revenda
  document.getElementById("cambio-revenda-container").style.display = "block";

  // Chama a função calcular para atualizar os demais valores
  calcular();
}

// Função para calcular os valores
function calcular() {
  var valor = parseFloat(document.getElementById("valor").value);
  var cambioRevenda = parseFloat(
    document.getElementById("cambio-revenda").textContent
  );
  var cambioOficial = parseFloat(
    document.getElementById("cambio-oficial").value
  );

  var valorTotal = valor / cambioOficial;
  var valorEnviar = valor / cambioRevenda;
  var lucro = valor - valorEnviar * cambioOficial;

  // Atualiza os valores na página
  atualizarValoresCalculados(valorTotal, lucro, valorEnviar);
}

// Função para atualizar o valor de um elemento na página
function atualizarValor(id, valor) {
  var elemento = document.getElementById(id);
  if (isNaN(valor)) {
    elemento.textContent = "---";
  } else {
    elemento.textContent = valor.toFixed(2);
  }
}

// Função para atualizar os valores calculados na página
function atualizarValoresCalculados(valorTotal, lucro, valorEnviar) {
  var resultadoDiv = document.getElementById("resultado");
  var htmlResultado = "";

  if (isNaN(valorTotal) || isNaN(lucro) || isNaN(valorEnviar)) {
    htmlResultado += "<strong>Valor Total:</strong> ---<br>";
    htmlResultado += "<strong>A Enviar:</strong> ---<br>";
    htmlResultado += "<strong>Lucro:</strong> ---<br>";
  } else {
    htmlResultado += "<strong>Valor Total:</strong> R$" + valorTotal.toFixed(2) + "<br>";
    htmlResultado += "<strong>A Enviar:</strong> R$" + valorEnviar.toFixed(2) + "<br>";
    htmlResultado += "<strong>Lucro:</strong> AR$" + lucro.toFixed(2) + "<br>";
  }

  resultadoDiv.innerHTML = htmlResultado;
}

// Função para limpar os campos
function limparCampos() {
  document.getElementById("cambio-oficial").value = "";
  document.getElementById("percentual-lucro").value = "";
  document.getElementById("spread-medio").value = "0.98";
  document.getElementById("taxa-conversao").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("cambio-revenda").textContent = "---";
  document.getElementById("cambio-revenda-container").style.display = "none";
}
