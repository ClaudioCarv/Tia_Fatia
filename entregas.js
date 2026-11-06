/**
 * TIA FATIA - Lógica de Acompanhamento e Entregas (entregas.html)
 * Controla a linha do tempo viva do pedido, simulação de entrega,
 * dados do motoboy e histórico de pedidos.
 */

let activeOrderData = null;

const TRACKING_STAGES = [
    { title: 'Pedido Confirmado', badge: '📋 Confirmado', time: '35 a 45 min', fill: '0%' },
    { title: 'No Forno a Lenha', badge: '👨‍🍳 Em Preparo', time: '20 a 30 min', fill: '33%' },
    { title: 'A Caminho com Motoboy', badge: '🛵 Saiu para Entrega', time: '10 a 15 min', fill: '66%' },
    { title: 'Pedido Entregue!', badge: '✅ Entregue com Sucesso', time: 'Entregue', fill: '100%' }
];

document.addEventListener('DOMContentLoaded', () => {
    loadActiveOrder();
    renderOrderHistory();
});

function loadActiveOrder() {
    let order = null;
    try {
        order = JSON.parse(localStorage.getItem('activeOrder'));
    } catch (e) {
        order = null;
    }

    // Se não encontrar o activeOrder, tenta carregar dados legados
    if (!order) {
        const legacyNum = localStorage.getItem('numeroPedido');
        if (legacyNum) {
            order = {
                orderId: legacyNum,
                date: 'Hoje',
                address: localStorage.getItem('enderecoEntrega') || 'Av. Epitácio Pessoa, 1200 - Tambauzinho',
                paymentMethod: localStorage.getItem('metodoPagamento') || 'Cartão de Crédito',
                statusStep: 1,
                items: [
                    { name: 'Fatia de Calabresa Artesanal', quantity: 2, price: 5.99 },
                    { name: 'Fatia Sensação de Morango', quantity: 1, price: 10.25 }
                ],
                total: 22.23
            };
        } else {
            // Cria um pedido demonstrativo
            order = {
                orderId: '583601',
                date: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                address: 'Rua dos Lírios, 89 - Cabo Branco, João Pessoa - PB',
                paymentMethod: 'PIX Instantâneo',
                statusStep: 1,
                items: [
                    { name: 'Fatia de Calabresa Artesanal', quantity: 2, price: 5.99 },
                    { name: 'Fatia Marguerita Especial', quantity: 1, price: 6.50 },
                    { name: 'Refrigerante Lata 350ml', quantity: 2, price: 5.00 }
                ],
                total: 28.48
            };
        }
    }

    activeOrderData = order;
    updateTrackingUI();
}

function updateTrackingUI() {
    if (!activeOrderData) return;

    const step = activeOrderData.statusStep || 0;
    const stage = TRACKING_STAGES[step] || TRACKING_STAGES[0];

    document.getElementById('trackingOrderId').textContent = `Pedido #${activeOrderData.orderId}`;
    document.getElementById('trackingOrderTime').textContent = activeOrderData.date || 'Hoje';
    document.getElementById('trackingTimeEstimate').textContent = stage.time;

    document.getElementById('trackingStatusText').textContent = stage.title;
    document.getElementById('trackingTimelineFill').style.width = stage.fill;

    // Atualiza classes dos steps
    for (let i = 0; i <= 3; i++) {
        const stepEl = document.getElementById(`step${i}`);
        if (!stepEl) continue;

        stepEl.classList.remove('completed', 'active');
        if (i < step) {
            stepEl.classList.add('completed');
        } else if (i === step) {
            stepEl.classList.add('active');
        }
    }

    // Motoboy e mapa
    const pin = document.getElementById('motoboyPin');
    if (pin) {
        if (step === 3) {
            pin.textContent = '🏠';
        } else if (step === 2) {
            pin.textContent = '🛵';
        } else {
            pin.textContent = '👨‍🍳';
        }
    }

    // Detalhes da entrega
    document.getElementById('trackingAddress').textContent = activeOrderData.address;
    document.getElementById('trackingPayment').textContent = activeOrderData.paymentMethod;

    // Lista de itens
    const itemsList = document.getElementById('trackingItemsList');
    if (itemsList && activeOrderData.items) {
        itemsList.innerHTML = activeOrderData.items.map(item => `
            <div style="display: flex; justify-content: space-between; font-size: 0.88rem;">
                <span>${item.quantity}x ${item.name}</span>
                <span style="font-weight: 700;">R$ ${((item.price + (item.borderPrice || 0) + (item.additionalsPrice || 0)) * item.quantity).toFixed(2).replace('.', ',')}</span>
            </div>
        `).join('');
    }

    const totalEl = document.getElementById('trackingTotalAmount');
    if (totalEl) {
        totalEl.textContent = `R$ ${(activeOrderData.total || 0).toFixed(2).replace('.', ',')}`;
    }
}

function advanceTrackingStage() {
    if (!activeOrderData) return;

    activeOrderData.statusStep = ((activeOrderData.statusStep || 0) + 1) % TRACKING_STAGES.length;
    localStorage.setItem('activeOrder', JSON.stringify(activeOrderData));
    updateTrackingUI();

    const stage = TRACKING_STAGES[activeOrderData.statusStep];
    showToast(`Status atualizado: ${stage.title}! 🍕`, 'info');
}

function renderOrderHistory() {
    const container = document.getElementById('historyListContainer');
    if (!container) return;

    let history = [];
    try {
        history = JSON.parse(localStorage.getItem('order_history')) || [];
    } catch (e) {
        history = [];
    }

    if (history.length === 0) {
        container.innerHTML = `
            <p style="font-size: 0.88rem; color: var(--dark-muted); text-align: center; padding: 1.5rem 0;">
                Você ainda não tem outros pedidos finalizados.
            </p>
        `;
        return;
    }

    container.innerHTML = history.map(item => `
        <div class="history-item">
            <div>
                <strong style="color: var(--dark);">Pedido #${item.orderId}</strong>
                <p style="font-size: 0.78rem; color: var(--dark-muted); margin: 0.1rem 0;">
                    ${item.date} • ${item.items ? item.items.length : 1} itens • ${item.paymentMethod}
                </p>
            </div>
            <div style="text-align: right;">
                <span style="font-weight: 800; color: var(--primary); display: block; font-size: 0.95rem;">
                    R$ ${(item.total || 0).toFixed(2).replace('.', ',')}
                </span>
                <button class="btn-secondary" style="padding: 0.25rem 0.65rem; font-size: 0.75rem; margin-top: 0.3rem;" onclick="reorderItems('${item.orderId}')">
                    Pedir Novamente
                </button>
            </div>
        </div>
    `).join('');
}

function reorderItems(orderId) {
    let history = [];
    try {
        history = JSON.parse(localStorage.getItem('order_history')) || [];
    } catch (e) {
        history = [];
    }

    const order = history.find(o => String(o.orderId) === String(orderId));
    if (order && order.items) {
        order.items.forEach(item => CartState.addItem(item));
        showToast('Itens adicionados ao seu carrinho atual!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html#cardapio';
        }, 1000);
    }
}
