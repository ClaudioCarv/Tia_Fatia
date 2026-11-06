/**
 * TIA FATIA - MOTOR JAVASCRIPT PRINCIPAL (v2.0)
 * Gerenciamento de Produtos, Customização, Carrinho Reativo,
 * Drawer Lateral, Cupons, ViaCEP, Pedido WhatsApp e Acompanhamento
 */

// Catálogo Oficial dos Produtos com Fotos Locais
const PRODUCTS_DATA = [
    // Salgados
    {
        id: 'calabresa',
        name: 'Fatia de Calabresa',
        category: 'salgadas',
        categoryLabel: 'Pizza Salgada',
        price: 5.99,
        image: 'img/fatia_calabresa.png',
        badge: 'Mais Vendida 🔥',
        desc: 'Massa artesanal fininha, molho de tomate rústico, queijo mussarela derretido, fatias crocantes de calabresa e cebola fresca.',
        isPizza: true
    },
    {
        id: 'marguerita',
        name: 'Fatia Marguerita Especial',
        category: 'salgadas',
        categoryLabel: 'Pizza Salgada',
        price: 6.50,
        image: 'img/fatia_marguerita.png',
        badge: 'Favorita 🌿',
        desc: 'Tradicional italiana com queijo mussarela especial, rodelas suculentas de tomate fresco, azeite extra virgem e folhas de manjericão colhidas no dia.',
        isPizza: true
    },
    {
        id: 'queijo',
        name: 'Fatia 3 Queijos',
        category: 'salgadas',
        categoryLabel: 'Pizza Salgada',
        price: 6.25,
        image: 'img/fatia_queijo.png',
        badge: 'Cremosa 🧀',
        desc: 'Blend delicioso de queijo mussarela premium, provolone defumado e toque especial de queijo parmesão ralado na hora com orégano.',
        isPizza: true
    },

    // Doces
    {
        id: 'chocolate',
        name: 'Fatia Brigadeiro Gourmet',
        category: 'doces',
        categoryLabel: 'Pizza Doce',
        price: 8.95,
        image: 'img/fatia_doce_chocolate.png',
        badge: 'Doce 🍫',
        desc: 'Camada generosa de brigadeiro gourmet de panela com chocolate nobre e chuva crocante de granulados artesanais.',
        isPizza: true
    },
    {
        id: 'morango',
        name: 'Fatia Sensação de Morango',
        category: 'doces',
        categoryLabel: 'Pizza Doce',
        price: 10.25,
        image: 'img/fatia_doce_morango.jpg',
        badge: 'Especial 🍓',
        desc: 'Creme aveludado de chocolate ao leite coberto com morangos frescos fatiados e riscas de chocolate branco.',
        isPizza: true
    },
    {
        id: 'romeu',
        name: 'Fatia Romeu e Julieta',
        category: 'doces',
        categoryLabel: 'Pizza Doce',
        price: 9.50,
        image: 'img/fatia_doce_romeu.png',
        badge: 'Clássico 🧀',
        desc: 'O autêntico contraste brasileiro: queijo minas especial derretido harmonizado com goiabada cascão cremosa e quentinha.',
        isPizza: true
    },

    // Combos
    {
        id: 'combo-2salg-refri',
        name: 'Combo 2 Salgadas + Bebida',
        category: 'combos',
        categoryLabel: 'Combo Promocional',
        price: 14.90,
        image: 'img/combos_fundo.png',
        badge: 'Combo Campeão ⭐',
        desc: 'Escolha 2 fatias salgadas quentinhas + 1 Refrigerante gelado da sua escolha. Ideal para um lanche rápido e reforçado!',
        isPizza: false
    },
    {
        id: 'combo-festival',
        name: 'Combo Festival: 2 Doces + 1 Salgado + Suco',
        category: 'combos',
        categoryLabel: 'Super Combo',
        price: 22.00,
        image: 'img/combos_fundo.png',
        badge: 'Completo ⭐',
        desc: 'O combo perfeito para dividir: 2 fatias doces, 1 fatia salgada crocante e 1 garrafinha de suco natural.',
        isPizza: false
    },
    {
        id: 'combo-doce-bebida',
        name: 'Combo Doce Momento: 1 Doce + Bebida',
        category: 'combos',
        categoryLabel: 'Combo Individual',
        price: 12.00,
        image: 'img/combos_fundo.png',
        badge: 'Econômico ⭐',
        desc: 'Para matar aquela vontade de doce: 1 fatia doce à sua escolha + 1 refrigerante ou suco natural.',
        isPizza: false
    },

    // Bebidas
    {
        id: 'refri',
        name: 'Refrigerante Lata 350ml',
        category: 'bebidas',
        categoryLabel: 'Bebida Gelada',
        price: 5.00,
        image: 'img/copo_refrigerante.png',
        badge: 'Refrescante 🥤',
        desc: 'Servido trincando de gelado! Coca-Cola, Guaraná Antarctica ou Fanta Laranja. Acompanha copo com gelo e limão.',
        isPizza: false
    },
    {
        id: 'suco-natural',
        name: 'Suco Natural da Fruta 400ml',
        category: 'bebidas',
        categoryLabel: 'Bebida Natural',
        price: 7.00,
        image: 'img/Sucos_naturais.png',
        badge: 'Natural 🍊',
        desc: 'Feito com frutas frescas na hora: Laranja pura, Maracujá refrescante ou Abacaxi com hortelã.',
        isPizza: false
    },
    {
        id: 'vinho',
        name: 'Vinho Tinto da Casa',
        category: 'bebidas',
        categoryLabel: 'Carta de Vinhos',
        price: 45.00,
        image: 'img/vinho.png',
        badge: 'Seleção Especial 🍷',
        desc: 'Garrafa selecionada especialmente para acompanhar nossas massas artesanais. Sabor suave e aroma marcante.',
        isPizza: false
    }
];

// Opções de Customização
const BORDER_OPTIONS = [
    { id: 'nenhuma', name: 'Massa Tradicional (Sem Borda)', price: 0 },
    { id: 'catupiry', name: 'Borda Catupiry Original', price: 2.50 },
    { id: 'cheddar', name: 'Borda Cheddar Cremoso', price: 2.50 },
    { id: 'alpino', name: 'Borda Vulcão Chocolate Alpino', price: 3.50 }
];

const ADDITIONAL_OPTIONS = [
    { id: 'bacon', name: 'Bacon Crocante em Cubos', price: 2.50 },
    { id: 'parmesao', name: 'Queijo Parmesão Ralado', price: 2.00 },
    { id: 'pesto', name: 'Molho Pesto Artesanal', price: 2.50 },
    { id: 'azeitona', name: 'Azeitonas Pretas Fatiadas', price: 1.50 },
    { id: 'manjericao', name: 'Manjericão Fresco Orgânico', price: 0.00 },
    { id: 'alho', name: 'Alho Dourado Crocante', price: 1.50 }
];

const SAUCE_OPTIONS = [
    { id: 'maionese-casa', name: 'Maionese Verde da Tia Fatia (Cortesia)' },
    { id: 'pimenta', name: 'Geleia de Pimenta Defumada (Cortesia)' },
    { id: 'barbecue', name: 'Molho Barbecue Especial (Cortesia)' },
    { id: 'sem-molho', name: 'Sem Molho' }
];

// Cupons de Desconto Válidos
const VALID_COUPONS = {
    'TIAFATIA10': { type: 'percent', value: 10, label: '10% de desconto' },
    'PRIMEIRACOMPRA': { type: 'fixed', value: 5.00, label: 'R$ 5,00 OFF' },
    'FRETEGRATIS': { type: 'free_shipping', value: 0, label: 'Frete Grátis' }
};

/* ==========================================================================
   GERENCIADOR DE ESTADO DO CARRINHO (LocalStorage)
   ========================================================================== */
const CartState = {
    getCart() {
        try {
            const raw = localStorage.getItem('tia_fatia_cart');
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error('Erro ao ler carrinho:', e);
            return [];
        }
    },

    saveCart(cart) {
        try {
            localStorage.setItem('tia_fatia_cart', JSON.stringify(cart));
            // Mantém compatibilidade com scripts legados
            localStorage.setItem('cart', JSON.stringify(cart));
            this.notifyChange();
        } catch (e) {
            console.error('Erro ao salvar carrinho:', e);
        }
    },

    addItem(item) {
        const cart = this.getCart();
        // Verifica se já existe um item com a mesma configuração exata
        const existingIndex = cart.findIndex(c => 
            c.id === item.id &&
            c.border === item.border &&
            c.sauce === item.sauce &&
            JSON.stringify(c.additionals || []) === JSON.stringify(item.additionals || []) &&
            (c.notes || '') === (item.notes || '')
        );

        if (existingIndex > -1) {
            cart[existingIndex].quantity += item.quantity;
        } else {
            cart.push(item);
        }

        this.saveCart(cart);
        showToast(`"${item.name}" adicionado ao pedido! 🍕`, 'success');
        this.animateBadge();
    },

    updateQuantity(index, delta) {
        const cart = this.getCart();
        if (!cart[index]) return;

        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
            showToast('Item removido do pedido.', 'warning');
        }

        this.saveCart(cart);
        renderCartDrawer();
        if (typeof renderCheckoutPage === 'function') renderCheckoutPage();
        if (typeof renderOrderPage === 'function') renderOrderPage();
    },

    removeItem(index) {
        const cart = this.getCart();
        if (cart[index]) {
            const name = cart[index].name;
            cart.splice(index, 1);
            this.saveCart(cart);
            showToast(`"${name}" removido do pedido.`, 'warning');
            renderCartDrawer();
            if (typeof renderCheckoutPage === 'function') renderCheckoutPage();
            if (typeof renderOrderPage === 'function') renderOrderPage();
        }
    },

    clear() {
        this.saveCart([]);
        renderCartDrawer();
        if (typeof renderCheckoutPage === 'function') renderCheckoutPage();
        if (typeof renderOrderPage === 'function') renderOrderPage();
        showToast('Pedido limpo com sucesso.', 'info');
    },

    getTotalCount() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    getTotals(appliedCoupon = null, isDelivery = true) {
        const cart = this.getCart();
        let subtotal = 0;

        cart.forEach(item => {
            let unitPrice = item.price;
            if (item.borderPrice) unitPrice += item.borderPrice;
            if (item.additionalsPrice) unitPrice += item.additionalsPrice;
            subtotal += unitPrice * item.quantity;
        });

        // Frete Grátis acima de R$ 35,00 ou cupom
        let shipping = isDelivery ? 5.00 : 0.00;
        if (subtotal >= 35.00 && isDelivery) {
            shipping = 0.00;
        }

        let discount = 0;
        if (appliedCoupon && VALID_COUPONS[appliedCoupon]) {
            const c = VALID_COUPONS[appliedCoupon];
            if (c.type === 'percent') {
                discount = (subtotal * c.value) / 100;
            } else if (c.type === 'fixed') {
                discount = Math.min(c.value, subtotal);
            } else if (c.type === 'free_shipping') {
                shipping = 0.00;
            }
        }

        const total = Math.max(0, subtotal - discount + shipping);

        return {
            subtotal,
            shipping,
            discount,
            total,
            freeShippingThreshold: 35.00,
            freeShippingMissing: Math.max(0, 35.00 - subtotal)
        };
    },

    notifyChange() {
        const count = this.getTotalCount();
        document.querySelectorAll('.cart-badge, .mobile-cart-badge').forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    animateBadge() {
        document.querySelectorAll('.cart-badge, .mobile-cart-badge').forEach(badge => {
            badge.classList.remove('pop-anim');
            void badge.offsetWidth; // Reflow
            badge.classList.add('pop-anim');
        });
    }
};

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '🍕';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';
    if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `
        <span style="font-size: 1.2rem;">${icon}</span>
        <span style="flex: 1;">${message}</span>
        <button style="color: #999; font-size: 1.1rem; line-height: 1;" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* ==========================================================================
   RENDERIZAÇÃO DO CARDÁPIO & FILTROS (Home / index.html)
   ========================================================================== */
function initMenu() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    let currentCategory = 'todos';
    let searchQuery = '';

    function renderProducts() {
        const filtered = PRODUCTS_DATA.filter(prod => {
            const matchesCat = currentCategory === 'todos' || prod.category === currentCategory;
            const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  prod.desc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <h3>Nenhum sabor encontrado</h3>
                    <p>Tente buscar por outro termo ou selecione outra categoria.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(prod => `
            <div class="product-card" data-id="${prod.id}">
                ${prod.badge ? `<span class="product-badge ${prod.category}">${prod.badge}</span>` : ''}
                <div class="product-img-wrap">
                    <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy">
                </div>
                <div class="product-info">
                    <span class="product-category">${prod.categoryLabel}</span>
                    <h3 class="product-name">${prod.name}</h3>
                    <p class="product-desc">${prod.desc}</p>
                    <div class="product-footer">
                        <div class="product-price-box">
                            <small>A partir de</small>
                            <span class="product-price">R$ ${prod.price.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <button class="btn-add-product" onclick="openProductCustomModal('${prod.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Eventos de Categorias
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });

    // Busca em tempo real
    const searchInput = document.getElementById('searchMenuInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderProducts();
        });
    }

    renderProducts();
}

/* ==========================================================================
   MODAL DE CUSTOMIZAÇÃO DO PRODUTO (Borda, Adicionais, Quantidade)
   ========================================================================== */
let activeCustomProduct = null;
let customQuantity = 1;
let selectedBorder = BORDER_OPTIONS[0];
let selectedAdditionals = [];
let selectedSauce = SAUCE_OPTIONS[0];

function openProductCustomModal(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    activeCustomProduct = product;
    customQuantity = 1;
    selectedBorder = BORDER_OPTIONS[0];
    selectedAdditionals = [];
    selectedSauce = SAUCE_OPTIONS[0];

    const overlay = document.getElementById('productModalOverlay');
    if (!overlay) return;

    // Atualiza cabeçalho do produto no modal
    document.getElementById('modalProductImg').src = product.image;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDesc').textContent = product.desc;
    document.getElementById('modalBasePrice').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;

    // Mostra/Oculta customizações se for pizza ou bebida
    const pizzaCustomFields = document.getElementById('pizzaCustomFields');
    if (pizzaCustomFields) {
        pizzaCustomFields.style.display = product.isPizza ? 'block' : 'none';
    }

    // Renderiza Opções de Borda
    const borderContainer = document.getElementById('borderOptionsList');
    if (borderContainer) {
        borderContainer.innerHTML = BORDER_OPTIONS.map((b, idx) => `
            <div class="option-item ${idx === 0 ? 'selected' : ''}" onclick="selectBorderOption(${idx})">
                <div class="option-left">
                    <div class="option-radio"></div>
                    <span>${b.name}</span>
                </div>
                <span class="option-price">${b.price > 0 ? `+ R$ ${b.price.toFixed(2).replace('.', ',')}` : 'Grátis'}</span>
            </div>
        `).join('');
    }

    // Renderiza Opções de Adicionais
    const addsContainer = document.getElementById('additionalsOptionsList');
    if (addsContainer) {
        addsContainer.innerHTML = ADDITIONAL_OPTIONS.map((add, idx) => `
            <div class="option-item" onclick="toggleAdditionalOption(${idx}, this)">
                <div class="option-left">
                    <div class="option-check">✓</div>
                    <span>${add.name}</span>
                </div>
                <span class="option-price">${add.price > 0 ? `+ R$ ${add.price.toFixed(2).replace('.', ',')}` : 'Grátis'}</span>
            </div>
        `).join('');
    }

    // Renderiza Molhos
    const sauceContainer = document.getElementById('sauceOptionsList');
    if (sauceContainer) {
        sauceContainer.innerHTML = SAUCE_OPTIONS.map((s, idx) => `
            <div class="option-item ${idx === 0 ? 'selected' : ''}" onclick="selectSauceOption(${idx})">
                <div class="option-left">
                    <div class="option-radio"></div>
                    <span>${s.name}</span>
                </div>
                <span class="option-price">Grátis</span>
            </div>
        `).join('');
    }

    // Limpa campo de observações
    const notesInput = document.getElementById('modalNotes');
    if (notesInput) notesInput.value = '';

    updateModalTotal();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProductCustomModal() {
    const overlay = document.getElementById('productModalOverlay');
    if (overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

function selectBorderOption(index) {
    selectedBorder = BORDER_OPTIONS[index];
    document.querySelectorAll('#borderOptionsList .option-item').forEach((el, i) => {
        el.classList.toggle('selected', i === index);
    });
    updateModalTotal();
}

function toggleAdditionalOption(index, element) {
    const add = ADDITIONAL_OPTIONS[index];
    const exists = selectedAdditionals.find(a => a.id === add.id);

    if (exists) {
        selectedAdditionals = selectedAdditionals.filter(a => a.id !== add.id);
        element.classList.remove('selected');
    } else {
        selectedAdditionals.push(add);
        element.classList.add('selected');
    }

    updateModalTotal();
}

function selectSauceOption(index) {
    selectedSauce = SAUCE_OPTIONS[index];
    document.querySelectorAll('#sauceOptionsList .option-item').forEach((el, i) => {
        el.classList.toggle('selected', i === index);
    });
}

function changeCustomQty(delta) {
    customQuantity = Math.max(1, customQuantity + delta);
    const qtyEl = document.getElementById('modalCustomQty');
    if (qtyEl) qtyEl.textContent = customQuantity;
    updateModalTotal();
}

function updateModalTotal() {
    if (!activeCustomProduct) return;

    let unit = activeCustomProduct.price;
    if (activeCustomProduct.isPizza) {
        if (selectedBorder) unit += selectedBorder.price;
        selectedAdditionals.forEach(a => unit += a.price);
    }

    const total = unit * customQuantity;
    const btnText = document.getElementById('modalAddBtnPrice');
    if (btnText) {
        btnText.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

function confirmAddCustomProduct() {
    if (!activeCustomProduct) return;

    const notes = document.getElementById('modalNotes') ? document.getElementById('modalNotes').value.trim() : '';

    let addsPrice = 0;
    selectedAdditionals.forEach(a => addsPrice += a.price);

    const cartItem = {
        id: activeCustomProduct.id,
        name: activeCustomProduct.name,
        category: activeCustomProduct.category,
        image: activeCustomProduct.image,
        price: activeCustomProduct.price,
        quantity: customQuantity,
        border: activeCustomProduct.isPizza ? selectedBorder.name : null,
        borderPrice: activeCustomProduct.isPizza ? selectedBorder.price : 0,
        additionals: activeCustomProduct.isPizza ? selectedAdditionals.map(a => a.name) : [],
        additionalsPrice: activeCustomProduct.isPizza ? addsPrice : 0,
        sauce: activeCustomProduct.isPizza ? selectedSauce.name : null,
        notes: notes
    };

    CartState.addItem(cartItem);
    closeProductCustomModal();
    renderCartDrawer();
}

/* ==========================================================================
   DRAWER LATERAL DO CARRINHO (CART DRAWER)
   ========================================================================== */
function toggleCartDrawer() {
    const overlay = document.getElementById('cartDrawerOverlay');
    if (!overlay) return;

    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
        overlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    } else {
        renderCartDrawer();
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function renderCartDrawer() {
    const list = document.getElementById('drawerCartItems');
    if (!list) return;

    const cart = CartState.getCart();
    const totals = CartState.getTotals(null, true);

    // Barra de Frete Grátis
    const freeShippingText = document.getElementById('drawerFreeShippingText');
    const freeShippingFill = document.getElementById('drawerFreeShippingFill');
    if (freeShippingText && freeShippingFill) {
        if (totals.subtotal >= totals.freeShippingThreshold) {
            freeShippingText.innerHTML = '🎉 Parabéns! Você ganhou <strong>Frete Grátis</strong>!';
            freeShippingFill.style.width = '100%';
        } else {
            const percent = Math.min(100, (totals.subtotal / totals.freeShippingThreshold) * 100);
            freeShippingText.innerHTML = `Faltam <strong>R$ ${totals.freeShippingMissing.toFixed(2).replace('.', ',')}</strong> para Frete Grátis!`;
            freeShippingFill.style.width = `${percent}%`;
        }
    }

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="cart-empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <h3>Seu carrinho está vazio</h3>
                <p>Que tal escolher uma fatia deliciosa para começar?</p>
                <button class="btn-primary" style="margin-top: 1rem;" onclick="toggleCartDrawer()">Ver Cardápio</button>
            </div>
        `;

        document.getElementById('drawerSubtotal').textContent = 'R$ 0,00';
        document.getElementById('drawerTotal').textContent = 'R$ 0,00';
        return;
    }

    list.innerHTML = cart.map((item, index) => {
        let unitTotal = item.price + (item.borderPrice || 0) + (item.additionalsPrice || 0);
        let itemTotal = unitTotal * item.quantity;

        let customsText = [];
        if (item.border && !item.border.includes('Sem Borda')) customsText.push(`Borda: ${item.border}`);
        if (item.additionals && item.additionals.length > 0) customsText.push(`Extras: ${item.additionals.join(', ')}`);
        if (item.sauce && !item.sauce.includes('Sem Molho')) customsText.push(`Molho: ${item.sauce}`);

        return `
            <div class="cart-item-card">
                <button class="cart-item-remove" onclick="CartState.removeItem(${index})" title="Remover item">✕</button>
                <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    ${customsText.length > 0 ? `<p class="cart-item-customs">${customsText.join(' • ')}</p>` : ''}
                    <div class="cart-item-row">
                        <div class="qty-control" style="transform: scale(0.85); transform-origin: left center;">
                            <button class="qty-btn" onclick="CartState.updateQuantity(${index}, -1)">-</button>
                            <span class="qty-number">${item.quantity}</span>
                            <button class="qty-btn" onclick="CartState.updateQuantity(${index}, 1)">+</button>
                        </div>
                        <span class="cart-item-price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('drawerSubtotal').textContent = `R$ ${totals.subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('drawerTotal').textContent = `R$ ${totals.total.toFixed(2).replace('.', ',')}`;
}

/* ==========================================================================
   INTEGRAÇÃO VIACEP (Preenchimento Automático de Endereço)
   ========================================================================== */
async function buscarCep(inputCep) {
    const cep = inputCep.replace(/\D/g, '');
    if (cep.length !== 8) {
        showToast('CEP inválido. Digite os 8 números.', 'warning');
        return;
    }

    showToast('Buscando endereço...', 'info');

    try {
        const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await resp.json();

        if (data.erro) {
            showToast('CEP não encontrado.', 'warning');
            return;
        }

        const streetInput = document.getElementById('street');
        const neighInput = document.getElementById('neighborhood');
        const cityInput = document.getElementById('city');
        const numInput = document.getElementById('number');

        if (streetInput) streetInput.value = data.logradouro || '';
        if (neighInput) neighInput.value = data.bairro || '';
        if (cityInput) cityInput.value = `${data.localidade || ''} - ${data.uf || ''}`;

        if (numInput) numInput.focus();
        showToast('Endereço carregado com sucesso!', 'success');
    } catch (e) {
        console.error('Erro ViaCEP:', e);
        showToast('Erro ao consultar CEP. Preencha manualmente.', 'warning');
    }
}

/* ==========================================================================
   USUÁRIO ATUAL & LOGIN HELPERS
   ========================================================================== */
function getCurrentUser() {
    try {
        const raw = localStorage.getItem('user_session') || localStorage.getItem('user');
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

function updateNavUserUI() {
    const user = getCurrentUser();
    const btnUser = document.getElementById('navUserBtn');
    if (!btnUser) return;

    if (user && user.emailOrPhone) {
        const displayName = user.name || user.emailOrPhone.split('@')[0];
        btnUser.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Olá, ${displayName}</span>
        `;
        btnUser.href = 'entregas.html';
    } else {
        btnUser.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Entrar</span>
        `;
        btnUser.href = 'login.html';
    }
}

/* ==========================================================================
   WHATSAPP ORDER MESSAGE GENERATOR
   ========================================================================== */
function sendWhatsAppOrder(orderDetails) {
    const phone = '5583999999999'; // Número da pizzaria Tia Fatia
    
    let text = `*🍕 NOVO PEDIDO - TIA FATIA # ${orderDetails.orderId}*\n\n`;
    text += `*Cliente:* ${orderDetails.customerName || 'Cliente'}\n`;
    text += `*Tipo:* ${orderDetails.isDelivery ? '🛵 Entrega em Domicílio' : '🏪 Retirada no Balcão'}\n`;
    
    if (orderDetails.isDelivery) {
        text += `*Endereço:* ${orderDetails.address}\n`;
    }
    
    text += `*Pagamento:* ${orderDetails.paymentMethod}\n\n`;
    text += `*ITENS DO PEDIDO:*\n`;
    
    orderDetails.items.forEach(item => {
        text += `▪ ${item.quantity}x *${item.name}* (R$ ${(item.price * item.quantity).toFixed(2)})\n`;
        if (item.border && !item.border.includes('Sem Borda')) text += `   - Borda: ${item.border}\n`;
        if (item.additionals && item.additionals.length > 0) text += `   - Extras: ${item.additionals.join(', ')}\n`;
        if (item.notes) text += `   - Obs: ${item.notes}\n`;
    });

    text += `\n*Subtotal:* R$ ${orderDetails.subtotal.toFixed(2)}`;
    if (orderDetails.discount > 0) text += `\n*Desconto:* -R$ ${orderDetails.discount.toFixed(2)}`;
    if (orderDetails.shipping > 0) text += `\n*Taxa de Entrega:* R$ ${orderDetails.shipping.toFixed(2)}`;
    text += `\n*TOTAL:* *R$ ${orderDetails.total.toFixed(2)}*\n\n`;
    text += `_Pedido gerado via Cardápio Digital Tia Fatia_`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`, '_blank');
}

/* ==========================================================================
   INICIALIZAÇÃO GLOBAL DOM
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza contadores do carrinho
    CartState.notifyChange();
    updateNavUserUI();

    // Inicia cardápio se estiver na home
    initMenu();

    // Efeito de scroll na navbar
    const headerNav = document.querySelector('.header-nav');
    if (headerNav) {
        window.addEventListener('scroll', () => {
            headerNav.classList.toggle('scrolled', window.scrollY > 20);
        });
    }

    // Fecha modais com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductCustomModal();
            const drawer = document.getElementById('cartDrawerOverlay');
            if (drawer && drawer.classList.contains('open')) toggleCartDrawer();
        }
    });
});

