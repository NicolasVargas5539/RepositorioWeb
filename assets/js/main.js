function selectTab(tabNumber) {
    // Ocultar todos los banners
    const banners = document.querySelectorAll('.banner');
    banners.forEach(banner => banner.classList.remove('active'));

    // Mostrar el banner correspondiente
    const selectedBanner = document.getElementById(`banner${tabNumber}`);
    selectedBanner.classList.add('active');

    // Ocultar todo el contenido
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));

    // Mostrar el contenido correspondiente
    const selectedContent = document.getElementById(`content${tabNumber}`);
    selectedContent.classList.add('active');

    // Desactivar todas las pestañas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Activar la pestaña seleccionada
    tabs[tabNumber - 1].classList.add('active');
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    selectTab(1); // Selecciona el primer tab por defecto
});



// -------------Creacion de Tarjetas-----------------

document.addEventListener("DOMContentLoaded", () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.tabs.forEach(tab => {
                const contentDiv = document.getElementById(`content${tab.id}`);
                let cards = '';

                tab.projects.forEach(project => {
                    cards += `
                    <div class="card mb-3 wow animate__animated animate__fadeIn" data-wow-delay="${project.time}">
                        <div class="card-body">
                            <div class="card-content">
                                <h3 class="card-title">${project.title}</h3>
                                <img src="./assets/img/${project.img}" class="img-fluid px-5 py-2" alt="${project.title}">
                                <p class="card-text">${project.description}</p>
                            </div>
                        </div>
 
                        <button type="button" data-bs-toggle="modal" data-bs-target="#Modal${project.id}" class="card-button fw-bold">Ver proyecto</button>
                    </div>

                    `;
                });

                contentDiv.innerHTML = cards;
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});
