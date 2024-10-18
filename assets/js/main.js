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
                    // Generamos dinámicamente los elementos de tecnología
                    let tecnologiasHTML = '';
                    if (project.modal && project['modal-title']) {
                        Object.keys(project.modal).forEach((key, index) => {
                            const icono = project.modal[`icon${index + 1}`];
                            const titulo = project['modal-title'][`title${index + 1}`];
                            tecnologiasHTML += `
                                <div class="tecnologias-desc mx-2">
                                    <h6>${titulo}</h6>
                                    <i class="${icono} fa-2x"></i>
                                </div>
                            `;
                        });
                    }

                    cards += `
                    <div class="card mb-3 wow animate__animated animate__fadeIn" data-wow-delay="${project.time}">
                        <div class="card-body">
                            <div class="card-content">
                                <h3 class="card-title">${project.title}</h3>
                                <img src="./assets/img/${project.img}" class="img-fluid px-5 py-2" alt="${project.title}">
                                <p class="card-text">${project.description}</p>
                            </div>
                        </div>

                        <button type="button" data-bs-toggle="modal" data-bs-target="#Modal${project.nModal + project.id}" class="card-button fw-bold">Ver proyecto</button>
                    </div>

                    <!-- Modal -->
                    <div class="modal fade" id="Modal${project.nModal + project.id}" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="btn-close btn-modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="card-modal">
                                        <div class="card-modal-details">
                                            <div class="row">
                                                <div class="col-12 col-lg-6 align-self-center">
                                                    <img src="./assets/img/${project.img}" class="img-fluid"
                                                        alt="Proyectos monodual ${project.title}">
                                                </div>
                                                <div class="col-12 col-lg-6">
                                                    <h1>${project.title}</h1>
                                                    <p>${project.description}</p>
                                                    <br>
                                                    <div class="tecnologias text-center">
                                                        <h2>${project.nModal === 'app' ? 'Plataformas' : 'Tecnologías'}</h2>
                                                        <div class="tecnologias-icons d-flex justify-content-center">
                                                            ${tecnologiasHTML} <!-- Aquí se inserta el HTML generado -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" class="card-modal-button">More info</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });

                contentDiv.innerHTML = cards;
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});
