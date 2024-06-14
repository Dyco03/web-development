document.addEventListener("DOMContentLoaded", function() {

    function displayProducts(products, page, itemsPerPage) {
        // ... Affichage des produits

        // Ajout d'un gestionnaire d'événements click pour chaque produit
        const productDivs = document.querySelectorAll('.pro');
        productDivs.forEach(productDiv => {
            productDiv.addEventListener('click', function() {
                // Récupération de l'ID du produit à partir de l'attribut data-id
                const productId = productDiv.getAttribute('data-id');
                // Redirection vers la page des détails du produit avec l'ID en paramètre
                window.location.href = `product_details.html?id=${productId}`;
            });
        });
    }

});
