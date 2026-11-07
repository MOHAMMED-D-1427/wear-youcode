import { allValid, allValid2, validation, validation2 } from "./validation.js";

let products = JSON.parse(localStorage.getItem("products")) || [];

const body = document.querySelector("tbody")
const border = "border-2 border-gray-900"

function showProductsAdmin(){
    products = JSON.parse(localStorage.getItem("products")) || []
    body.innerHTML = ""

    products.forEach(p =>{
        body.innerHTML +=`<tr class="p-2 text-center ${border} hover:bg-[#eeeeee0e]">
        <td class="${border}">${p.id}</td>
        <td class="${border}">${p.nom}</td>
        <td class="${border}">${p.prix}</td>
        <td class="${border}">${p.categorie}</td>
        <td class="py-5  flex justify-center">
            <img class="w-15" src="${p.image}" alt="${p.nom}"/>
        </td>
        <td class="${border}" data-id='${p.id}'>
            <button class="modify-popup w-full p-2 mb-2 bg-[#0000ff5e] cursor-pointer hover:bg-[#6c6cff5e] relative z-10"><i class="fas fa-pen-square relative -z-10"></i> Modifier</button><br>
            <button class="delete w-full p-2 mb-2 bg-[#ff00005e] cursor-pointer hover:bg-[#ff6c6c5e] relative z-10"><i class="fas fa-trash relative -z-10"></i> Supprimer</button>
            </td>
            </tr>`
        });
}

showProductsAdmin()
// ==================================== Modify Product
// --------------------> Popup
const form = document.querySelector(".form-container");

let pId = null;
document.addEventListener("click", (e)=>{
    if(e.target.matches(".modify-popup")){
        form.classList.remove("invisible");
        const id = e.target.closest("[data-id]").dataset.id;
        pId = id;
        // const productCard = e.target.closest("[data-id]")
        const productInfo = products.find(p => p.id == id);
        form.querySelector("#p-nom").value = productInfo.nom
        form.querySelector("#p-cat").value = productInfo.categorie
        form.querySelector("#p-prix").value = productInfo.prix
        form.querySelector("#p-img").value = productInfo.image

    }

    if(e.target.matches(".form-container")){
        form.classList.add("invisible");
    }

    if(e.target.matches(".fa-xmark")){
        form.classList.add("invisible");
        formAdd.classList.add("invisible");
        console.log("Clicked")
    }
    // --------------------> Modify action

    if(e.target.matches("#modify")){
        e.preventDefault()
        let newProduct = {}
        console.log(pId)
        const nom = form.querySelector("#p-nom").value;
        const categorie = form.querySelector("#p-cat").value;
        const prix = form.querySelector("#p-prix").value;
        const image = form.querySelector("#p-img").value;
        
        if(nom.trim() == "" || categorie.trim() == "" || prix.trim() == "" || image.trim() == "") return  
        if(!allValid2) return  

        newProduct.id = Number(pId);
        newProduct.nom = nom
        newProduct.categorie = categorie
        newProduct.prix = Number(prix)
        newProduct.image = image


        const update = products.map((p)=>{
            if(p.id == pId){
                return newProduct
            }
            return p
        })


        localStorage.setItem("products", JSON.stringify(update))
        showProductsAdmin()
        form.classList.add("invisible");
    }

})



// ==================================== Delete Product
document.addEventListener("click", (e)=>{
    if(e.target.matches(".delete")){
        const id = e.target.closest("[data-id]").dataset.id;
        const update = products.filter(p => p.id != id)
        console.log(id)
        products = update;
        localStorage.setItem("products", JSON.stringify(products));
        showProductsAdmin();
    }
})


// ==================================== Add Product
// --------------------> Popup
const formAdd = document.querySelector(".form-container-add");

document.addEventListener("click", (e)=>{
    if(e.target.matches(".add-product")){
        formAdd.classList.remove("invisible");
    }
    if(e.target.matches(".form-container-add")){
        formAdd.classList.add("invisible");
    }
    // -------------------> Add action
    if(e.target.matches("#ajouter")){
    // console.log(e.target.closest("#ajouter"))

        e.preventDefault()
        console.log("Stor: ",allValid)
        const nom = formAdd.querySelector("#p-nom").value;
        const categorie = formAdd.querySelector("#p-cat").value;
        const prix = formAdd.querySelector("#p-prix").value;
        const image = formAdd.querySelector("#p-img").value;
        if(nom.trim() == "" || categorie.trim() == "" || prix.trim() == "" || image.trim() == "") return  
        if(!allValid) return  

        let pId = products[products.length-1].id

        let newProduct = {}
        newProduct.id = ++pId;

        newProduct.nom = nom;
        newProduct.categorie = categorie
        newProduct.prix = Number(prix)
        newProduct.image = image

        localStorage.setItem("products", JSON.stringify([...products, newProduct]))
        showProductsAdmin()
        formAdd.classList.add("invisible");
    }
})


validation()
validation2()




