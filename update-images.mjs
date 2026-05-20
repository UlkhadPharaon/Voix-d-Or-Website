import fs from 'fs';
import path from 'path';

// Dossiers à parcourir
const SRC_DIR = path.resolve('src');
const PUBLIC_DIR = path.resolve('public');

// Extensions à rechercher
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.PNG', '.JPEG'];

// Regex pour trouver les chemins d'images (ex: /assets/images/Onset_image10.jpeg ou /assets/team/Kheops.jpg)
// On cherche n'importe quelle chaîne qui contient une extension visée.
const imagePathRegex = new RegExp(`([^"'\`\\s]+\\.(?:${EXTENSIONS.map(e => e.replace('.', '')).join('|')})){1}`, 'gi');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

function processFiles() {
    const files = getAllFiles(SRC_DIR);
    let totalReplaced = 0;

    files.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf-8');
        let modified = false;

        const newContent = content.replace(imagePathRegex, (match) => {
            // On s'assure qu'on n'a pas des liens externes http://
            if (match.startsWith('http')) return match;
            
            // Le "match" est un chemin relatif ou absolu depuis "public", par ex: "/assets/images/Audio image.jpg"
            // On veut vérifier si la version ".webp" existe dans "public/"
            let newExtension = '.webp';
            let webpMatch = match.replace(/\.[^/.]+$/, newExtension);
            
            // Reconstruire le chemin physique dans le système de fichiers
            // Si le chemin commence par "/", on l'enlève pour path.join
            let cleanPath = match.startsWith('/') ? match.slice(1) : match;
            // Gérer les URL d'assets absolues dans public
            let absoluteWebpPath = path.join(PUBLIC_DIR, cleanPath.replace(/\.[^/.]+$/, newExtension));

            // Decode URI component for files like "for formation 2.webp"
            try {
               absoluteWebpPath = decodeURIComponent(absoluteWebpPath);
            } catch(e) {}

            if (fs.existsSync(absoluteWebpPath)) {
                modified = true;
                totalReplaced++;
                console.log(`[REPLACED] in ${path.relative(process.cwd(), filePath)}: ${match} -> ${webpMatch}`);
                return webpMatch;
            } else {
                // Pour débuguer : voir quelles images ne sont pas converties
                // console.log(`[NOT FOUND] WebP version of ${match} not found at ${absoluteWebpPath}`);
                return match; // Ne pas modifier
            }
        });

        if (modified) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
        }
    });

    console.log(`\nTerminé ! ${totalReplaced} liens d'images ont été mis à jour vers .webp.`);
}

processFiles();
