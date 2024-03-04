class Screen {
  init() {
    this.verifyScreenSize();
    window.addEventListener('resize', () => this.verifyScreenSize());
  }

  verifyScreenSize() {
    if (window.innerHeight > window.innerWidth) {
      document.body.classList.add('vertical');
    } else {
      document.body.classList.remove('vertical');
    }
  }
}

class Piano {
  constructor(audio, pianoKeys, mapedKeys, volumeSlider, keysCheck) {
    this.audio = new Audio(audio);
    this.pianoKeys = document.querySelectorAll(pianoKeys);
    this.mapedKeys = mapedKeys;
    this.volumeSlider = document.querySelector(volumeSlider);
    this.keysCheck = document.querySelector(keysCheck);
  }

  init() {
    this.mappingPianoKeys(this.pianoKeys);
    this.playingTheKeyboard();
    this.volumeControl(this.volumeSlider);
    this.showOrHideKeys();
  }

  mappingPianoKeys(keys) {
    for (let i = 0; i < keys.length; i++) {
      keys[i].addEventListener('click', () => {
        this.playAudioOfKeyPresses(keys[i].dataset.key);
      });

      this.mapedKeys.push(keys[i].dataset.key);
    }
  }

  playingTheKeyboard() {
    document.addEventListener('keydown', (event) => {
      if (this.mapedKeys.includes(event.key)) {
        this.playAudioOfKeyPresses(event.key);
      }
    });
  }

  volumeControl(volumeSlider) {
    volumeSlider.addEventListener('input', (event) => this.ChangeVolume(event));
  }

  showOrHideKeys() {
    this.keysCheck.addEventListener('click', () => this.showHideKeys());
  }

  playAudioOfKeyPresses(key) {
    const clickedKey = document.querySelector(`[data-key="${key}"]`);

    this.addKeyPress(clickedKey);
    this.playKeyAudio(key);
    this.removeKeyPress(clickedKey);
  }

  playKeyAudio(key) {
    this.audio.src = `assets/tunes/${key}.wav`;
    this.audio.play();
  }

  addKeyPress(clickedKey) {
    clickedKey.classList.add('active');
  }

  removeKeyPress(clickedKey) {
    setTimeout(() => {
      clickedKey.classList.remove('active');
    }, 1 * 150);
  }

  ChangeVolume(event) {
    this.audio.volume = event.target.value;
  }

  showHideKeys() {
    for (let i = 0; i < this.pianoKeys.length; i++) {
      this.pianoKeys[i].classList.toggle('hide');
    }
  }
}

const screen = new Screen();

screen.init();

const piano = new Piano(
  'assets/tunes/a.wav',
  '.piano__keys .key',
  [],
  '.volume input',
  '.keys-check input'
);

piano.init();
