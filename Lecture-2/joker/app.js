// Toggle Logic
// get the button
const themeToggle = document.getElementById("theme-toggle");

// check for current theme
const currentTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

// set initial toggle
if (currentTheme === "dark"){
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.checked = true;
}

// Toggle theme when clicked - addEventListner
themeToggle.addEventListener("change", function (){
    if (this.checked){
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme","dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme","light");
    }
});


// Jokes fetching logic
const jokeText = document.querySelector('.joke-text');
const categoryButtons = document.querySelectorAll('.category-btn');
const fetchJokeBtn = document.getElementById("fetch-joke");

// initialized category 
let currCategory = 'Random';

// Category mapping to APIs
const categoryMap = {
    'Random': 'https://icanhazdadjoke.com/',
    'Programming': 'https://v2.jokeapi.dev/joke/Programming?type=single',
    'Dad Jokes': 'https://icanhazdadjoke.com/',
    'Puns': 'https://v2.jokeapi.dev/joke/Pun?type=single'
  };

// select category
function setCategoryActive (button) {
    categoryButtons.forEach( btn => btn.classList.remove('active'));
    button.classList.add('active');
    currCategory = button.textContent.trim();
}

// set loading
function setLoading(state) {
    fetchJokeBtn.disable = state;
    fetchJokeBtn.textContent = state ? 'Loading...' : "Get Joke";
} 

// add event listner for the fetch joke button
async function FetchJoke () {
    const url = categoryMap[currCategory] || categoryMap['Random'];
    setLoading(true);

    // fetch the data
    try {
        const headers = url.includes('icanhaz') ? { Accept : 'application/json' } : {};
        const response = await fetch(url, {headers} );

        if (!response.ok) throw new Error("Failed to Fetched Data!");

        const data = await response.json();
        const joke = data.joke || data.delivery || data.setup || 'No Joke Found';
        jokeText.textContent = joke;
    } catch (error) {
        jokeText.textContent = 'Something went wrong (*.*)';
        console.error(error);
    } finally {
        setLoading(false);
    }
}

// category handling
categoryButtons.forEach(btn => {
    btn.addEventListener( "click", () => {
        setCategoryActive(btn);
        FetchJoke();
    })
});

// get the jokes on "get joke" button
fetchJokeBtn.addEventListener( "click", FetchJoke );