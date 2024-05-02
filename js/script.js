if(document.getElementById("get-form") != null){
    const getUser_form = document.getElementById("form");
    getUser_form.addEventListener("submit", function(e){
        e.preventDefault();
        getUser();
    });
}
async function getUser(){
    const email = decodeURIComponent(document.getElementById("email").value);
    console.log(email);
    try{
        const response = await fetch(`http://127.0.0.1:8080/api/utente/trova?email=${email}`);
        var temp = "";
        if (!response.ok) {
            temp= "<p class='error'>404: Utente non trovato</p>"
            document.getElementById("tabella-utente").innerHTML = temp;
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        temp = "<tr><th>Nome</th><th>Cognome</th><th>Email</th><th>Ruoli</th></tr>";

        temp+="<tr>";
        temp+="<td>" + data.nome + "</td>";
        temp+="<td>" + data.cognome + "</td>";
        temp+="<td>" + data.email + "</td>";
        temp+="<td>";
        var ruoli_length = data.ruoli.length;
        for(i = 0; i < ruoli_length; i++){
            temp+= data.ruoli[i].tipologia + " ";
        }
        temp+="</td>";
        document.getElementById("tabella-utente").innerHTML=temp;
    } catch (error) {
        console.error('Errore durante la chiamata REST:' + error);
    }
}


//----------------------------------------------------------------------
if(document.getElementById("register-form") != null){
    const register_form = document.getElementById("register-form");
    register_form.addEventListener("submit", function(e){
        e.preventDefault();
        register();
    });
}
async function register(){
    const nome = document.getElementById("nome").value;
    const cognome = document.getElementById("cognome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('http://127.0.0.1:8080/api/utente/registrazione', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "nome": nome,
                "cognome": cognome,
                "email": email,
                "password": password
            }),
        });

        if (!response.ok) {
            document.getElementById("error").style.display = "block";
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        await response.json();
        window.location.href = `/getUsers.html`;
    } catch (error) {
        console.error('Errore:', error);
    }
}




//---------------------------------------------------------------------------------------------------------------
async function getUsers() {
    try {
        const response = await fetch('http://127.0.0.1:8080/api/utente/trova/tutti');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        const length = data.length;
        var temp = "";
        for(i = 0; i < length; i++){
            temp+="<tr>";
            temp+="<td>" + data[i].nome + "</td>";
            temp+="<td>" + data[i].cognome + "</td>";
            temp+="<td>" + data[i].email + "</td>";
            temp+="<td>";
            var ruoli_length = data[i].ruoli.length;
            for(j = 0; j < ruoli_length; j++){
                temp+= data[i].ruoli[j].tipologia + " ";
            }
            temp+="</td>";
        }
        document.getElementById("tabella-utenti").innerHTML+=temp;
    }
    catch (error) {
        console.error('Errore durante la chiamata REST:' + error);
    }
}


//-----------------------------------------------------------------------------------------------------
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.get('email') != null){
    var email = urlParams.get('email');  
}
async function getUserInfo(){
    try{
        const response = await fetch(`http://127.0.0.1:8080/api/utente/trova?email=${email}`);
        if (!response.ok) {
            window.location.href = '/register.html';
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById('nome').value = data.nome;
        document.getElementById('cognome').value = data.cognome;
        console.log(data);
       
    } catch (error) {
        console.error('Errore durante la chiamata REST:' + error);
    }
}

const update_form = document.getElementById("update-form");
update_form.addEventListener("submit", function(e){
    e.preventDefault();
    update();
});
async function update(){
    const nome = document.getElementById("nome").value;
    const cognome = document.getElementById("cognome").value;
    const ruolo = document.getElementById("ruolo").value;
    try{
        const response = await fetch(`http://127.0.0.1:8080/api/utente/aggiorna`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "nome": nome,
                "cognome": cognome,
                "email": email,
                "ruoloId": ruolo
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        window.location.href = `/getUsers.html`;

    } catch (error){
        console.error('Errore durante la chiamata REST:' + error);
    }
}