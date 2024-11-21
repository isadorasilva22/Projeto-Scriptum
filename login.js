const url = 'https://go-wash-api.onrender.com/api/login';

function loginUsuario() {
   
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (email === "" || password === "") 
    {
      alert("Please enter both email and password.");
      return;
    }
    
    let button = document.getElementById("button-login");
    button.innerHTML = "<i class='fa-solid fa-circle-notch fa-spin'> </i>";
    
    let api = fetch(url, {
        method: "POST",
        body:JSON.stringify({
            "email":email,
            "user_type_id":1,
            "password": password,
        }),
        headers:{
            'Content-Type' : 'application/json' //Json porque consegue se comunicar  com informações no estilo (lembrar sobre e pesquisar, possível questão de prova)
        }
    }).then(response => response.json())
    .then(result => {
        if(result.access_token)
        {
            localStorage.setItem('user', JSON.stringify(result))
            window.open("../view/home.html", "_self")
        }
        else
        {
            button.innerHTML = "Login";
            alert(result.data.errors);
        }
    })
  }  
