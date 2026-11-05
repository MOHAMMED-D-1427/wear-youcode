const products = JSON.parse(localStorage.getItem("products")) || [];

const body = document.querySelector("tbody")
const border = "border-2 border-gray-900"

products.forEach(p =>{
    body.innerHTML +=`<tr class="p-2 text-center ${border} hover:bg-[#eeeeee0e]">
                    <td class="${border}">${p.id}</td>
                    <td class="${border}">${p.nom}</td>
                    <td class="${border}">${p.prix}</td>
                    <td class="${border}">${p.categorie}</td>
                    <td class="py-5  flex justify-center">
                        <img class="w-15" src="${p.image}" alt="${p.nom}"/>
                    </td>
                    <td class="${border}">
                        <button class="modify-action w-full p-2 mb-2 bg-[#0000ff5e] cursor-pointer hover:bg-[#6c6cff5e]"><i class="fas fa-pen-square"></i> Modifier</button><br>
                        <button class="w-full p-2 mb-2 bg-[#ff00005e] cursor-pointer hover:bg-[#ff6c6c5e]"><i class="fas fa-trash"></i> Supprimer</button>
                    </td>
                </tr>`
});


// ==================================== Modify Product
// --------------------> Popup
const form = document.querySelector(".form-container");

document.addEventListener("click", (e)=>{
    if(e.target.matches(".modify-action")){
        form.classList.remove("invisible");
    }

    if(e.target.matches(".form-container")){
        form.classList.add("invisible");
    }

    if(e.target.matches(".fa-xmark")){
        form.classList.add("invisible");
        formAdd.classList.add("invisible");
        console.log("Clicked")
    }
})

// ==================================== Add Product
// --------------------> Popup
const formAdd = document.querySelector(".form-container-add");

document.addEventListener("click", ()=>{
    if(e.target.matches(".add-product")){
        formAdd.classList.remove("invisible");
    }
    if(e.target.matches(".form-container-add")){
        formAdd.classList.add("invisible");
    }
})







