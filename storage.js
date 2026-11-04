const products = JSON.parse(localStorage.getItem("products")) || [];

const body = document.querySelector("tbody")
const border = "border-2 border-gray-900"

products.forEach(p =>{
    body.innerHTML +=`<tr class="p-2 text-center ${border}">
                    <td class="${border}">${p.id}</td>
                    <td class="${border}">${p.nom}</td>
                    <td class="${border}">${p.prix}</td>
                    <td class="${border}">${p.categorie}</td>
                    <td class="py-5 ${border} flex justify-center">
                        <img class="w-15" src="${p.image}" alt="${p.nom}"/>
                    </td>
                </tr>`
})

console.log(body)

