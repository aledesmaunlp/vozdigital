# ============================================================
# PASO 1: Instalación de dependencias (solo en Colab) V.1.0
# ============================================================
!pip install -U yt-dlp -q
!apt update -qq && apt install ffmpeg nodejs -y -qq


# ============================================================
# PASO 1.1: Instalación de dependencias (solo en Colab)
# ============================================================

from google.colab import drive
drive.mount('/content/drive')

import os, yt_dlp

# ============================================================
# PASO 2: Verificar que Node.js está disponible
# ============================================================
ruta_node = None
try:
    # Buscar la ruta exacta de node
    resultado = !which node
    if resultado:
        ruta_node = resultado[0].strip()
    else:
        # A veces el comando 'which' no funciona en algunas celdas, forzamos búsqueda
        for posible in ["/usr/bin/node", "/usr/local/bin/node"]:
            if os.path.exists(posible):
                ruta_node = posible
                break
except:
    pass

if not ruta_node:
    raise RuntimeError("❌ Node.js no se instaló correctamente. Reinicia el entorno de ejecución (Runtime -> Reiniciar) y vuelve a ejecutar esta celda.")
else:
    print(f"✅ Node.js encontrado en: {ruta_node}")

# ============================================================
# PASO 3: Crear la carpeta de destino
# ============================================================
carpeta_destino = "/content/drive/MyDrive/7-Multimedia/Musica"
os.makedirs(carpeta_destino, exist_ok=True)

# ============================================================
# PASO 4: Lista de enlaces (puedes poner los tuyos)
# ============================================================
urls = [
    "https://youtu.be/ra1_wmkOsLU",
    "https://youtu.be/zt69v8MYSWw",
    "https://youtu.be/ZOR_L-uRx3s",
    "https://youtu.be/vV9_t52iEpE",
]

# ============================================================
# PASO 5: Configuración robusta de yt-dlp
# ============================================================
ydl_opts = {
    "format": "bestaudio/best",
    "outtmpl": os.path.join(carpeta_destino, "%(title)s.%(ext)s"),
    "postprocessors": [{
        "key": "FFmpegExtractAudio",
        "preferredcodec": "mp3",
        "preferredquality": "0",
    }],
    "overwrites": True,
    # Usar la ruta exacta de Node.js, así evitamos problemas de PATH
    "js_runtimes": {"node": {"path": ruta_node}},
    # Mostrar más información durante la descarga (útil para depurar)
    "verbose": True,
    # Si quieres evitar el warning del navegador, añadimos un User‑Agent
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    },
}

# ============================================================
# PASO 6: Descargar todos los enlaces
# ============================================================
for i, url in enumerate(urls, 1):
    print(f"\n{'='*50}\n🎵 Descargando {i}/{len(urls)}: {url}\n{'='*50}")
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
    except Exception as e:
        print(f"❌ Error con {url}: {e}")

# ============================================================
# PASO 7: Mostrar los archivos descargados
# ============================================================
print("\n📁 Archivos MP3 en carpeta destino:")
for archivo in sorted(os.listdir(carpeta_destino)):
    if archivo.endswith(".mp3"):
        print("  🎶", archivo)
