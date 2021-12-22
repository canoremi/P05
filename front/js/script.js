section();

function section() {
  getArticles();
}

// Récupérer les articles depuis l'API
function getArticles() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      return res.json();
    })
    .catch((error) => {
      let items = document.querySelector(".items");
      items.innerHTML =
        "Nous n'avons pas réussi à afficher nos canapés.";
    })
    //distribution des données de chaque produit
    .then(function (resultatAPI) {
        const articles = resultatAPI;
        console.log(articles);
        for (let article in articles){
            let link = document.createElement("a");
            items.appendChild(link);
            link.href = `product.html?id=${resultatAPI[article]._id}`;

            let card = document.createElement("article");
            link.appendChild(card);

            let images = document.createElement("img");
            card.appendChild(images);
            images.src = resultatAPI[article].imageUrl;
            images.alt = resultatAPI[article].altTxt;

            let Title = document.createElement("h3");
            card.appendChild(Title);
            Title.innerHTML = resultatAPI[article].name;

            let text = document.createElement("p");
            card.appendChild(text);
            text.innerHTML = resultatAPI[article].description;


        }
    });
}  