
let layout = document.querySelector(".layout-container")
let cardsContainer = document.querySelector("#cards")
let images = document.querySelectorAll(".p-image");
let cards = cardsContainer.getElementsByClassName("card");
console.log("Cards",cards)

export function gridOrList(){
    layout.addEventListener("click", (e)=>{
            e.target.closest(".grid-list-layout").classList.toggle("fa-table-cells");
            e.target.closest(".grid-list-layout").classList.toggle("fa-list");
            if(cardsContainer.classList.contains("grid")){
                cardsContainer.classList.remove("grid", "md:grid-cols-3", "sm:grid-cols-2");
                cardsContainer.classList.add("flex","flex-col");
                for(i of images){
                    i.classList.remove("object-cover");
                }
                for(let c of cards){
                    c.classList.add("flex", "w-full", "h-[84px]", "gap-3.5")
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
            }
            

            // cards.classList.toggle(grid)

        console.log("Clicked")
    });
}

// image:          object-fit: contain;
// card:           display: flex; width: stretch; height: 84px;
// cards section:  display: flex; flex-direction: column;
