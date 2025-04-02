
export const login = (event) => {
    event.preventDefault();
    
    const email = event.target.correo_electronico.value;
    const password = event.target.password1.value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo_electronico: email,
            password1: password
        })
    })
    .then(response => response.json())  // Convertir la respuesta a JSON
    .then(data => {
        const alertContainer = document.getElementById('aja');
        alertContainer.innerHTML = '';

        const alertType = data.success ? 'alert-success' : 'alert-danger';
        const alertMessage = `<div class="alert ${alertType} alert-dismissible fade show" role="alert">${data.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        alertContainer.innerHTML = alertMessage;
        if (data.success) {  // Asumiendo que tu API devuelve un campo "success"
            window.location.href = 'dashboard-cli.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

