const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');  
async function deleteUser(){
    try{
        const response = await fetch(`http://127.0.0.1:8080/api/utente/cancella/${email}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = `/getUsers.html`;
    } catch (error) {
        console.error('Errore durante la chiamata REST:' + error);
    }
}

deleteUser();