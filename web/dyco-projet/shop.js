document.addEventListener("DOMContentLoaded", function() {
    // Variable pour suivre la page actuelle
    let currentPage = 1;
    // Nombre d'articles par page
    const itemsPerPage = 8;
    // Variable pour stocker les produits
    let products = [];

    // Chargement des produits depuis le fichier JSON et affichage initial
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            products = data;
            const totalPages = Math.ceil(products.length / itemsPerPage);
            displayProducts(products, currentPage, itemsPerPage);
            setupPagination(totalPages);
            updateCartCount(); // Appeler la fonction pour mettre à jour le compteur au chargement de la page
        });

    // Fonction pour afficher les produits d'une page spécifique
    function displayProducts(products, page, itemsPerPage) {
        const productContainer = document.getElementById('product-container');
        // Effacer le contenu précédent du conteneur des produits
        productContainer.innerHTML = '';

        // Calculer les indices de début et de fin pour la pagination
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, products.length);
        // Sélectionner les produits pour la page actuelle
        const paginatedProducts = products.slice(startIndex, endIndex);

        // Afficher chaque produit
        paginatedProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('pro');

            // Générer les étoiles de notation
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

            // Ajouter le produit au conteneur
            productContainer.appendChild(productDiv);
        });

        // Ajouter des écouteurs d'événements pour les boutons "Add to Cart"
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Événement pour la recherche de produits
    const searchButton = document.getElementById('search');
    searchButton.addEventListener('click', function() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
        currentPage = 1;
        displayProducts(filteredProducts, currentPage, itemsPerPage);
        setupPagination(Math.ceil(filteredProducts.length / itemsPerPage), filteredProducts);
    });

    // Fonction pour configurer la pagination
    function setupPagination(totalPages, currentProducts) {
        const paginationContainer = document.getElementById('pagination');
        // Effacer le contenu précédent du conteneur de pagination
        paginationContainer.innerHTML = '';

        // Créer des liens pour chaque page
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = "#";
            pageLink.innerText = i;
            // Ajouter un événement de clic pour chaque lien de page
            pageLink.addEventListener('click', function(event) {
                event.preventDefault();
                currentPage = i;
                if (currentProducts) {
                    displayProducts(currentProducts, currentPage, itemsPerPage);
                } else {
                    displayProducts(products, currentPage, itemsPerPage);
                }
            });

            // Ajouter le lien au conteneur de pagination
            paginationContainer.appendChild(pageLink);
        }
    }

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
        
        // Mise à jour du compteur de produits
        updateCartCount();
    }

    // Fonction pour mettre à jour le compteur de produits dans le panier
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').innerText = cartCount;
    }

    // Appel initial pour mettre à jour le compteur au chargement de la page
    updateCartCount();
});
