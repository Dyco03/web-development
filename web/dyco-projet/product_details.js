document.addEventListener("DOMContentLoaded", function() {
    // Récupération de l'ID du produit depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = getProductDetails(productId);

    // Affichage des détails du produit dans la page
    displayProductDetails(product);
});

function getProductDetails(productId) {
    return {
        id: productId,
        name: "Nom du produit",
        description: "Description du produit",
        price: 100, // Prix du produit
    };
}

function displayProductDetails(product) {
    // Sélection de l'élément où afficher les détails du produit
    const productDetailsDiv = document.getElementById('product-details');

    const html = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Prix: $${product.price}</p>
        <!-- Autres détails du produit... -->
    `;

    // Insertion du HTML dans l'élément
    productDetailsDiv.innerHTML = html;
}
