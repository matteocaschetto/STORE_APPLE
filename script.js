const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTgxZjhhZDEyOTAwMTU4NzZiZTQiLCJpYXQiOjE3MzE2NjM5MDMsImV4cCI6MTczMjg3MzUwM30.MuuUYhzp0kBec_Y_oO1-My8l18Z2yJYVmoPXVGdYXV4";

const fetchProducts = function () {
  fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dati: " + response.status);
      }
    })
    .then(function (data) {
      renderProducts(data);
    })
    .catch(function (error) {
      console.error("Si è verificato un errore:", error);
    });
};

const renderProducts = function (products) {
  let productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach(function (product) {
    let cardTemplate = `
      <div class="col-md-4 col-sm-6 bg-white  col align-self-end rounded-1">
        <div class="m-3">
          <img src="${product.imageUrl}" class="p-3" style="width:100%" alt="${product.name}">
          <div class="card-body bg-light text-center p-1 rounded-3 ">
            <h5 class="card-title ">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="price">€${product.price}</p>
            <div class="btn-group mb-3">
            <a class="btn btn-sm btn-outline-primary hide-btn" href="./details.html?prodId=${product._id}">Details</a>
            <a class="btn btn-sm btn-outline-primary hide-btn" href="./backoffice.html?prodId=${product._id}">Modifica</a>

                    
                </div>
          </div>
        </div>
      </div>
    `;
    productList.innerHTML += cardTemplate;
  });
};

window.onload = function () {
  fetchProducts();
};
