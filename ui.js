import { getProducts } from "./api.js";

let layout = document.querySelector(".layout-container")
const cards = document.getElementById("cards")
const pagination = document.getElementById("pagination");
const search = document.getElementById("search")

const data = await getProducts();
let list = data;

const perPage = 8;
let currentPage = 1;
const tototalPages = Math.ceil(list.length / perPage);

console.log(pagination)

search.addEventListener('input', (e)=>{
    list = data.filter(p => p.nom.toLowerCase().includes(e.target.value.toLowerCase()))
    showProducts()
});

export function showProducts(){
    cards.innerHTML = "" 
    // ---------------------------------
    const start = (currentPage - 1) * perPage;
    const pageItems = list.slice(start, start + perPage);

    // -----------------------------
    // layout.classList.add("fa-list");
    layout.querySelector(".grid-list-layout").classList.add("fa-list")
    layout.querySelector(".grid-list-layout").classList.remove("fa-table-cells")
    // console.log(layout.querySelector(".grid-list-layout"))
    // console.log(layout)
    cards.classList.add("grid","md:grid-cols-3","sm:grid-cols-2", "lg:grid-cols-4", "xl:grid-cols-5")
    console.log(cards)
    pageItems.forEach(p =>{

        let div = document.createElement("div");
        div.className = "card rounded-xl overflow-hidden w-50 cursor-pointer hover:opacity-80";
        div.innerHTML = `
                <img class="p-image w-50 h-50 object-cover" src="${p.image}" 
                alt="T-shirt Noir Coton">

                <div class="p-info-container  p-1 flex flex-col">
                    <div>
                        <div class="nom">${p.nom}</div>
                        <div class="text-gray-700">M &nbsp;&nbsp;&nbsp; L &nbsp;&nbsp;&nbsp; XL</div>
                        <div class="text-green-700">
                            <div class="prix inline">${p.prix}</div> DH
                        </div>
                    </div>
                    <button class="bg-green-700 px-2 py-1 my-1.5 rounded cursor-pointer hover:bg-green-400 ">Ajouter +</ajouter>
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
            class="px-3 py-1 rounded text-white disabled:opacity-40">Prev</button>
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
            class="px-3 py-1 rounded text-white disabled:opacity-40">Next</button>
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


