const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTgxZjhhZDEyOTAwMTU4NzZiZTQiLCJpYXQiOjE3MzE2NjM5MDMsImV4cCI6MTczMjg3MzUwM30.MuuUYhzp0kBec_Y_oO1-My8l18Z2yJYVmoPXVGdYXV4";

const fetchProducts = function () {
  fetch(API_URL, {
    method: "PUT",
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
