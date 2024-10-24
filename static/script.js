document.addEventListener('DOMContentLoaded', () => {
    const animalInputs = document.querySelectorAll('input[name="animal"]');
    const animalImage = document.getElementById('animal-image');
    const uploadForm = document.getElementById('upload-form');
    const fileInfo = document.getElementById('file-info');

    animalInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const animal = e.target.value;
            animalImage.innerHTML = `<img src="/static/${animal}.jpg" alt="${animal}">`;
        });
    });

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);
        const selectedAnimal = document.querySelector('input[name="animal"]:checked');
        
        if (!selectedAnimal) {
            alert('Please select an animal before uploading.');
            return;
        }

        formData.append('animal', selectedAnimal.value);

        try {
            const response = await fetch('/upload/', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                fileInfo.innerHTML = `
                    <p>Filename: ${data.filename}</p>
                    <p>File size: ${data.file_size} bytes</p>
                    <p>Content type: ${data.content_type}</p>
                `;
            } else {
                fileInfo.innerHTML = '<p>Error uploading file</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            fileInfo.innerHTML = '<p>Error uploading file</p>';
        }
    });
});
