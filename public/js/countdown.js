// (function () {

// 	var timeElement, eventTime, currentTime, duration, interval, intervalId;

// 	interval = 1000; // 1 second

//   // get time element
//   timeElement = document.querySelector("time");
// 	// calculate difference between two times
// 	eventTime = moment.tz("2040-11-15T09:00:00", "America/Los_Angeles");
// 	// based on time set in user's computer time / OS
// 	currentTime = moment.tz();
// 	// get duration between two times
// 	duration = moment.duration(eventTime.diff(currentTime));

// 	// loop to countdown every 1 second
// 	setInterval(function() {
// 		// get updated duration
// 		duration = moment.duration(duration - interval, 'milliseconds');

// 		// if duration is >= 0
// 		if (duration.asSeconds() <= 0) {
// 			clearInterval(intervalId);
// 			// hide the countdown element
// 			timeElement.classList.add("hidden");
// 		} else {
// 			// otherwise, show the updated countdown
// 			timeElement.innerText = duration.years() + " years " + duration.days() + " days " + duration.hours() + " hours " + duration.minutes()  + " minutes " + duration.seconds() + " seconds";
// 		}
// 	}, interval);

// }());

const timeI = document.querySelector('.time')
// const currenTIme = new Date
// const dateC =new Date(date.getTime('en-US',{
// }) +  120 * 1000);
// console.log(dateC.getMinutes());
let min = 1;
let sec = 60;

const idInterval = setInterval(()=>{
    if(min == 0 && sec == 0){
        stopInterval()
    }
    if(sec <= 9){ 
       
        timeI.innerHTML = `0${min}:0${sec}`
    }else{
        timeI.innerHTML = `0${min}:${sec}`
    }
    if(sec != 0){
        sec--
    }else{
        min--
        sec = 60
    }

    
},1000)

function stopInterval(){
    clearInterval(idInterval)
}