

async function getProducts(){
    console.log("Fetch")
    try{
        const response = await fetch("./data/data.json");
        if(!response.ok) throw new Error("==> Get products Error!");
        const data = await response.json();
        console.log(data);
        return data;
    }catch (error) {
    console.error('Failed to load JSON data:', error);
  }
}


export {getProducts};