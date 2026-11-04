const cartSpace = document.getElementById("cart-space");
const panierIcon = document.getElementById("panier");
const prixTotalIcon = document.getElementById("prix-total-icon");


const products = JSON.parse(localStorage.getItem("products")) || [];
let cartData = JSON.parse(localStorage.getItem("cart")) || [];

panierIcon.addEventListener("click", ()=>{
    cartSpace.classList.toggle("right-0")
    cartSpace.classList.toggle("-right-full")
});


// const product = products.find()
const calculateTotalPrice = ()=>{
    const priceTotal = cartData.reduce((sum, p)=>{
        return sum + p.prix*p.qty
    }, 0);
    prixTotalIcon.innerHTML = priceTotal.toFixed(2);
}
function showProductsInCart(){
    calculateTotalPrice();
    console.log("Worked")

    // --------------------------------------
    cartSpace.innerHTML = "";
    for(let p of cartData){
        cartSpace.innerHTML += `
             <div class="rounded-xl m-3.5 overflow-hidden w-auto bg-gray-800 flex relative">
                <img class="w-29.25 h-31.75 object-cover" src="${p.image}" 
                alt="${p.nom}">

                <div class="p-info-container p-1 px-2 flex w-full justify-between items-end">
                    <div class="h-full">
                    
                        <div class="nom text-2xl">${p.nom}</div>
                        <div class="text-gray-700">M &nbsp;&nbsp;&nbsp; L &nbsp;&nbsp;&nbsp; XL</div>
                        <div class="text-green-700">
                            <div class="prix inline">${p.prix}</div> DH
                        </div>
                        <div class='flex flex-row gap-1.5 items-baseline text-2xl absolute bottom-0'>
                            <div>P.T. :</div>                    
                            <div class="prix-total font-bold text-green-700">${(p.prix*p.qty).toFixed(2)} DH</div>
                        </div>
                        
                        </div>
                        <div data-id="${p.id}" class="flex items-center w-19.5 justify-between">
                            <button class="inc bg-green-700 h-fit  px-2 my-1.5 inline  rounded cursor-pointer hover:bg-green-900 ">+</button>
                            <span class="qty">${p.qty}</span>
                            <button class="dec bg-green-700 h-fit  px-2 my-1.5 inline  rounded cursor-pointer hover:bg-green-900 ">-</button>
                        </div>

                    <button data-id="${p.id}" class="delete absolute top-2 right-2 cursor-pointer hover:text-red-700" title="Supprimer?">
                        <i  class="fas fa-trash"></i>Delete</button>
                </div>
            </div>
    `
    }
}
showProductsInCart();

function addProductToCart(){
    document.addEventListener("click" , (e)=>{
        if(e.target.matches(".add-to-cart")){
            const id = e.target.closest(".card[data-id]").dataset.id;
            // const updateCart = [...cartData, {productId: id}];
            const isInCart = cartData.find(p => p.id == id);
            
            if(!isInCart){ // ==> If it isn't in cart
                const productInfo = products.find(p => p.id == id);
                cartData.push({qty: 1, ...productInfo});
                localStorage.setItem("cart", JSON.stringify(cartData));
            }else{ // ==> Otherwise, increace quantity
                const increaceQty = {...isInCart, qty: ++isInCart.qty};
                const updateCart = [...cartData.filter(p => p.id != id), increaceQty];
                localStorage.setItem("cart", JSON.stringify(updateCart));
                console.log("Exsist")
            }

            console.log(!isInCart);
            // console.log("ADDED!"+cartData)
            showProductsInCart();
        }
    })
}

function incDecQty(){
    document.addEventListener("click", (e)=>{
        if(e.target.matches(".inc")){
            let id = e.target.closest("div[data-id]").dataset.id;
            const isInCart = cartData.find(p => p.id == id);
            const increaceQty = {...isInCart, qty: ++isInCart.qty};
            const updateCart = [...cartData.filter(p => p.id != id), increaceQty];
            localStorage.setItem("cart", JSON.stringify(updateCart));
    
            let qty = e.target.closest("div[data-id]").querySelector(".qty");
            let newQty = Number(qty.textContent);
            newQty++;
            qty.textContent = newQty;
            console.log(newQty);
            calculateTotalPrice();
            showProductsInCart();

        }
        if(e.target.matches(".dec")){
            let id = e.target.closest("div[data-id]").dataset.id;
            const isInCart = cartData.find(p => p.id == id);
            const increaceQty = {...isInCart, qty: --isInCart.qty};
            const updateCart = [...cartData.filter(p => p.id != id), increaceQty];
            localStorage.setItem("cart", JSON.stringify(updateCart));
    
            let qty = e.target.closest("div[data-id]").querySelector(".qty");
            let newQty = Number(qty.textContent);
            if(newQty==1){
                return ;
            }
            newQty--
            qty.textContent = newQty;
            calculateTotalPrice();
            showProductsInCart();


        }
    });
}
incDecQty()

function deleteFromCart(){
    document.addEventListener('click', (e)=>{
        if(e.target.matches(".delete")){
            const id = e.target.dataset.id;
            const updateCart = cartData.filter(p => p.id != id);
            localStorage.setItem("cart", JSON.stringify(updateCart));
            cartData = updateCart;
            calculateTotalPrice();
            
            showProductsInCart();
        }
    })
}
deleteFromCart();

export {addProductToCart, showProductsInCart, calculateTotalPrice};

