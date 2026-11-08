import { getProducts } from "./api.js";

let layout = document.querySelector(".layout-container")
const cards = document.getElementById("cards")
const pagination = document.getElementById("pagination");
const search = document.getElementById("search")
const trier = document.getElementById("trier");
const filtrer = document.getElementById("filtrer");


const data = await getProducts();
let list = data;

const perPage = 8;
let currentPage = 1;
const tototalPages = Math.ceil(list.length / perPage);


// ===================================== Search
function searchProducts(){

    search.addEventListener('input', (e)=>{
        list = data.filter(p => p.nom.toLowerCase().includes(e.target.value.toLowerCase()))
        showProducts()
    });
}
searchProducts()
// ===================================== Sort
function sortProducts(){

    trier.addEventListener("click", (e)=>{
        let orderType = e.target.value;
        if(orderType == 'asc'){
            list = list.sort((a, b)=> a.prix - b.prix);
        }
        if(orderType == 'desc'){
            list = list.sort((a, b)=> b.prix - a.prix);
        }
        if(orderType == 'a-to-z'){
            list = list.sort((a, b)=> a.nom.localeCompare(b.nom));
        }
        if(orderType == 'z-to-a'){
        list = list.sort((a, b)=> b.nom.localeCompare(a.nom));
        }
        showProducts();
    })
}
sortProducts();

// ===================================== Filter
function filterByCategories(){
    filtrer.addEventListener("click", (e)=>{
        const cat = e.target.value;
        if(cat == "Tout"){
            list = data;
            showProducts();
            return ;
        }
        list = data.filter(p => p.categorie == e.target.value);
        console.log(list)
        showProducts();
    })
}

filterByCategories();

export function showProducts(){
    cards.innerHTML = "" 
    // ---------------------------------
    const start = (currentPage - 1) * perPage;
    const pageItems = list.slice(start, start + perPage);

    // -----------------------------
    layout.querySelector(".grid-list-layout").classList.add("fa-list")
    layout.querySelector(".grid-list-layout").classList.remove("fa-table-cells")
    cards.classList.add("grid","md:grid-cols-3","sm:grid-cols-2", "lg:grid-cols-4", "xl:grid-cols-5")
    // -----------------------------
    
    // console.log(cards)
    pageItems.forEach(p =>{
    
        let div = document.createElement("div");
        div.className = "card rounded-xl overflow-hidden w-50 cursor-grab hover:opacity-80";
        div.dataset.id = p.id;
        div.draggable = true
        div.innerHTML = `
                <img class="p-image w-50 h-50 object-cover" src="${p.image}" 
                alt="${p.nom}" draggable='false'>

                <div class="p-info-container p-1 flex flex-col ">
                    <div>
                        <div class="nom">${p.nom}</div>
                        <div class="text-gray-700">M &nbsp;&nbsp;&nbsp; L &nbsp;&nbsp;&nbsp; XL</div>
                        <div class="text-green-700">
                            <div class="prix inline">${p.prix}</div> DH
                        </div>
                    </div>
                    <button class="add-to-cart bg-green-700 px-2 py-1 my-1.5 rounded cursor-pointer hover:bg-green-400 ">Ajouter +</button>
                </div>
            `
            cards.append(div);
        });
        
        startPagination();

    }
    
function startPagination(){
    pagination.innerHTML = "";
    // -------------------
    pagination.innerHTML += `
        <button data-page="${currentPage - 1}" ${currentPage == 1 ? "disabled":""}
            class="px-3 py-1 rounded text-white disabled:opacity-40"><i class="fas fa-arrow-left"></i></button>
    `

    // ====> Page numbers
    for(let i=1; i <= tototalPages; i++){
        
        pagination.innerHTML += `
            <button data-page="${i}" 
                class="px-3 py-1 rounded border-2 border-gray-900 ${i == currentPage ? "bg-green-800 text-white":""}">
                ${i}
            </button>
        `;}

    // ---------------
     pagination.innerHTML += `
        <button data-page="${currentPage + 1}" ${currentPage == tototalPages ? "disabled":""} 
            class="px-3 py-1 rounded text-white disabled:opacity-40"><i class="fas fa-arrow-right"></i></button>
    `
}

pagination.addEventListener("click", (e)=>{
    const btn = e.target.closest("button[data-page]")
    console.log(btn)
    if(!btn || btn.disabled) return ;
    
    currentPage = Number(btn.dataset.page);
    console.log(currentPage)
    showProducts()
})

//======================================== Contact Form
const form = document.querySelector(".form-container")
document.addEventListener("click", (e)=>{
    if(e.target.matches(".form-container") || e.target.matches(".fa-xmark")){
        form.classList.add("invisible");
    }
    if(e.target.matches("#contact")){
        form.classList.remove("invisible");
    }
    if(e.target.matches("#autofill")){
        e.preventDefault()
        randomUser();
    }
    
    
})

function fetchUser(){
    return fetch("https://randomuser.me/api/")
    .then(res => {
        if(!res) throw new Error("=> Fetching Error!")
        return res.json()
    }).catch(err => console.log(err))
}
function randomUser(){

    fetchUser().then(data =>{
            const info = data.results[0];
        console.log(info)
        const nom = info.name.first
        const email = info.email
        const country = info.location.country
        const city = info.location.city
        const street = info.location.street.name
        const phone = info.phone
    
        form.querySelector("#nom").value = nom;
        form.querySelector("#email").value = email;
        form.querySelector("#address").value = `${country} - ${city} - ${street}`;
        form.querySelector("#tel").value = phone
    })
}


// ===================
const date = Date().split(" ")[3];
document.querySelector("#date").textContent = date;