var getUser_form = document.getElementById("form");
getUser_form.addEventListener("submit", function(e){
    e.preventDefault();
    getUser();
});
async function getUser(){
    const email = document.getElementById("email").value;
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
        temp += `<td><button type="button" class="btn btn-primary me-2" onclick="window.location.href = '/update.html?email=${data.email}'">Modifica</button>`;
        temp += `<button type="button" class="btn btn-danger" onclick="window.location.href = '/delete.html?email=${data.email}'">Elimina</button></td>`;
        temp+="</tr>";
        document.getElementById("tabella-utente").innerHTML=temp;
    } catch (error) {
        console.error('Errore durante la chiamata REST:' + error);
    }
}