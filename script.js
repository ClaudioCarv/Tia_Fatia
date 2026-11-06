/**
 * TIA FATIA - Script de Ponte e Retrocompatibilidade
 * Garante que chamadas antigas como addToCart(), trocarImagem(), etc., continuem funcionando
 * sem disparar alerts antigos, redirecionando para o novo CartState e Toast system.
 */

// Compatibilidade addToCart
function addToCart(name, price) {
    if (typeof CartState !== 'undefined') {
        const item = {
            id: 'item-' + Date.now(),
            name: name,
            category: 'geral',
            price: parseFloat(price) || 0,
            quantity: 1,
            image: 'img/logoS.png',
            border: null,
            additionals: []
        };
        CartState.addItem(item);
    }
}

// Funções legadas de trocar imagem no hover (mantidas para não causar erro caso chamadas)
function trocarImagem(nomeImagem) {
    const el = document.getElementById("imagemNav");
    if (el) el.src = "img/" + nomeImagem + ".png";
}

function trocarImagem2(nomeImagem) {
    const el = document.getElementById("imagemNav2");
    if (el) el.src = "img/" + nomeImagem + ".png";
}

function trocarImagem3(nomeImagem) {
    const el = document.getElementById("imagemNav3");
    if (el) el.src = "img/" + nomeImagem + ".png";
}

function exibirPopUp() {
    // Substituído pelo novo sistema de toast
}
