const params = new URLSearchParams(window.location.search);
const categoria = params.get('cat');
const checkout = params.get('checkout');

const produtos = {
    caixa: [
        { nome: "Caixa Ludwig Black Magic", preco: "1.450", img: "img/acro.png" },
        { nome: "Caixa PDP Wood Dark", preco: "980", img: "img/pdp.png" },
        { nome: "Caixa Bauer Pro Shell", preco: "1.150", img: "img/bauer.png" }
    ],
    bateria: [
        { nome: "DW Performance Series", preco: "16.500", img: "img/bateria DW.png" },
        { nome: "Michael Audition Black", preco: "3.100", img: "img/bateria michael.png" },
        { nome: "Pearl Roadshow Jet", preco: "7.900", img: "img/bateria pearl.png" }
    ],
    prato: [
        { nome: "Set Zildjian Dark K", preco: "4.800", img: "img/prato zildjian.png" },
        { nome: "Set Sabian HHX", preco: "3.200", img: "img/prato brabo cymbals.png" },
        { nome: "Set Meinl Classics", preco: "2.900", img: "img/prato domene.png" }
    ]
};

// Função para disparar a nova aba de pagamento
function irParaPagamento(nome, preco) {
    localStorage.setItem('prod_nome', nome);
    localStorage.setItem('prod_preco', preco);
    window.open('?checkout=true', '_blank');
}

// Controle de visualização das telas
if (checkout) {
    document.getElementById('view-categories').classList.add('hidden');
    document.getElementById('view-checkout').classList.remove('hidden');
    
    const nome = localStorage.getItem('prod_nome');
    const preco = localStorage.getItem('prod_preco');
    
    document.getElementById('order-summary').innerHTML = `
        <p style="color: #888; font-size: 14px;">Você está adquirindo:</p>
        <p><strong>${nome}</strong></p>
        <p style="font-size: 24px; color: #0055ff; margin-top:10px;"><strong>R$ ${preco},00</strong></p>
    `;

    // Evento de confirmação de pagamento
    document.getElementById('btn-confirm-pay').addEventListener('click', () => {
        alert('Pagamento Processado com Sucesso!');
        window.close();
    });

} else if (categoria && produtos[categoria]) {
    document.getElementById('view-categories').classList.add('hidden');
    document.getElementById('view-catalog').classList.remove('hidden');
    document.getElementById('catalog-title').innerText = "CATÁLOGO DE " + categoria.toUpperCase();

    const grid = document.getElementById('catalog-grid');
    produtos[categoria].forEach(p => {
        const item = document.createElement('div');
        item.className = 'item-card';
        item.innerHTML = `
            <div class="display-image" style="background-image: url('${p.img}');"></div>
            <h3>${p.nome}</h3>
            <p style="margin: 15px 0; color: #0055ff; font-size: 20px;"><strong>R$ ${p.preco},00</strong></p>
            <button class="btn btn-comprar" style="width:100%">COMPRAR AGORA</button>
        `;
        
        // Adiciona evento de clique no botão dinâmico
        item.querySelector('.btn-comprar').onclick = () => irParaPagamento(p.nome, p.preco);
        grid.appendChild(item);
    });
}