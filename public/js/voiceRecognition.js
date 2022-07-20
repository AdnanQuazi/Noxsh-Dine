
let recognition;

const micBtn = document.querySelector(".bi-mic-fill");
const micIcon = document.querySelector(".bi-mic-fill");
const searchFormInput = document.querySelector(".voice-Inp");

const micBtnClick = ()=>{
    if(micBtn.classList.contains("bi-mic-fill")){
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
                recognition = new SpeechRecognition()
                recognition.continuous = false
                recognition.start()
            
              recognition.addEventListener("start", startSpeechRecognition)
              function startSpeechRecognition() {
                  micBtn.classList.remove("bi-mic-fill");
                  micBtn.classList.add("bi-mic-mute-fill");
                  searchFormInput.focus();
                  console.log("Voice activated, SPEAK");
                }
              recognition.addEventListener("result", resultOfSpeechRecognition);
                    function resultOfSpeechRecognition(event){
    
                    const current = event.resultIndex;
                    const transcript = event.results[current][0].transcript;
                    searchFormInput.value = transcript;
                    
                    recognition.stop()
    
    
                    }
                    recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
                    function endSpeechRecognition() {
                      micBtn.classList.remove("bi-mic-mute-fill");
                      micBtn.classList.add("bi-mic-fill");
                      searchFormInput.focus();
                      setTimeout(() => {
                        searchFormInput.blur();
                      }, 500);
                      document.querySelector('.mic').style.display = 'none'
                  
                      console.log("Speech recognition service disconnected");
                    }

    }else{
        recognition.stop()
    }
    
}
    


micBtn.addEventListener('click', micBtnClick);