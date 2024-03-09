// Adiciona eventos de escuta para os campos de entrada
document.getElementById('cambio-oficial').addEventListener('input', calcularCambioRevenda);
document.getElementById('percentual-lucro').addEventListener('input', calcularCambioRevenda);
document.getElementById('spread-medio').addEventListener('input', calcular);
document.getElementById('valor').addEventListener('input', function() {
    alternarModoOperacao();
    calcularCambioRevenda();
    calcular();
});
document.getElementById('tipo-operacao').addEventListener('change', alternarModoOperacao);
document.getElementById('taxa-efetivo').addEventListener('input', calcularCambioRevenda);
document.getElementById('desconto').addEventListener('input', function() {
    calcularCambioRevenda();
    calcular();
});

// Função para calcular o câmbio de revenda
function calcularCambioRevenda() {
    var cambioOficial = parseFloat(document.getElementById('cambio-oficial').value);
    var percentualLucro = parseFloat(document.getElementById('percentual-lucro').value) / 100; // Convertendo para decimal
    var spreadMedio = parseFloat(document.getElementById('spread-medio').value) / 100; // Spread médio em decimal
    var tipoOperacao = document.getElementById('tipo-operacao').value;
    var valor = parseFloat(document.getElementById('valor').value);
    var desconto = parseFloat(document.getElementById('desconto').value)/ 100;

    var cambioRevenda, taxaEfetivo;

    if (tipoOperacao === 'deposito') {
        cambioRevenda = (cambioOficial * (1 - percentualLucro)) + desconto;
    } else if (tipoOperacao === 'efetivo') {
        taxaEfetivo = parseFloat(document.getElementById('taxa-efetivo').value);
        cambioRevenda = (cambioOficial * (1 - percentualLucro)) - taxaEfetivo + desconto;
    }

    // Verifica se o valor de cambioRevenda é NaN e substitui por '---'
    if (isNaN(cambioRevenda)) {
        document.getElementById('cambio-revenda').textContent = "---";
    } else {
        document.getElementById('cambio-revenda').textContent = cambioRevenda.toFixed(2);
    }
    
    document.getElementById('cambio-revenda-container').style.display = 'block';
}

// Função para calcular os valores
function calcular() {
    var valor = parseFloat(document.getElementById('valor').value);
    var spreadMedio = parseFloat(document.getElementById('spread-medio').value) / 100; // Spread médio em decimal
    var tipoOperacao = document.getElementById('tipo-operacao').value;
    var cambioRevenda = parseFloat(document.getElementById('cambio-revenda').textContent);

    var valorTotal = valor * parseFloat(document.getElementById('cambio-oficial').value);
    var lucro = valorTotal - ((valor * cambioRevenda) + (spreadMedio * valor));
    var valorEnviar = valorTotal - lucro;

    var resultadoDiv = document.getElementById('resultado');

    // Verifica se algum valor calculado é NaN e substitui por '---'
    if (isNaN(valorTotal) || isNaN(lucro) || isNaN(valorEnviar)) {
        resultadoDiv.innerHTML = "<strong>Valor Total:</strong> ---<br>";
        resultadoDiv.innerHTML += "<strong>Lucro:</strong> ---<br>";
        resultadoDiv.innerHTML += "<strong>A Enviar:</strong> ---";
    } else {
        resultadoDiv.innerHTML = "<strong>Valor Total:</strong> $" + valorTotal.toFixed(2) + "<br>";
        resultadoDiv.innerHTML += "<strong>Lucro:</strong> $" + lucro.toFixed(2) + "<br>";
        resultadoDiv.innerHTML += "<strong>A Enviar:</strong> $" + valorEnviar.toFixed(2);
    }
}

// Função para limpar os campos
function limparCampos() {
    document.getElementById('cambio-oficial').value = "";
    document.getElementById('percentual-lucro').value = "";
    document.getElementById('spread-medio').value = "";
    document.getElementById('valor').value = "";
    document.getElementById('resultado').innerHTML = "";
    document.getElementById('cambio-revenda').textContent = "---";
    document.getElementById('cambio-revenda-container').style.display = 'none';
    document.getElementById('taxa-efetivo').value = "";
    document.getElementById('desconto').value = "";
    document.getElementById('desconto-container').style.display = 'none';
}

// Função para alternar o modo de operação
function alternarModoOperacao() {
    var tipoOperacao = document.getElementById('tipo-operacao').value;
    var valor = parseFloat(document.getElementById('valor').value);

    if (valor > 500) {
        document.getElementById('desconto-container').style.display = 'block';
    } else {
        document.getElementById('desconto-container').style.display = 'none';
    }

    if (tipoOperacao === 'efetivo') {
        document.getElementById('taxa-efetivo-container').style.display = 'block';
    } else {
        document.getElementById('taxa-efetivo-container').style.display = 'none';
    }
}

// Calcula o câmbio de revenda quando a página é carregada
calcularCambioRevenda();
