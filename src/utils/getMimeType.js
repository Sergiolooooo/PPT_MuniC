// utils/getMimeType.js

function getMimeType(buffer) {
    const header = buffer.toString("hex", 0, 4).toLowerCase();

    switch (header) {
        case "89504e47": return "image/png";   // PNG
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8": return "image/jpeg";  // JPG/JPEG
        default: return "application/octet-stream"; // Fallback
    }
}

module.exports = {
    getMimeType
};
