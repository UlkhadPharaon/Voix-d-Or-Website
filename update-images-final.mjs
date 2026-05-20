import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('src');
const PUBLIC_DIR = path.resolve('public');

// Mappings manuels pour les fichiers dont le nom a changé (ex: Audio image -> Audio verticale)
const manualMappings = {
    "/assets/images/Audio image.jpg": "/assets/images/Audio verticale.webp",
    "/images/mentor-ulkhad.jpg": "/assets/team/Ulkhad.webp",
    "/images/mentor-poloxi.jpg": "/assets/team/Poloxi.webp"
};

// Regex pour capturer les chemins d'images (y compris avec des espaces)
// Exclut les URL externes (http/https) dans la fonction replace.
const imagePathRegex = /([^"'`]+\.(?:jpg|jpeg|png|JPG|PNG|JPEG))/gi;

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
            // Ignorer les URLs externes comme youtube.com ou transparenttextures.com
            if (match.includes('http') || match.includes('transparenttextures') || match.includes('youtube.com')) {
                return match;
            }

            // Ignorer les logos et brands qui n'ont pas été convertis (car toujours en png/jpg)
            if (match.includes('/assets/logo/') || match.includes('/assets/brands/')) {
                return match;
            }

            // 1. Vérifier les mappings manuels (noms différents)
            if (manualMappings[match]) {
                modified = true;
                totalReplaced++;
                console.log(`[MAPPING MANUEL] ${path.relative(process.cwd(), filePath)}: ${match} -> ${manualMappings[match]}`);
                return manualMappings[match];
            }

            // 2. Remplacement générique d'extension
            let webpMatch = match.replace(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/i, '.webp');
            
            // Vérifier si le fichier existe physiquement dans /public
            let cleanPath = match.startsWith('/') ? match.slice(1) : match;
            let absoluteWebpPath = path.join(PUBLIC_DIR, cleanPath.replace(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/i, '.webp'));
            
            try {
               absoluteWebpPath = decodeURIComponent(absoluteWebpPath);
            } catch(e) {}

            if (fs.existsSync(absoluteWebpPath)) {
                modified = true;
                totalReplaced++;
                console.log(`[REPLACED] ${path.relative(process.cwd(), filePath)}: ${match} -> ${webpMatch}`);
                return webpMatch;
            } else {
                console.log(`[MANQUANT - NON REMPLACÉ] Version WebP introuvable pour : ${match}`);
                return match;
            }
        });

        if (modified) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
        }
    });

    console.log(`\n======================================================`);
    console.log(`Terminé ! ${totalReplaced} images supplémentaires ont été mises à jour.`);
    console.log(`======================================================\n`);
}

processFiles();
