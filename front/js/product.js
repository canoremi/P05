let params = new URL(document.location).searchParams;
let id = params.get("id");

let images = document.querySelector("img");
let Title = document.querySelector("h3");
let price = document.querySelector("p");
let text = document.querySelector("p");
const quantityOfKanap = document.querySelector("#quantity");
const chosenColor = document.querySelector("#colors");

main();

function main() {
  getArticles();
  addToCard();
}
// Récupérer les articles depuis l'API
function getArticles() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (res) {
      return res.json();
    })
    
    //distribution des données par produit
    .then(function (resultatAPI) {
      article = resultatAPI;
      console.log(article);

      let img = document.createElement("img");
      img.src = article.imageUrl;

      let div = document.getElementById("img");
      div.appendChild(img);
          
      document.getElementById("title").innerHTML = article.name;
      document.getElementById("description").innerText = article.description;
      document.getElementById("price").innerText = article.price;
      document.getElementById("img").src = article.imageUrl;
      
      let colorSelect = document.getElementById("colors");
      for ( let i = 0; i < article.colors.length; i++){
      let option = document.createElement("option");
      option.innerText = article.colors[i];
      colorSelect.appendChild(option);
      }

    })
    .catch((error) => {
      let item = document.querySelector(".item");
      item.innerHTML = "Nous n'avons pas réussi à afficher nos canapés.";
    })
}

function addToCard() {
  const addWithBtn = document.querySelector("#addToCart");

  addWithBtn.addEventListener("click", () => {
      if (quantityOfKanap.value > 0 && quantityOfKanap.value <=100 && quantityOfKanap.value !=0){

      let choiceOfColor = chosenColor.value;
      let choiceOfQuantity = quantityOfKanap.value;

      let productAdd = {
        _id: id,
        quantity: Number(choiceOfQuantity),
        nameKanap : article.name,
        imgKanap: article.imageUrl,
        descriptionKanap: article.description,
        altImg : article.altTxt,
        colorKanap : choiceOfColor,
        priceKanap : article.price

      };

      let CPLS = JSON.parse(localStorage.getItem("products"));

      const messageConfirmation =() =>{
        if(window.confirm(`Votre article est ajouté au panier appuyez sur "commander" ou revenir à l'accueil`)){
            window.location.href ="cart.html";
        }
      }

    if (CPLS) {
      const alreadyInBasket = CPLS.find(
        (el) => el._id === id && el.colorKanap === choiceOfColor);
        //Si le produit commandé est déjà dans le panier
        if (alreadyInBasket) {
            let newQuantity =
            parseInt(productAdd.quantity) + parseInt(alreadyInBasket.quantity);
            alreadyInBasket.quantity = newQuantity;
            localStorage.setItem("products", JSON.stringify(CPLS));
            messageConfirmation();
        //Si le produit commandé n'est pas dans le panier
        } else {
            CPLS.push(productAdd);
            localStorage.setItem("products", JSON.stringify(CPLS));
            messageConfirmation();
        }

    }else {
      CPLS = [];
      CPLS.push(productAdd);
      localStorage.setItem("products" , JSON.stringify(CPLS));
      messageConfirmation();
    }
    }
  });
}