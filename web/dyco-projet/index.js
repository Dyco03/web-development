document.addEventListener("DOMContentLoaded", function() {
    // Chemin du fichier JSON
    const jsonFilePath = 'products.json';

    // Fonction pour charger les produits à partir du fichier JSON
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(products => {
            // Sélectionne le conteneur des produits
            const productContainer = document.getElementById('product-container');
            let i = 0;
            // Génère le HTML pour chaque produit
            products.forEach(product => {
                if(i==8){
                    return;
                }
                const productDiv = document.createElement('div');
                productDiv.classList.add('pro');

                // Génère les étoiles de notation
                const ratingStars = Array(product.rating).fill('<i class="fas fa-star"></i>').join('');

            // Structure HTML pour chaque produit
            productDiv.innerHTML = `
                <img src="${product.imgSrc}" alt="">
                <div class="des">
                    <span>${product.brand}</span>
                    <h5>${product.name}</h5>
                    <div class="star">${ratingStars}</div>
                    <h4>$${product.price}</h4>
                </div>
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.imgSrc}">Add to Cart</button>
            `;

            // Ajouter un événement de clic pour rediriger vers les détails du produit
            productDiv.addEventListener('click', () => {
                window.location.href = `product-details.html?id=${product.id}`;
            });
            // Ajouter des écouteurs d'événements pour les boutons "Add to Cart"
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });

                // Ajoute le produit au conteneur
                productContainer.appendChild(productDiv);
                i++;
            });
        });

            // Fonction pour ajouter un produit au panier
    function addToCart(event) {
        const button = event.target;
        // Empêcher l'événement de propagation pour éviter l'ouverture des détails du produit
        event.stopPropagation();
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        const productImg = button.getAttribute('data-img');

        // Créer un objet représentant le produit à ajouter au panier
        const cartItem = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            img: productImg,
            quantity: 1
        };

        // Récupérer le panier depuis le stockage local ou initialiser un nouveau panier
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            // Incrémenter la quantité si le produit est déjà dans le panier
            existingItem.quantity += 1;
        } else {
            // Ajouter le produit au panier s'il n'est pas déjà présent
            cart.push(cartItem);
        }

        // Mettre à jour le panier dans le stockage local
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} a été ajouté au panier.`);
    }

});
