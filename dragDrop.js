// import { calculateTotalPrice, showProductsInCart } from "./cart.js";

// import { incDecQty } from "./cart.js";

const prixTotalIcon = document.getElementById("prix-total-icon");
const cartSpace = document.getElementById("cart-space");


let cartData = JSON.parse(localStorage.getItem("cart")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];


// ============================================
const calculateTotalPrice = ()=>{
    const priceTotal = cartData?.reduce((sum, p)=>{
        return sum + p.prix*p.qty
    }, 0);
    prixTotalIcon.innerHTML = priceTotal.toFixed(2) || 0.00;
}
function showProductsInCart(){
    cartData = JSON.parse(localStorage.getItem("cart"));

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


                    <button data-id="${p.id}" class="delete absolute z-10 top-2 right-2 cursor-pointer hover:text-red-700" title="Supprimer?">
                    <i data-id="${p.id}" class="delete fas fa-trash relative -z-10"></i></button>
                </div>
            </div>
    `
    }
}

// ============================================

let dragged = null;

function dragDrop(){
    // incDecQty()
    // ====> Start dragging(For CARD)

    document.addEventListener("dragstart", (e)=>{
        const card = e.target.closest(".card");
        if(!card) return ;

        dragged = card; 
    });

// ===> Allow CART to allow dropping
    document.addEventListener("dragover", (e)=>{
        const cartIcon = e.target.closest("#panier");
        if(!cartIcon) return ;

        e.preventDefault();
    });


// ==========> Drop/move/copy the product to the CART

    document.addEventListener("drop", (e)=>{
        
        const cartIcon = e.target.closest("#panier");
        if(!cartIcon || !dragged) return; // .. || empty
        
        e.preventDefault();
        // ==================================
        cartData = JSON.parse(localStorage.getItem("cart")) || [];
        products = JSON.parse(localStorage.getItem("products")) || [];
        
        const id = dragged.dataset.id;
        console.log("dragged: ", dragged);
        console.log("id: ", id);
        const isInCart = cartData.find(p => p.id == id);
        console.log("isInCart: ", isInCart);

        if(!isInCart){ 
            const productInfo = products.find(p => p.id == id);
            // console.warn("----> New in cart");
            // console.log("> > > cartData b:", cartData)
            cartData.push({qty: 1, ...productInfo});
            // console.log("> > > cartData a:", cartData)
            // cartData = updateCart;
            localStorage.setItem("cart", JSON.stringify(cartData));
        }else{
            // console.warn("----> In cart");
            isInCart.qty++  
            const updateCart = [...cartData.filter(p => p.id != id), isInCart];
            cartData = updateCart;
            localStorage.setItem("cart", JSON.stringify(updateCart));
            
        }

        // showProductsInCart();

        // console.log("===> Dropped!")
    })

// =============> Cleanup dragged CARD
    document.addEventListener("dragend", ()=>{

        dragged = null;
        showProductsInCart()
        // console.log("===> Clean!")
    }) 
}


export {dragDrop};












