const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Configurar Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userDir = path.join(__dirname, 'uploads', req.body.userId);
        fs.mkdirSync(userDir, { recursive: true });
        cb(null, userDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Ruta para subir imagen
app.post('/api/subir-imagen', upload.single('imagen'), (req, res) => {
    if (req.file) {
        res.json({ mensaje: 'Imagen subida con éxito' });
    } else {
        res.status(400).json({ error: 'No se pudo subir la imagen' });
    }
});

// Ruta para obtener imágenes de un usuario
app.get('/api/imagenes/:userId', (req, res) => {
    const userDir = path.join(__dirname, 'uploads', req.params.userId);
    fs.readdir(userDir, (err, files) => {
        if (err) {
            res.status(500).json({ error: 'Error al leer las imágenes' });
        } else {
            res.json(files);
        }
    });
});

// Ruta para borrar imagen
app.delete('/api/borrar-imagen/:userId/:nombreImagen', (req, res) => {
    const rutaImagen = path.join(__dirname, 'uploads', req.params.userId, req.params.nombreImagen);
    fs.unlink(rutaImagen, (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al borrar la imagen' });
        } else {
            res.json({ mensaje: 'Imagen borrada con éxito' });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Perfil.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));