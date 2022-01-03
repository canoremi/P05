let cart = document.querySelector("cart__items");
let CPLS = JSON.parse(localStorage.getItem("products"));
console.table(CPLS);

main();

function main() {
    fillToCart();
    form();
    deleteKanap();
    removeNumberOfKanap();
    totalInBasket ();
    validEmail();
    validlastName ();
    validName ();
}

function fillToCart(){
    
    for (let kanap in CPLS){
    
        let productTab = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productTab);
        productTab.classList.add("cart__item");
        productTab.setAttribute =  CPLS[kanap]._id;

        let divImg = document.createElement("div");
        productTab.appendChild(divImg);
        divImg.classList.add("cart__item__img");

        let productImg = document.createElement("img");
        divImg.appendChild(productImg);
        productImg.src = CPLS[kanap].imgKanap;
        productImg.alt = CPLS[kanap].altImg;

        let productContent = document.createElement("div");
        productTab.appendChild(productContent);
        productContent.classList.add("cart__item__content");

        let productDescription = document.createElement("div");
        productContent.appendChild(productDescription);
        productDescription.classList.add("cart__item__content__description");

        let productName = document.createElement("h2");
        productDescription.appendChild(productName);
        productName.innerHTML = CPLS[kanap].nameKanap;

        let productColor = document.createElement("p");
        productDescription.appendChild(productColor);
        productColor.innerHTML = CPLS[kanap].colorKanap;

        let productPrice = document.createElement("p");
        productDescription.appendChild(productPrice);
        productPrice.innerHTML = CPLS[kanap].priceKanap + " €";


        let productSettings = document.createElement("div");
        productContent.appendChild(productSettings);
        productSettings.classList.add("cart__item__content__settings");

        let productSettingsQuantity = document.createElement("div");
        productSettings.appendChild(productSettingsQuantity);
        productSettingsQuantity.classList.add("cart__item__content__settings__quantity");

        let quantityInSettings = document.createElement("p");
        productSettingsQuantity.appendChild(quantityInSettings);
        quantityInSettings.innerHTML = "Quantité : ";

        let inputQuantity = document.createElement("input");
        productSettingsQuantity.appendChild(inputQuantity);
        inputQuantity.classList.add("itemQuantity");
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("name", "itemQuantity");
        inputQuantity.setAttribute("min" , "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.value = CPLS[kanap].quantity;

        let SettingsDelete = document.createElement("div");
        productSettings.appendChild(SettingsDelete);
        SettingsDelete.classList.add("cart__item__content__settings__delete");

        let deleteProducts = document.createElement("p");
        SettingsDelete.appendChild(deleteProducts);
        deleteProducts.classList.add("deleteItem");
        deleteProducts.innerHTML = 'Supprimer';

    }
}

function deleteKanap() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < btn_supprimer.length; i++){
        btn_supprimer[i].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer par sa couleur
            let kanapDelete = CPLS[i].colorKanap;

            CPLS = CPLS.filter( el => el.colorKanap !== kanapDelete);
            
            localStorage.setItem("products", JSON.stringify(CPLS));

            //message de confirmation du produit supprimé.
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}

function removeNumberOfKanap(){
    let numberOfKanap = document.querySelectorAll(".itemQuantity");

    for (let j = 0; j < numberOfKanap.length; j++){
        numberOfKanap[j].addEventListener("change" , (event) => {
            event.preventDefault();

            let kanapNumber = CPLS[j].quantity;
            let kanapValue = numberOfKanap[j].valueAsNumber;

            const newNumberOfKanap = CPLS.find((el)=> el.kanapValue !== kanapNumber);

            newNumberOfKanap.quantity = kanapValue;
            CPLS[j].quantity = newNumberOfKanap.quantity;

            localStorage.setItem("products", JSON.stringify(CPLS));
            location.reload();
        })
    }
}

function totalInBasket(){

    //total des quantités dans le panier
    let quantityOfKanap = document.getElementsByClassName('itemQuantity');
    let Basket = quantityOfKanap.length, total = 0;
    console.log(Basket);
  
  
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


//ajout d'une regex à l'input nom

function validName (){
    let formName = document.querySelector(".cart__order__form");

    let regexName = new RegExp (/^[a-z ,.'-]+$/i);

    formName.firstName.addEventListener('change', function(){
        validName (this);
    });

    //validation du nom
    const validName = function(inputfirstName){
        let firstNameErrorMsg = inputfirstName.nextElementSibling;

        if (regexName.test(inputfirstName.value)){
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez reneigner un nom valide.';
            location.reload();
        }
    };
}

function validlastName (){
    let formnickName = document.querySelector(".cart__order__form");

    let regexNickname = new RegExp(/^[a-z ,.'-]+$/i);


    formnickName.lastName.addEventListener('change', function(){
        validlastName(this);
    });
    //validation du prénom
    const validlastName = function(inputLastName){
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (regexNickname.test(inputLastName.value)){
            lastNameErrorMsg.innerHTML = '';
        }else{
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner un prénom valide.';
            location.reload();
        }
    };
}

//ajout d'une regex à l'input mail
function validEmail(){
    let form = document.querySelector(".cart__order__form");

	let regexMail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    form.email.addEventListener('change', function() {
        validEmail(this);
    });
	

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (regexMail.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner une adresse mail valide.';
            location.reload();
        }
    };
}
//on récupère les inputs du formulaire
function form(){
    const submit = document.querySelector("#order");
    let inputfirstName = document.querySelector("#firstName");
    let inputLastName = document.querySelector("#lastName");
    let inputAdress = document.querySelector("#address");
    let inputCity = document.querySelector("#city");
    let inputMail = document.querySelector("#email");
    let erreur = document.querySelector(".emailErrorMsg");

    
    
    submit.addEventListener("click",(e) => {
        e.preventDefault();
        
        if (
            !inputfirstName.value ||
            !inputLastName.value ||
            !inputAdress.value ||
            !inputCity.value ||
            !inputMail.value
        ) {erreur.innerHTML= "Vous devez renseigner tous les champs du formulaire !";
         }
        else {
            let productsadded = [];
            for (let i =0; i<CPLS.length;i++){
                productsadded.push(CPLS[i]._id);
            }
        

            const command = {
                contact: {
                  firstName: inputfirstName.value,
                  lastName: inputLastName.value,
                  city: inputCity.value,
                  address: inputAdress.value,
                  email: inputMail.value,
                },
                products: productsadded,
            }; 
            
            const send = {
                method: "POST",
                body: JSON.stringify(command),
                headers: { "Content-Type": "application/json", 
               },
            };


            fetch("http://localhost:3000/api/products/order", send)
             .then((response) => response.json())
             .then((data) => {
               console.log(data);
               localStorage.setItem("orderId", data.orderId);

               document.location.href = "confirmation.html";
            })
             .catch((err) => {
                alert ("Un problème a été detecté avec notre serveur, veuillez réessayer plus tard : " + err.message);
            });
        }
    });
}