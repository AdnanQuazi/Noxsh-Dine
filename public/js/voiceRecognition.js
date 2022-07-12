


let isListening = false;
let tracks = [];

if (!navigator.mediaDevices.getUserMedia) {
  alert('getUserMedia not supported on your browser!');
}

// const searchForm = document.querySelector("#search-form");
const searchFormInput = document.querySelector(".voice-Inp"); // <=> document.querySelector("#search-form input");
const info = document.querySelector(".info");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";

  // searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
  // searchFormInput.style.paddingRight = "50px";

  const micBtn = document.querySelector(".bi-mic-fill");
  const micIcon = document.querySelector(".bi-mic-fill");

  
  const micBtnClick = async()=>{
    if(micBtn.classList.contains("bi-mic-fill")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
      if (!isListening) {
        try {
          let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          let distortion = audioCtx.createWaveShaper();
          let gainNode = audioCtx.createGain();
          let biquadFilter = audioCtx.createBiquadFilter();
          let analyser = audioCtx.createAnalyser();
          analyser.minDecibels = -90;
          analyser.maxDecibels = -10;

          analyser.fftSize = 256;
          document.querySelector('.mic').style.display = 'inline-flex'
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          isListening = true;
          
          tracks = stream.getTracks();
          source = audioCtx.createMediaStreamSource(stream);
          source.connect(distortion);
          distortion.connect(biquadFilter);
          biquadFilter.connect(gainNode);
          gainNode.connect(analyser);
    
          requestAnimationFrame(function log() {
            let bufferLength = analyser.frequencyBinCount;
            let dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);
            let level = Math.max.apply(null, dataArray);
            level < 100 ? (level = 100) : (level = level);
            level > 170 ? (level = 170) : (level = level);
            
            
            document.querySelector('.mic').style.transform = `translate(-50%,-50%) scale(${level / 100})`;

           


            requestAnimationFrame(log);
          });
        } catch (err) {
          console.log('The following gUM error occured: ' + err);
        }
      } else {
        isListening = false;
        tracks.forEach((track) => {
          track.stop();
        });
      }
    }
    else {
      recognition.stop();
    }
  }
  
  micBtn.addEventListener("click", micBtnClick);
  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micBtn.classList.remove("bi-mic-fill");
    micBtn.classList.add("bi-mic-mute-fill");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

 
  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    // if(transcript.toLowerCase().trim()==="stop recording") {
    //   recognition.stop();
    // }
    // else if(!searchFormInput.value) {
    //   searchFormInput.value = transcript;
    // }
    // else {
    //   if(transcript.toLowerCase().trim()==="go") {
    //     searchForm.submit();
    //   }
    //   else if(transcript.toLowerCase().trim()==="reset input") {
    //     searchFormInput.value = "";
    //   }
    //   else {
    //     searchFormInput.value = transcript;
    //   }
    // }
    searchFormInput.value = transcript;
    searchFormInput.focus();
    setTimeout(() => {
      searchFormInput.blur();
    }, 500);
    recognition.stop()
    tracks.forEach(track =>{
      isListening = false
      track.stop()
    })
  }

  
  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micBtn.classList.remove("bi-mic-mute-fill");
    micBtn.classList.add("bi-mic-fill");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

}
else {
  console.log("Your Browser does not support speech Recognition");
  info.textContent = "Your Browser does not support Speech Recognition";
}








