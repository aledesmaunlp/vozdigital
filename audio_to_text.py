# 1. Montar Google Drive
from google.colab import drive
drive.mount('/content/drive')

# 2. Instalar dependencias
!pip install -q openai-whisper
!apt install -y -q ffmpeg

import os
import re
import whisper
import glob
from datetime import datetime

# ---- Configuración ----
OUTPUT_DIR = "/content/drive/MyDrive/downloads"          # carpeta donde se guardan .txt y log
AUDIO_DIR = os.path.join(OUTPUT_DIR, "audio")            # carpeta con los audios (MP3, M4A, etc.)
LOG_FILE = os.path.join(OUTPUT_DIR, "00-video_to_txt.md")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def limpiar_nombre(name):
    return re.sub(r'[<>:"/\\|?*]', '_', name).strip()

def obtener_link(audio_path):
    """
    Busca un archivo con el mismo nombre pero extensión .link junto al audio.
    Si existe, devuelve el enlace de YouTube; sino, devuelve 'Sin enlace'.
    """
    base = os.path.splitext(audio_path)[0]
    link_file = base + ".link"
    if os.path.exists(link_file):
        with open(link_file, "r", encoding="utf-8") as f:
            return f.read().strip()
    return "Sin enlace"

# ---- Buscar archivos de audio ----
audio_exts = ("*.mp3", "*.wav", "*.m4a", "*.webm", "*.ogg")
audio_files = []
for ext in audio_exts:
    audio_files.extend(glob.glob(os.path.join(AUDIO_DIR, ext)))

if not audio_files:
    print(f"❌ No se encontraron archivos de audio en: {AUDIO_DIR}")
    print("   Subí los archivos de audio (mp3, m4a, etc.) a esa carpeta y volvé a ejecutar.")
    exit()

print("🧠 Cargando modelo Whisper (small)...")
model = whisper.load_model("small")

# ---- Procesar cada audio ----
for audio_path in audio_files:
    base_name = os.path.splitext(os.path.basename(audio_path))[0]
    print(f"📝 Transcribiendo: {base_name}")
    exito = False
    try:
        result = model.transcribe(audio_path, language="es")
        texto = result["text"]

        safe_title = limpiar_nombre(base_name)
        txt_path = os.path.join(OUTPUT_DIR, f"{safe_title}.txt")
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(texto)

        exito = True
        print(f"   ✅ Transcripción guardada en: {txt_path}")
    except Exception as e:
        print(f"   ❌ Falló la transcripción: {e}")
        exito = False

    # Obtener enlace asociado (si existe el archivo .link)
    link = obtener_link(audio_path)

    # Escribir línea en el log con el formato solicitado
    now = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    emoji = "✅" if exito else "❌"
    linea = f"- {base_name}  {now}  {emoji}  {link}\n"
    with open(LOG_FILE, "a", encoding="utf-8") as log:
        log.write(linea)

print("\n🏁 Procesamiento finalizado.")
print(f"Log actualizado en: {LOG_FILE}")
