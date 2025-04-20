const API_URL = 'http://localhost:3000/api/incidencias';
const form = document.getElementById('incidencia-form');
let editandoid = null; // Variable para almacenar el ID de la incidencia que se está editando
const container = document.getElementById('incidencias-container');

// Cargar incidencias al iniciar
window.addEventListener('DOMContentLoaded', fetchIncidencias);

// Crear nueva incidencia
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const incidencia = {
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        prioridad: document.getElementById('prioridad').value
    };

    let url = API_URL;
    let method = 'POST';

    if (editandoId) {
        incidencia.estado = 'abierta'; // o mantené el valor anterior si querés traerlo luego
        url += `/${editandoId}`;
        method = 'PUT';
    }

    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incidencia)
    });

    if (res.ok) {
        form.reset();
        editandoId = null;
        fetchIncidencias();
    }
});

async function editarIncidencia(id) {
    const res = await fetch(`${API_URL}`);
    const data = await res.json();
    const inc = data.find(i => i.id === id);

    if (inc) {
        document.getElementById('titulo').value = inc.titulo;
        document.getElementById('descripcion').value = inc.descripcion;
        document.getElementById('prioridad').value = inc.prioridad;
        editandoId = id;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const nueva = {
//         titulo: document.getElementById('titulo').value,
//         descripcion: document.getElementById('descripcion').value,
//         prioridad: document.getElementById('prioridad').value
//     };

//     const res = await fetch(API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(nueva)
//     });

//     if (res.ok) {
//         form.reset();
//         fetchIncidencias();
//     }
// });

// Obtener y mostrar incidencias
// async function fetchIncidencias() {
//     const res = await fetch(API_URL);
//     const data = await res.json();

//     container.innerHTML = '';
//     data.forEach(inc => {
//         const div = document.createElement('div');
//         div.className = 'incidencia';
//         div.innerHTML = `
//         <h3>${inc.titulo}</h3>
//         <p>${inc.descripcion}</p>
//         <p><strong>Prioridad:</strong> ${inc.prioridad}</p>
//         <p><strong>Estado:</strong> ${inc.estado}</p>
//         <button onclick="eliminarIncidencia(${inc.id})">Eliminar</button>
//         `;
//         container.appendChild(div);
//     });
// }
async function fetchIncidencias() {
    const res = await fetch(API_URL);
    const data = await res.json();

    container.innerHTML = '';
    data.forEach(inc => {
        const div = document.createElement('div');
        div.className = `incidencia p-4 rounded-lg shadow bg-white border-l-8 ${getPriorityColor(inc.prioridad)}`;
    
        div.innerHTML = `
            <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold">${inc.titulo}</h3>
            <div>
                <button onclick="editarIncidencia(${inc.id})" class="text-blue-600 hover:underline mr-2">Editar</button>
                <button onclick="eliminarIncidencia(${inc.id})" class="text-red-600 hover:underline">Eliminar</button>
            </div>
            </div>
            <p class="text-sm text-gray-600 mb-1">${inc.descripcion}</p>
            <p class="text-sm"><strong>Prioridad:</strong> ${inc.prioridad}</p>
            <p class="text-sm"><strong>Estado:</strong> ${inc.estado}</p>
        `;
        container.appendChild(div);
    });
}

// Colores según prioridad
function getPriorityColor(prioridad) {
    switch (prioridad) {
        case 'alta':
            return 'border-red-500';
        case 'media':
            return 'border-yellow-400';
        case 'baja':
            return 'border-green-500';
        default:
            return 'border-gray-300';
    }
}


// Eliminar incidencia
async function eliminarIncidencia(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (res.ok) fetchIncidencias();
}
