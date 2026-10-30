import { getProducts } from "./api.js";

const cards = document.getElementById("cards")
const data = await getProducts();


export function showProducts(){
    console.log(cards)
    // console.log("From ui",data)
    data.map((p)=>{

        let div = document.createElement("div");
        div.className = "card rounded-xl overflow-hidden w-50 cursor-pointer hover:opacity-80";
        div.innerHTML = `
                <img class="p-image w-50 h-50 object-cover" src="${p.image}" 
                alt="T-shirt Noir Coton">

                <div class="p-1">
                    <div class="nom">${p.nom}</div>
                    <div class="text-gray-700">M &nbsp;&nbsp;&nbsp; L &nbsp;&nbsp;&nbsp; XL</div>
                    <div class="text-green-700">
                        <div class="prix inline">${p.prix}</div> DH
                    </div>

                </div>
            `
            cards.append(div);
        });
}


