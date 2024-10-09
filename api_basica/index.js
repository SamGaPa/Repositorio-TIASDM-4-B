const express = require('express'); // Importando el módulo express para la creación de APIs

const app = express(); // Creando una instancia de express
const PORT = 3000; // Declarar el puerto donde la aplicación será ejecutada

app.use(express.json()); // Middleware para parsear las solicitudes con datos JSON

// Arreglo de tareas inicial
let todos = [
    { id: 1, tareas: 'Comer' },
    { id: 2, tareas: 'Dormir' },
    { id: 3, tareas: 'Tomar' },
    { id: 4, tareas: 'Jugar' },
    { id: 5, tareas: 'Caminar' }
];

// GET: Obtener todas las tareas
app.get('/todos', (req, res) => {
    res.json(todos); // Responder con el arreglo 'todos' en formato JSON
});

// GET: Obtener una tarea por su ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convertir el parámetro ID en número entero
    const tarea = todos.find(e => e.id === id); // Buscar la tarea por su ID
    if (tarea) {
        res.json(tarea); // Si se encuentra, devolver la tarea
    } else {
        res.status(404).send('Tarea no localizada'); // Si no, devolver error 404
    }
});

// POST: Crear una nueva tarea
app.post('/todos', (req, res) => {
    const nuevaTarea = {
        id: todos.length + 1, // Asignar un nuevo ID a la tarea
        tareas: req.body.tareas // Obtener el nombre de la tarea desde el body
    };
    todos.push(nuevaTarea); // Agregar la nueva tarea al arreglo
    res.status(201).json(nuevaTarea); // Responder con la tarea creada
});

// PUT: Actualizar una tarea existente por ID
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convertir el parámetro ID en número entero
    const tarea = todos.find(e => e.id === id); // Buscar la tarea por su ID

    if (tarea) {
        tarea.tareas = req.body.tareas; // Actualizar la propiedad 'tareas'
        res.json(tarea); // Devolver la tarea actualizada
    } else {
        res.status(404).send('Tarea no encontrada'); // Si no se encuentra, devolver error 404
    }
});

// DELETE: Eliminar una tarea por ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convertir el parámetro ID en número entero
    const index = todos.findIndex(e => e.id === id); // Buscar el índice de la tarea por su ID

    if (index !== -1) { // Si se encuentra la tarea
        todos.splice(index, 1); // Eliminar la tarea usando splice
        res.send('Tarea eliminada'); // Confirmar que se ha eliminado
    } else {
        res.status(404).send('Tarea no encontrada'); // Si no se encuentra, devolver error 404
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
 