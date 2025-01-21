document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.search');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const wordInput = document.getElementById('word');
        const word = wordInput.value.trim();
        
        if (!word) {
            console.log('Please enter a word');
            return;
        }
        
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
            if (!response.ok) {
                throw new Error('Word not found');
            }
            const data = await response.json();
            console.log('API Response:', data);
            
            if (data && data[0] && data[0].meanings && data[0].meanings[0]) {
                const firstMeaning = data[0].meanings[0];
                console.log('Part of Speech:', firstMeaning.partOfSpeech);
                console.log('Definition:', firstMeaning.definitions[0].definition);
                if(data[0].meanings[1]) {
                    console.log('Definition: ', data[0].meanings[1].definitions[0].definition);
                }
                if(data[0].meanings[2]) {
                    console.log('Definition: ', data[0].meanings[2].definitions[0].definition);
                }
            }
            wordInput.value = '';
            
        } catch (error) {
            console.error('Error:', error.message);
        }
    });
});