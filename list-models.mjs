const API_KEY = 'AIzaSyB3ifoU4KSczQZ617eYxieZE7zS_qxrXGs';

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();
        console.log("AVAILABLE MODELS:");
        if (data.models) {
            data.models.forEach(m => console.log(m.name));
        } else {
            console.log(data);
        }
    } catch (e) {
        console.error(e);
    }
}
listModels();
