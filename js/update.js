const url = new URLSearchParams(location.search)
var id = (url.get("id"))
var token = JSON.parse(localStorage.getItem("user"));


async function buscarEndereco() {


    let api = await fetch("https://go-wash-api.onrender.com/api/auth/address/" + id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.access_token}`
        }
    })


    let response = await api.json();


    if (api.ok) {
        document.getElementById("title").value = response.data.title
        document.getElementById("cep").value = response.data.cep
        document.getElementById("address").value = response.data.address
        document.getElementById("number").value = response.data.number
        document.getElementById("complement").value = response.data.complement
        console.log(response)
    } else {
        alert("Erro")
    }
}


buscarEndereco();

async function updateEndereco(){
   
    let title =  document.getElementById('title').value;
    let cep =  document.getElementById('cep').value;
    let address =  document.getElementById('address').value;
    let number =  document.getElementById('number').value;
    let complement =  document.getElementById('complement').value;


    if (title === "" || cep === "" || address === "" || number === "")
        {
          alert("Please fill all fields.");
          return;
        }
       
        let button = document.getElementById("button-update");
        button.innerHTML = "<i class='fa-solid fa-circle-notch fa-spin'> </i>";

        let api = await fetch("https://go-wash-api.onrender.com/api/auth/address/"+id, {
            method: "POST",
            body:JSON.stringify({
                "title":title,
                "cep":cep,
                "address":address,
                "number": number,
                "complement": complement,
                }),
            headers:{
                'Content-Type' : 'application/json', //Json porque consegue se comunicar  com informações no estilo (lembrar sobre e pesquisar, possível questão de prova)
                'Authorization' : `Bearer ${token.access_token}`
            }
        }).then(response => response.json())
        .then(result => {
            if (!result){
                alert("Erro interno na API")
                return false
            }
   
   
            if(!result.data.errors)
            {
                // localStorage.setItem('address', JSON.stringify(result.data));
                window.open("../view/lista.html", "_self");
            }
            else
            {    
                button.innerHTML = "Atualizar";
                if(typeof result.data.errors.title != 'undefined')
                    alert(result.data.errors.title[0]);
                if(typeof result.data.errors.cep != 'undefined')
                    alert(result.data.errors.cep[0]);
                if(typeof result.data.errors.address != 'undefined')
                    alert(result.data.errors.address[0]);
                if(typeof result.data.errors.number != 'undefined')
                    alert(result.data.errors.number[0]);
                if(typeof result.data.errors.complement != 'undefined')
                    alert(result.data.errors.complement[0]);
            }
        })
}
