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
        for (i = 0; i < length; i++) {
            temp += "<tr>";
            temp += "<td>" + data[i].nome + "</td>";
            temp += "<td>" + data[i].cognome + "</td>";
            temp += "<td>" + data[i].email + "</td>";
            temp += "<td>";
            var ruoli_length = data[i].ruoli.length;
            for (j = 0; j < ruoli_length; j++) {
                temp += data[i].ruoli[j].tipologia + " ";
            }
            temp += "</td>";
            temp += `<td><button type="button" class="btn btn-primary me-2" onclick="window.location.href = '/update.html?email=${data[i].email}'">Modifica</button>`;
            temp += `<button type="button" class="btn btn-danger" onclick="window.location.href = '/delete.html?email=${data[i].email}'">Elimina</button></td>`;
            temp += "</tr>";
        }
        document.getElementById("tabella-utenti").innerHTML += temp;
    } catch (error) {
        console.error('Errore durante la chiamata REST:' + error);
    }
}

getUsers();