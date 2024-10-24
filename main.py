from fastapi import FastAPI, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pathlib import Path

app = FastAPI()

# Mount the static directory
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    return Path("static/index.html").read_text()

@app.post("/upload/")
async def upload_file(animal: str = Form(...), file: UploadFile = File(...)):
    file_size = file.file.seek(0, 2)
    file.file.seek(0)
    
    return {
        "animal": animal,
        "filename": file.filename,
        "file_size": file_size,
        "content_type": file.content_type
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
