const register_form = document.getElementById("register-form");
register_form.addEventListener("submit", function(e){
    e.preventDefault();
    register();
});
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
            document.getElementById("error").classList.remove("d-none");
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        await response.json();
        window.location.href = `/getUsers.html`;
    } catch (error) {
        console.error('Errore:', error);
    }
}
