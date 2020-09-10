# Joke Teller

%PIC%

%Description%



<br>

---

## Learning outcomes

1. Using [joke API](https://sv443.net/jokeapi/v2/)
2. Using [text-to-speech API](http://www.voicerss.org/api/)
3. Manipulate background of container element
4. Hiding an API key 👉🏻 it should go in the Backend



<br>

----

## Process

<br>



Call a joke API to get a random joke -> pass to a text to speech aPI that will tell us the joke



### Text-To-Speech API



### Joke API

We are using....

We want to create a function that gets the jokes from API

```js
// Get Jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming'
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Check if the joke is a single or two parts joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = `${data.joke}`;
    }
    tellMeAJoke(joke); // for next step: connects both APIs
  } catch(error) {
    console.log('Error: ' + error)
  }
}
```

Because we have both single jokes and jokes with a sept and delivery, we make sure in both cases the text is saved in the variable `joke` so that we can pass in to the other API.

<br>

### Conecting both APIs

We create a `tellMe(joke)` function that accepts a parameter that will be the joke (string). This function will call the text-to-speech API with that text. 

```js
// Passing Joke to VoiceRSS API
function tellMeAJoke(joke) {
  VoiceRSS.speech({
    key: '...',
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    
  })
}
```

<br>



### Manipulating the DOM (button)

```js
// Event Listeners
button.addEventListener('click', getJokes)
```

In order to avoid the user clicking multiple times on the user and get jokes overlap, we disable the button until the joke is finished. We use `ended` event (fires when the current playlist is ended)

```js
audio.addEventListener('ended', toggleButton);

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}
```

⚠️ we also add it when the audio is playing

<br >

---

<br>

## Checklist

- [ ] Make the robot have two states: normal and telling a joke. When the user clicks on the button, the robot should change animation, when it's done, it should go back to the static version.
- [ ] Create another button to ask for jokes in German. Play these audios with a different voice (text-to-speech API).
- [ ] Add joke text as a speech bubble for the robot