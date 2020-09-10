const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Enable/Disable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    //Check if the joke is a single or two parts joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = `${data.joke}`;
    }

    // Text-To-Speech API
    tellMeAJoke(joke);

    // Disable Button While Audio Playing
    toggleButton();
  } catch (error) {
    console.log('Ooops, there was an error: ' + error);
  }
}

// Passing Joke to VoiceRSS API
function tellMeAJoke(joke) {
  VoiceRSS.speech({
    key: '5ff4b1b6ab8143f488a977bc3a2f2a9c',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
