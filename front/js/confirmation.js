main();

function main() {
    basket();
}

function basket(){
    const orderId = document.getElementById("orderId");

    orderId.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}