var login_form = document.getElementById("login-form");
login_form.addEventListener("submit", function(e){
    e.preventDefault();
    login();
});
async function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
        const response = await fetch('http://127.0.0.1:8080/api/utente/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
        });

        if (!response.ok) {
            document.getElementById("error").classList.remove("d-none");
            document.getElementById("success").classList.add("d-none");
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        document.getElementById("success").classList.remove("d-none");
        document.getElementById("error").classList.add("d-none");
    } catch (error) {
        console.error('Errore durante la chiamata REST:' + error);
    }
}
