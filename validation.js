
// id: 'name', regex: /^.{2,}$/, msgId: 'msg-name', error: 'Le nom doit contenir au moins 2 caractères'
const addingForm = document.getElementById('addingForm');
const modifingForm = document.getElementById('modifingForm');

const fields = [
    {id: 'p-nom', regex: /^\w{5,30}$/, msgId: 'msg-nom', error: "Le nom doit contenir entre 5-30 caractères"},
    {id: 'p-prix', regex: /^([1-9]\d+)$/, msgId: 'msg-prix', error: "Le prix doit au moins 10 DH"},
    {id: 'p-cat', regex: /^\w{5,30}$/, msgId: 'msg-cat', error: "Le nom doit contenir entre 5-30 caractères"},
];


function validateField(field, regex, errorMsg){
    const input = addingForm.querySelector(`#${field.id}`);
    const msg = addingForm.querySelector(`#${field.msgId}`)

    
    // console.log(input.value)
    if(!regex.test(input.value.split(" ").join(""))){
        msg.textContent = errorMsg
        msg.classList.remove("invisible")
        return false
    }else{
        msg.textContent = ""
        msg.classList.add("invisible")
        return true
    }
}

function validation(){
    console.log("H")
    for(const f of fields){
        const input = addingForm.querySelector(`#${f.id}`)
        // console.log(input)
        input.addEventListener("input", ()=>{
            validateField(f, f.regex, f.error)
        })
    }
}

let allValid = null
document.addEventListener("click", (e)=>{
    if(e.target.matches("#ajouter")){
        allValid = true;
        
        for(const f of fields){
            const valid = validateField(f, f.regex, f.error)
            if(!valid) allValid = false;
        }
        console.log("Valid: ",allValid)
    }
})

// =========================== For Modifing Form
function validateField2(field, regex, errorMsg){
    const input = modifingForm.querySelector(`#${field.id}`);
    const msg = modifingForm.querySelector(`#${field.msgId}`)
    console.log(msg)
    if(!regex.test(input.value.split(" ").join(""))){
        msg.textContent = errorMsg
        msg.classList.remove("invisible")
        return false
    }else{
        msg.textContent = ""
        msg.classList.add("invisible")
        return true
    }
}

function validation2(){
    console.log(modifingForm)
    for(const f of fields){
        const input = modifingForm.querySelector(`#${f.id}`)
        console.log(input)
        input.addEventListener("input", ()=>{
            validateField2(f, f.regex, f.error)
        })
    }
}

let allValid2 = null
document.addEventListener("click", (e)=>{
    if(e.target.matches("#modify")){
        allValid2 = true;
        
        for(const f of fields){
            const valid = validateField2(f, f.regex, f.error)
            if(!valid) allValid2 = false;
        }
        console.log("Valid: ",allValid2)
    }
})

export {validation, validation2, allValid, allValid2};