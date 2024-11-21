/*
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOizdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.z1pdEBkx8Hq01B7jNKa42NGxtFFHwb-7O_0y8krVWUY' \
--data '{
    "title":"Minha Casa",
    "cep": "03730000",
    "address": "Rua Brazópolis Jardim Jaú (Zona Leste)",
    "number": "8A",
    "complement": ""
}'*/

const url = 'https://go-wash-api.onrender.com/api/auth/address';

// window.onload = function(){
//     if(localStorage.getItem('address')){
//         let address = JSON.parse(localStorage.getItem('address')); // parse transforma string em json 
//         document.getElementById('title').value = address.title;
//         document.getElementById('cep').value = address.cep;
//         document.getElementById('address').value = address.address;
//         document.getElementById('number').value = address.number;
//         document.getElementById('complement').value = address.complement;

//     }
// }

async function endereco(){
    let title =  document.getElementById('title').value;
    let cep =  document.getElementById('cep').value;
    let address =  document.getElementById('address').value;
    let number =  document.getElementById('number').value;
    let complement =  document.getElementById('complement').value;

    let return_data = JSON.parse(localStorage.getItem("user"));

    let access_token = return_data.access_token;

    if (title === "" || cep === "" || address === "" || number === "") 
        {
          alert("Please fill all fields.");
          return;
        }
        

// await = aguada a chamada da requisição fetch - trabalha com funções assincronas

    let button = document.getElementById("button-cadastro");
    button.innerHTML = "<i class='fa-solid fa-circle-notch fa-spin'> </i>";

//   let endereco = fetch(url, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${access_token}`,
//       'Content-Type': 'application/json'
//     }
//   }).then(response => response.json());
//  console.log(endereco)
 

    let api = await fetch(url, {
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
            'Authorization' : `Bearer ${access_token}`
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
            window.open("../view/home.html", "_self");
        }
        else
        {    
            button.innerHTML = "Salvar";
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

