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

async function clima() {
	let url = 'http://api.weatherapi.com/v1/current.json?key=d77faffce58a413dbfb130518242911&q=Sao Paulo&aqi=yes' 
	let api = await fetch( url)

	if(api.ok){
		let resposta = await api.json();
		document.getElementById('txt-temp').innerHTML = resposta.current.temp_c;
		document.getElementById('txt-cidade').innerHTML = resposta.location.name;
}
}

clima();