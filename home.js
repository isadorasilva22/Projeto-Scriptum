window.onload = function(){

    let return_data = JSON.parse(localStorage.getItem("user"));

    let access_token = return_data.access_token;
    
    let user = return_data.user;

    document.getElementById("user_name").innerHTML = `Olá, ${user.name}`;
}

function logout(){
    
    if(confirm("Tem certeza que deseja sair?")== false){
        return false;
    }

    localStorage.removeItem('user');

    window.open("../view/login.html", "_self");

}