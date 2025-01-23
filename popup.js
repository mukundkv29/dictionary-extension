document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.search');
    const definitionContainer = document.getElementById('definitions');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const wordInput = document.getElementById('word');
        const word = wordInput.value.trim();
        wordInput.focus();
        definitionContainer.innerHTML = '';
        
        if (!word) {
            console.log('Please enter a word');
            return;
        }
        
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
            console.log(response);
            if (!response.ok) {
                const definitionElement = document.createElement('div');
                definitionElement.innerHTML = `
                    <div class="error-message">Word not found...</div>
                `;
                definitionContainer.appendChild(definitionElement);
            }
            const data = await response.json();
            console.log('API Response:', data);
            
            if (data && data[0] && data[0].meanings && data[0].meanings) {
                for (let i=0;i<Math.min(3,data[0].meanings.length);i++) {
                    if(data[0].meanings[i] && data[0].meanings[i].definitions[0]) {
                        const definition = data[0].meanings[i].definitions[0].definition;
                        const definitionElement = document.createElement('div');
                        definitionElement.className = 'definition';
                        definitionElement.innerHTML = `
                            <div class="definition-number">Definition ${i+1}</div>
                            <div class="definition-text">${definition}</div>
                        `;
                        definitionContainer.appendChild(definitionElement);
                    }
                }
            }
            wordInput.value = '';
            
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

    function showError(message) {
        definitionContainer.innerHTML = `
            <div class="error-message">${message}</div>
        `;
    }
});