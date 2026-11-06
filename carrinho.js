/**
 * TIA FATIA - Lógica do Checkout (carrinho.html)
 * Gerencia validação de endereço, busca CEP, máscaras de cartão,
 * alternador de Entrega/Retirada, Cupons e Conclusão de Pedido.
 */

let isDeliverySelected = true;
let currentPaymentMethod = 'pix';
let appliedCouponCode = null;

document.addEventListener('DOMContentLoaded', () => {
    // Carrega dados do usuário salvo se houver
    const user = getCurrentUser();
    if (user && user.address) {
        if (document.getElementById('street')) document.getElementById('street').value = user.address.street || '';
        if (document.getElementById('number')) document.getElementById('number').value = user.address.number || '';
        if (document.getElementById('neighborhood')) document.getElementById('neighborhood').value = user.address.neighborhood || '';
        if (document.getElementById('city')) document.getElementById('city').value = user.address.city || '';
        if (document.getElementById('zip')) document.getElementById('zip').value = user.address.zip || '';
    }

    renderCheckoutPage();
});

function setDeliveryMode(isDelivery) {
    isDeliverySelected = isDelivery;

    document.getElementById('tabDelivery').classList.toggle('active', isDelivery);
    document.getElementById('tabPickup').classList.toggle('active', !isDelivery);

    document.getElementById('deliveryAddressForm').style.display = isDelivery ? 'block' : 'none';
    document.getElementById('pickupInfoBox').style.display = isDelivery ? 'none' : 'block';

    renderCheckoutPage();
}

function selectPaymentMethod(method) {
    currentPaymentMethod = method;

    document.getElementById('payPix').classList.toggle('active', method === 'pix');
    document.getElementById('payCard').classList.toggle('active', method === 'card');
    document.getElementById('payCash').classList.toggle('active', method === 'cash');

    document.getElementById('paymentContentPix').style.display = method === 'pix' ? 'block' : 'none';
    document.getElementById('paymentContentCard').style.display = method === 'card' ? 'block' : 'none';
    document.getElementById('paymentContentCash').style.display = method === 'cash' ? 'block' : 'none';
}

function copyPixKey() {
    const key = document.getElementById('pixKeyText').value;
    navigator.clipboard.writeText(key).then(() => {
        showToast('Chave PIX copiada para a área de transferência! ⚡', 'success');
    }).catch(() => {
        showToast('Não foi possível copiar automaticamente. Selecione e copie o código.', 'warning');
    });
}

function applyCouponCode() {
    const input = document.getElementById('couponInput');
    const code = input ? input.value.trim().toUpperCase() : '';

    if (!code) {
        showToast('Por favor, digite um código de cupom.', 'warning');
        return;
    }

    if (VALID_COUPONS[code]) {
        appliedCouponCode = code;
        document.getElementById('couponAppliedBadge').style.display = 'block';
        document.getElementById('couponAppliedBadge').textContent = `✓ Cupom ${code} aplicado (${VALID_COUPONS[code].label})!`;
        showToast(`Cupom ${code} aplicado com sucesso! 🎉`, 'success');
        renderCheckoutPage();
    } else {
        showToast('Cupom inválido ou expirado.', 'warning');
    }
}

function renderCheckoutPage() {
    const summaryItems = document.getElementById('checkoutSummaryItems');
    if (!summaryItems) return;

    const cart = CartState.getCart();

    if (cart.length === 0) {
        summaryItems.innerHTML = `
            <p style="font-size: 0.85rem; color: var(--dark-muted); text-align: center;">
                Seu carrinho está vazio. <a href="index.html#cardapio" style="color: var(--primary); font-weight: 700;">Voltar ao cardápio</a>
            </p>
        `;
    } else {
        summaryItems.innerHTML = cart.map(item => `
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                <span style="font-weight: 600; color: var(--dark);">${item.quantity}x ${item.name}</span>
                <span style="font-weight: 700; color: var(--primary);">
                    R$ ${((item.price + (item.borderPrice || 0) + (item.additionalsPrice || 0)) * item.quantity).toFixed(2).replace('.', ',')}
                </span>
            </div>
        `).join('');
    }

    const totals = CartState.getTotals(appliedCouponCode, isDeliverySelected);

    document.getElementById('summarySubtotal').textContent = `R$ ${totals.subtotal.toFixed(2).replace('.', ',')}`;

    const discountRow = document.getElementById('summaryDiscountRow');
    if (totals.discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('summaryDiscount').textContent = `- R$ ${totals.discount.toFixed(2).replace('.', ',')}`;
    } else {
        discountRow.style.display = 'none';
    }

    document.getElementById('summaryShipping').textContent = isDeliverySelected 
        ? (totals.shipping === 0 ? 'Grátis 🎉' : `R$ ${totals.shipping.toFixed(2).replace('.', ',')}`)
        : 'Grátis (Retirada)';

    document.getElementById('summaryGrandTotal').textContent = `R$ ${totals.total.toFixed(2).replace('.', ',')}`;
}

/* ==========================================================================
   MÁSCARAS E VALIDAÇÕES DO FORMULÁRIO DE CARTÃO & CEP
   ========================================================================== */
function formatCEP(input) {
    let v = input.value.replace(/\D/g, '');
    if (v.length > 5) v = v.substring(0, 5) + '-' + v.substring(5, 8);
    input.value = v;
}

function formatCardNumber(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 16);
    let parts = [];
    for (let i = 0; i < v.length; i += 4) {
        parts.push(v.substring(i, i + 4));
    }
    input.value = parts.join(' ');
    
    const preview = document.getElementById('vcNumberPreview');
    if (preview) {
        preview.textContent = input.value || '•••• •••• •••• ••••';
    }
}

function updateCardName(val) {
    const preview = document.getElementById('vcNamePreview');
    if (preview) {
        preview.textContent = val.toUpperCase() || 'SEU NOME AQUI';
    }
}

function formatExpiry(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 2) {
        v = v.substring(0, 2) + '/' + v.substring(2);
    }
    input.value = v;

    const preview = document.getElementById('vcExpiryPreview');
    if (preview) {
        preview.textContent = input.value || 'MM/AA';
    }
}

/* ==========================================================================
   FINALIZAÇÃO DO PEDIDO
   ========================================================================== */
function buildOrderPayload() {
    const cart = CartState.getCart();
    if (cart.length === 0) {
        showToast('Adicione ao menos uma fatia ao pedido!', 'warning');
        return null;
    }

    let addressStr = 'Retirada no Balcão (Av. Principal das Fatias, 1000)';
    if (isDeliverySelected) {
        const street = document.getElementById('street').value.trim();
        const number = document.getElementById('number').value.trim();
        const neigh = document.getElementById('neighborhood').value.trim();
        const city = document.getElementById('city').value.trim();
        const comp = document.getElementById('complement') ? document.getElementById('complement').value.trim() : '';

        if (!street || !number || !neigh) {
            showToast('Por favor, preencha os dados de endereço para entrega!', 'warning');
            return null;
        }

        addressStr = `${street}, Nº ${number} - ${neigh}, ${city}${comp ? ` (${comp})` : ''}`;
    }

    let paymentMethodLabel = 'PIX Instantâneo';
    if (currentPaymentMethod === 'card') {
        const num = document.getElementById('cardNumber').value.trim();
        const masked = num ? `Final ${num.slice(-4)}` : 'Cartão de Crédito';
        paymentMethodLabel = `Cartão (${masked})`;
    } else if (currentPaymentMethod === 'cash') {
        const change = document.getElementById('cashChange') ? document.getElementById('cashChange').value.trim() : '';
        paymentMethodLabel = `Dinheiro ${change ? `(Troco para: ${change})` : '(Valor exato)'}`;
    }

    const totals = CartState.getTotals(appliedCouponCode, isDeliverySelected);
    const orderId = Math.floor(100000 + Math.random() * 900000);
    const user = getCurrentUser();

    return {
        orderId: orderId,
        date: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        customerName: user ? (user.name || user.emailOrPhone) : 'Cliente Especial',
        isDelivery: isDeliverySelected,
        address: addressStr,
        paymentMethod: paymentMethodLabel,
        items: cart,
        subtotal: totals.subtotal,
        discount: totals.discount,
        shipping: totals.shipping,
        total: totals.total,
        status: isDeliverySelected ? 'Em Preparo' : 'Aguardando Retirada',
        statusStep: 1, // 0: Confirmado, 1: No Forno, 2: A caminho, 3: Entregue
        createdAt: Date.now()
    };
}

function submitFinalOrder() {
    const order = buildOrderPayload();
    if (!order) return;

    // Salva o pedido ativo e no histórico
    localStorage.setItem('activeOrder', JSON.stringify(order));
    
    // Compatibilidade com código legado
    localStorage.setItem('numeroPedido', order.orderId);
    localStorage.setItem('opcaoEntrega', order.isDelivery ? 'Entregue' : 'Retirado');
    localStorage.setItem('enderecoEntrega', order.address);
    localStorage.setItem('metodoPagamento', order.paymentMethod);

    // Salva no histórico de pedidos do cliente
    try {
        let history = JSON.parse(localStorage.getItem('order_history')) || [];
        history.unshift(order);
        if (history.length > 10) history = history.slice(0, 10);
        localStorage.setItem('order_history', JSON.stringify(history));
    } catch (e) {
        console.error('Erro ao salvar histórico:', e);
    }

    // Limpa o carrinho atual
    CartState.saveCart([]);

    showToast('Pedido realizado com sucesso! Redirecionando...', 'success');

    setTimeout(() => {
        window.location.href = 'entregas.html';
    }, 1200);
}

function submitOrderViaWhatsApp() {
    const order = buildOrderPayload();
    if (!order) return;

    sendWhatsAppOrder(order);
}
