

async function getProducts(){
    console.log("Fetch")
    try{
        const response = await fetch("./data/data.json");
        if(!response.ok) throw new Error("==> Get products Error!");
        const data = await response.json();

        const products = JSON.parse(localStorage.getItem("products")) || data;
        localStorage.setItem("products", JSON.stringify(products));

        return products;
    }catch (error) {
    console.error('Failed to load JSON data:', error);
  }
}



export {getProducts};