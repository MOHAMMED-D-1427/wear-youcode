
let layout = document.querySelector(".layout-container")
let cardsContainer = document.querySelector("#cards")
let images = document.querySelectorAll(".p-image");
let cards = cardsContainer.getElementsByClassName("card");
let productInfo = cardsContainer.getElementsByClassName("p-info-container");

export function changeCardsLayout(){
    if(cardsContainer.classList.contains("grid")){
                cardsContainer.classList.remove("grid", "md:grid-cols-3", "sm:grid-cols-2");
                cardsContainer.classList.add("flex","flex-col");
                for(i of images){
                    i.classList.remove("object-cover");
                }
                for(let c of cards){
                    c.classList.add("flex", "w-full", "h-[84px]", "gap-3.5")
                }
                for(let p of productInfo){
                    p.classList.add("flex-row", "w-full", "justify-between")
                    p.classList.remove("flex-col")
                }
            }else{
                cardsContainer.classList.add("grid", "md:grid-cols-3", "sm:grid-cols-2");
                cardsContainer.classList.remove("flex","flex-col");
                for(i of images){
                    i.classList.add("object-cover");
                }
                for(let c of cards){
                    c.classList.remove("flex", "w-full", "h-[84px]", "gap-3.5")
                }
                for(let p of productInfo){
                    p.classList.remove("flex-row", "w-full", "justify-between")
                    p.classList.add("flex-col")
                }
            }
}
export function gridOrList(){
    layout.addEventListener("click", (e)=>{
            e.target.closest(".grid-list-layout").classList.toggle("fa-list");
            e.target.closest(".grid-list-layout").classList.toggle("fa-table-cells");

            changeCardsLayout()
        console.log("Clicked")
    });
}

