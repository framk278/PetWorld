// Configuración de Firebase (asegúrate de que esto esté en tu archivo)
const firebaseConfig = {
    // Tu configuración de Firebase aquí
};

// Inicializar Firebase si no está inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
const storage = firebase.storage(); 