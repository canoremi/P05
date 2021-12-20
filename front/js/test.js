
function totalInBasket(){

  //total des quantités dans le panier
  let quantityOfKanap = document.getElementById('totalQuantity');
  let Basket = quantityOfKanap.length, total = 0;


  for(let i = 0; i< Basket; i++){
      total += quantityOfKanap[i].valueAsNumber;
  }

  let KanapTotal = document.getElementById('totalQuantity');
  KanapTotal.innerHTML = total;

  // total des prix dans le panier
  priceFinal = 0;

  for (let i = 0; i < Basket; ++i){
      priceFinal += (quantityOfKanap[i].valueAsNumber * CPLS[i].priceKanap);
  }
  let KanapTotalPrice = document.getElementById('totalPrice');
  KanapTotalPrice.innerHTML = priceFinal;
}
