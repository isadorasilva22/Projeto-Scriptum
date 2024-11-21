async function listarEndereco(){
    let return_data = JSON.parse(localStorage.getItem("user"));




    let access_token = return_data.access_token;




    let response = await
    fetch("https://go-wash-api.onrender.com/api/auth/address",{
        method: "GET",
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
        else
        {
            exibirCadastros(result['data']);
        }
    });
}




async function exibirCadastros(dados){
    let tbody = document.querySelector("#enderecoTabela tbody")
    tbody.innerHTML = " "; //limpa a tabela antes de adicionar os dados
    for(let i=0;i<dados.length;i++)
    {
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${dados[i].id}</td>
        <td>${dados[i].title}</td>
        <td>${dados[i].cep}</td>
        <td>${dados[i].address}</td>
        <td>${dados[i].number}</td>
        <td>
            <button class='btn edit' onclick="update(${dados[i].id})"><i class='fas fa-pencil'></i></button> &nbsp; 
            <button class='btn delete' onclick="deleteEndereco(${dados[i].id})"><i class='fas fa-trash'></i></button>
        </td>
        `  
        tbody.appendChild(tr);
    }
}

listarEndereco();

// função update

function update(id){
    window.open("../view/update.html?id="+id, "_self")
}

async function deleteEndereco(id){
   
    var token = JSON.parse(localStorage.getItem("user"));

    if(confirm("Tem certeza que deseja deletar esse endereço?") == false){
        return false;
    }

    let api = await fetch("https://go-wash-api.onrender.com/api/auth/address/"+id, {
        method: "DELETE",
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
            alert("Endereço excluído com sucesso");
            window.location.reload();
        }
    })
}
