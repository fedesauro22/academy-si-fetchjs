const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');  
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
    console.log(ruolo);
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

getUserInfo();