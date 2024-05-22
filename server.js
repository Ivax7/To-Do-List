const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Puerto en el que se ejecutará el servidor

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'todoList.html')); // Envía el archivo HTML principal
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor web iniciado en http://localhost:${PORT}`);
});
