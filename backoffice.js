const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTgxZjhhZDEyOTAwMTU4NzZiZTQiLCJpYXQiOjE3MzE2NjM5MDMsImV4cCI6MTczMjg3MzUwM30.MuuUYhzp0kBec_Y_oO1-My8l18Z2yJYVmoPXVGdYXV4";

const loadProducts = function () {
  fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  })
    .then((response) => response.json())
    .then((products) => {
      const productList = document.getElementById("productList");
      productList.innerHTML = "";

      products.forEach((product) => {
        const productItem = document.createElement("li");
        productItem.classList.add("list-group-item");
        productItem.classList.add("d-flex");
        productItem.classList.add("justify-content-between");
        productItem.classList.add("align-items-center");

        productItem.innerHTML = `
          <div>
            <strong>${product.name}</strong> - €${product.price} <br>
            <small>${product.description}</small>
          </div>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product._id}')"><i class="bi bi-trash"></i></button>
        `;

        productList.appendChild(productItem);
      });
    })
    .catch((error) =>
      console.error("Errore nel recupero dei prodotti:", error)
    );
};

const addProduct = function (event) {
  event.preventDefault();

  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDescription").value;
  const price = document.getElementById("productPrice").value;
  const brand = document.getElementById("productBrand").value;
  const imageUrl = document.getElementById("productImage").value;

  const newProduct = {
    name: name,
    description: description,
    price: parseFloat(price),
    brand: brand,
    imageUrl: imageUrl
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify(newProduct)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Prodotto aggiunto:", data);
      loadProducts();
    })
    .catch((error) =>
      console.error("Errore nell'aggiunta del prodotto:", error)
    );
};

const deleteProduct = function (productId) {
  fetch(`${API_URL}${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  })
    .then((response) => response.json())
    .then(() => {
      console.log("Prodotto eliminato");
      loadProducts();
    })
    .catch((error) =>
      console.error("Errore nell'eliminazione del prodotto:", error)
    );
};

document.addEventListener("DOMContentLoaded", function () {
  loadProducts();

  const form = document.getElementById("addProductForm");
  form.addEventListener("submit", addProduct);
});
