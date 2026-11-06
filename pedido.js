/**
 * TIA FATIA - Lógica da Página de Pedido (pedido.html)
 * Renderiza o resumo detalhado das fatias, permite alterar quantidades,
 * limpar o pedido e adicionar sabores rápidos.
 */

document.addEventListener('DOMContentLoaded', () => {
    renderOrderPage();
    renderQuickAddProducts();
});

function renderOrderPage() {
    const list = document.getElementById('orderPageItemsList');
    const totalEl = document.getElementById('orderPageTotalAmount');
    if (!list || !totalEl) return;

    const cart = CartState.getCart();

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="cart-empty-state" style="padding: 3rem 1rem;">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <h3>Nenhum item no seu pedido ainda</h3>
                <p>Navegue pelo nosso cardápio e adicione suas fatias preferidas!</p>
                <a href="index.html#cardapio" class="btn-primary" style="margin-top: 1rem;">
                    Explorar Cardápio
                </a>
            </div>
        `;
        totalEl.textContent = 'R$ 0,00';
        return;
    }

    let grandTotal = 0;

    list.innerHTML = cart.map((item, index) => {
        const unit = item.price + (item.borderPrice || 0) + (item.additionalsPrice || 0);
        const itemTotal = unit * item.quantity;
        grandTotal += itemTotal;

        const details = [];
        if (item.border && !item.border.includes('Sem Borda')) details.push(`Borda: ${item.border}`);
        if (item.additionals && item.additionals.length > 0) details.push(`Extras: ${item.additionals.join(', ')}`);
        if (item.sauce && !item.sauce.includes('Sem Molho')) details.push(`Molho: ${item.sauce}`);
        if (item.notes) details.push(`Obs: "${item.notes}"`);

        return `
            <div class="table-item-row">
                <div class="table-item-left">
                    <img src="${item.image}" alt="${item.name}" class="table-item-img">
                    <div>
                        <h4 class="table-item-title">${item.name}</h4>
                        <p class="table-item-details">${details.length > 0 ? details.join(' • ') : 'Tradicional sem adicionais'}</p>
                    </div>
                </div>

                <div class="table-item-right">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="CartState.updateQuantity(${index}, -1)">-</button>
                        <span class="qty-number">${item.quantity}</span>
                        <button class="qty-btn" onclick="CartState.updateQuantity(${index}, 1)">+</button>
                    </div>

                    <div class="table-item-price">
                        R$ ${itemTotal.toFixed(2).replace('.', ',')}
                    </div>

                    <button class="cart-item-remove" style="position: static;" onclick="CartState.removeItem(${index})" title="Remover item">
                        ✕
                    </button>
                </div>
            </div>
        `;
    }).join('');

    totalEl.textContent = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;
}

function renderQuickAddProducts() {
    const quickGrid = document.getElementById('quickAddGrid');
    if (!quickGrid) return;

    // Sugestões populares
    const quickItems = PRODUCTS_DATA.slice(0, 4);

    quickGrid.innerHTML = quickItems.map(p => `
        <div class="quick-card">
            <img src="${p.image}" alt="${p.name}">
            <h4>${p.name}</h4>
            <span>R$ ${p.price.toFixed(2).replace('.', ',')}</span>
            <button class="btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; width: 100%;" onclick="openProductCustomModal('${p.id}')">
                + Personalizar
            </button>
        </div>
    `).join('');
}
