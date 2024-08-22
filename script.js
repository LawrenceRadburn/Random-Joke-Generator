const jokeOutputBox = document.getElementById("joke");
const helpButton = document.querySelector(".help-button");
const jokeArea = document.getElementsByClassName("joke-area");
const jokeParagraph = document.getElementById("joke-paragraph");
const explanationBox = document.createElement("div");
const clipboardButton = document.querySelector(".clipboard-btn");
const generateRandomJokePage = document.getElementById("generate-random-joke-page");
let currentJoke = '';

function getRandomJokeFile() {
    const jokesFolder = 'jokes/';
    const jokeFiles = [
        'what-do-you-call-cheese-that-isnt-yours.html',
        'why-dont-candles-ever-get-mad.html',
        'whats-the-hardest-part-about-a-zombie-apocalypse.html',
        'why-dont-graveyards-get-overcrowded.html'
    ];

    const randomIndex = Math.floor(Math.random() * jokeFiles.length);
    return jokesFolder + jokeFiles[randomIndex];
}


generateRandomJokePage.addEventListener("click", () => {
    const randomJokePage = getRandomJokeFile();

    if(randomJokePage) {
        window.location.href = randomJokePage;
    }
    else {
        console.log("No more joke files to load.");
    }
});


explanationBox.style.position = "absolute";
explanationBox.style.border = "2px solid black";
explanationBox.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
explanationBox.style.padding = "10px";
explanationBox.style.display = "none";
document.body.appendChild(explanationBox);

function fadeOut() {
    jokeParagraph.classList.remove('fade-in');
    jokeParagraph.classList.add('fade-out');
    jokeParagraph.style.opacity = 0;
}

function fadeIn() {
    jokeParagraph.classList.remove('fade-out');
    jokeParagraph.classList.add('fade-in');
    jokeParagraph.style.opacity = 1;
}

function fetchJokes() {
    // Fade out the current joke
    fadeOut();
    
    // After the fade-out transition completes, fetch the new joke
    setTimeout(() => {
    fetch('http://localhost/jokes_app/Random%20Joke%20Generator/get_jokes.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log("Error:", data.error);
            return;
        }
            jokeParagraph.innerHTML = `${data.question}<br><br>${data.joke}`;
            currentExplanation = data.explanation;
            currentJoke = `${data.question}\n${data.joke}`;
            jokeParagraph.style.opacity = 0;
            void jokeParagraph.offsetWidth;

            fadeIn();
    })
    .catch(error => console.error('Error:', error));
    }, 1000);
}

fetchJokes();
setInterval(fetchJokes, 5000);

helpButton.addEventListener("mouseover", (event) => {
    explanationBox.style.display = 'block';
    const buttonRect = helpButton.getBoundingClientRect();
    explanationBox.style.left = `${buttonRect.left + window.scrollX - explanationBox.offsetWidth - 10}px`;
    explanationBox.style.top = `${buttonRect.top + window.scrollY - explanationBox.offsetHeight - 10}px`;
    explanationBox.innerHTML = currentExplanation;
});

// Hide explanation on mouseout
helpButton.addEventListener("mouseout", () => {
    explanationBox.style.display = "none";
})

function copyToClipBoard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

clipboardButton.addEventListener("click", () => {
    if (currentJoke) {
        copyToClipBoard(currentJoke);
        alert("Joke copied to clipboard!");
    } else {
        alert("No joke available to copy");
    }
});


// Lazy Loading

document.addEventListener('DOMContentLoaded', () => {
    let isLoading = false;
    let jokesLoaded = 0;

    const jokesFolder = 'jokes/';
    const jokeFiles = [
        'what-do-you-call-cheese-that-isnt-yours.html',
        'why-dont-candles-ever-get-mad.html',
        'whats-the-hardest-part-about-a-zombie-apocalypse.html',
        'why-dont-graveyards-get-overcrowded.html'
    ];

    function getRandomJokeFile() {
        if (jokeFiles.length === 0) return null; // If no more files are left, return null
        const randomIndex = Math.floor(Math.random() * jokeFiles.length);
        return jokesFolder + jokeFiles.splice(randomIndex, 1)[0]; // Remove the selected file from the array
    }

    function loadMoreJokes() {
        if (isLoading) return;
        isLoading = true;

        const jokeFile = getRandomJokeFile();
        if (!jokeFile) {
            console.log("No more joke files to load.");
            return;
        }

        const contentContainer = document.getElementById("content-container");
        const newContent = document.createElement('div');
        newContent.classList.add('new-content');

        fetch(jokeFile)
        .then(response => response.text())
        .then(html => {
            newContent.innerHTML = html;
            contentContainer.appendChild(newContent);

            newContent.style.height = '100vh';

            // Hide the <nav> element within the new content

            const navElements = newContent.querySelectorAll('nav')
            navElements.forEach(nav => {
                nav.style.display = 'none';
            });


            isLoading = false;

            contentLoaded = false;

        })
        .catch(error => {
            console.error('Error loading joke:', error);
            isLoading = false;
        });
    }

    let contentLoaded = false;
    
    window.addEventListener('scroll', () => {
        if(!contentLoaded && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
            loadMoreJokes();
            contentLoaded = true;
        }
    });

    loadMoreJokes();
    
});