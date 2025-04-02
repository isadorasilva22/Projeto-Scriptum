const url = 'https://go-wash-api.onrender.com/api/user';

async function cadastro(){
    let name =  document.getElementById('name').value;
    let email =  document.getElementById('email').value;
    let password =  document.getElementById('password').value;
    let cpf_cnpj =  document.getElementById('cpf_cnpj').value;
    let birthday =  document.getElementById('birthday').value;
    let terms =  document.getElementById('terms').checked;  


// await = aguada a chamada da requisição fetch - trabalha com funções assincronas

    let button = document.getElementById("button-cadastro");
    button.innerHTML = "<i class='fa-solid fa-circle-notch fa-spin'> </i>";

    let api = await fetch(url, {
        method: "POST",
        body:JSON.stringify({
            "name":name,
            "email":email,
            "user_type_id":1,
            "password": password,
            "cpf_cnpj": cpf_cnpj,
            "terms": 1,
            "birthday":birthday  
        }),
        headers:{
            'Content-Type' : 'application/json' //Json porque consegue se comunicar  com informações no estilo (lembrar sobre e pesquisar, possível questão de prova)
        }
    }).then(response => response.json())
    .then(result => {
        if(typeof result.data == "string")
        {
            alert(result.data);
            window.open("../view/login.html", "_self");
        }
        else
        {   
            button.innerHTML = "Salvar";
            if(typeof result.data.errors.name != 'undefined')
                alert(result.data.errors.name[0]);
            if(typeof result.data.errors.email != 'undefined')
                alert(result.data.errors.email[0]);
            if(typeof result.data.errors.password != 'undefined')
                alert(result.data.errors.password[0]);
            if(typeof result.data.errors.cpf_cnpj != 'undefined')
                alert(result.data.errors.cpf_cnpj[0]);
            if(typeof result.data.errors.terms != 'undefined')
                alert(result.data.errors.terms[0]);
            if(typeof result.data.errors.birthday != 'undefined')
                alert(result.data.errors.birthday[0]);
        }
    })
}
