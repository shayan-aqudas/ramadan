let dateUpdate = document.getElementById("date-head");
let arabicDate = document.getElementById('arDate');
let ayat = document.getElementById("ayat");
let surah = document.getElementById('surah');
let nextAyat = document.getElementById("next-ayat");
let previousAyat = document.getElementById("previous");
let currentPrayer = document.getElementById('current-prayer');
let prayerTime = document.getElementById('prayer-time');
let nextPrayer = document.getElementById('next-prayer');
let nextPTime = document.getElementById("next-time");

let splash = document.querySelector(".text")
setTimeout(()=>{
  splash.style.display = "none"
},3000)


// Heading Date Section
let days = ["Monday","Tuesday","Wednesday","Thirsday","Friday","Saturday","Sunday"];
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

let date = new Date();
dateUpdate.textContent = `${days[date.getDay()-1]}, ${date.getDate()} ${months[date.getMonth()]}`

let arabic = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {day: 'numeric', month: 'long',weekday: 'long',year : 'numeric'}).format(Date.now());
arabicDate.textContent = arabic;

let randomAyat = Math.floor(Math.random(100)*6236);

async function getAyat(random) {
  const data = await fetch(`https://api.alquran.cloud/v1/ayah/${random}/en.asad`)
  const response = await data.json();
  ayat.textContent = response.data.text;
  surah.textContent = `Surah ${response.data.surah.englishName}, Verse-${randomAyat}`;
}
getAyat(randomAyat)
/*
https://api.alquran.cloud/v1/ayah/22/en.asad
*/
nextAyat.addEventListener('click',(e)=>{
  e.preventDefault();
  randomAyat++;
  getAyat(randomAyat);
})
previousAyat.addEventListener('click',(e)=>{
  e.preventDefault();
  randomAyat--;
  getAyat(randomAyat);
})


//Prayer Time

async function getPrayerTime(latitude="28.7464694",longitude="77.2848343"){
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  const url = `https://api.aladhan.com/v1/calendar/${year}/${month+1}?latitude=${latitude}&longitude=${longitude}`
  const data = await fetch(url);
  const response = await data.json();
  const timeArray = response.data[day-1].timings;
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let totalMinutes = hours*60+minutes;
  //For Fajr
  let FajrHour = Number.parseInt(timeArray.Fajr.slice(0,2))
  let FajrMinute = Number.parseInt(timeArray.Fajr.slice(3,5));
  let totalFajrMinutes = FajrHour*60+FajrMinute;
  
  //For Dhuhr
  let DhuhrHour = Number.parseInt(timeArray.Dhuhr.slice(0,2))
  let DhuhrMinute = Number.parseInt(timeArray.Dhuhr.slice(3,5));
  let totalDhuhrMinutes = DhuhrHour*60+DhuhrMinute;
  //For Asr
  let AsrHour = Number.parseInt(timeArray.Asr.slice(0,2))
  let AsrMinute = Number.parseInt(timeArray.Asr.slice(3,5));
  let totalAsrMinutes = AsrHour*60+AsrMinute;
  //For Maghrib
  let MaghribHour = Number.parseInt(timeArray.Maghrib.slice(0,2))
  let MaghribMinute = Number.parseInt(timeArray.Maghrib.slice(3,5));
  let totalMaghribMinutes = MaghribHour*60+MaghribMinute;
  //For Isha
  let IshaHour = Number.parseInt(timeArray.Isha.slice(0,2))
  let IshaMinute = Number.parseInt(timeArray.Isha.slice(3,5));
  let totalIshaMinutes = IshaHour*60+IshaMinute;
  //For SunRise
  let SunriseHour = Number.parseInt(timeArray.Sunrise.slice(0,2))
  let SunriseMinute = Number.parseInt(timeArray.Sunrise.slice(3,5));
  let totalSunriseMinutes = SunriseHour*60+SunriseMinute;
  //For Firstthird
  let FirstthirdHour = Number.parseInt(timeArray.Firstthird.slice(0,2))
  let FirstthirdMinute = Number.parseInt(timeArray.Firstthird.slice(3,5));
  let totalFirstthirdMinutes = FirstthirdHour*60+FirstthirdMinute;
  // For Lastthird
  let LastthirdHour = Number.parseInt(timeArray.Lastthird.slice(0,2))
  let LastthirdMinute = Number.parseInt(timeArray.Lastthird.slice(3,5));
  let totalLastthirdMinutes = LastthirdHour*60+LastthirdMinute;
  //For Midnight
  let MidnightHour = Number.parseInt(timeArray.Midnight.slice(0,2))
  let MidnightMinute = Number.parseInt(timeArray.Midnight.slice(3,5));
  let totalMidnightMinutes = MidnightHour*60+MidnightMinute;
  
  /*
  console.log(
    totalMidnightMinutes,
    totalLastthirdMinutes,
    totalFajrMinutes,
    totalSunriseMinutes,
    totalDhuhrMinutes,
    totalAsrMinutes,
    totalMaghribMinutes,
    totalIshaMinutes,
    totalFirstthirdMinutes
    )
    console.log(totalMinutes)
    */
  
  if(totalMinutes>=totalMidnightMinutes && totalMinutes<=totalLastthirdMinutes){
    currentPrayer.textContent = "Midnight"
    prayerTime.textContent = timeArray.Asr.slice(0,6)+"min";
    nextPrayer.textContent = "Tahajjud"
    nextPTime.textContent = timeArray.Lastthird.slice(0,6)+"min";
  }
  if (totalMinutes>=totalLastthirdMinutes && totalMinutes<=totalFajrMinutes) {
    currentPrayer.textContent = "Tahajjud"
    prayerTime.textContent = timeArray.Lastthird.slice(0,6)+"min";
    nextPrayer.textContent = "Fajr"
    nextPTime.textContent = timeArray.Fajr.slice(0,6)+"min";
  }
  if(totalMinutes>=totalFajrMinutes && totalMinutes<=totalSunriseMinutes){
    currentPrayer.textContent = "Fajr"
    prayerTime.textContent = timeArray.Fajr.slice(0,6)+"min";
    nextPrayer.textContent = "Dhuhr"
    nextPTime.textContent = timeArray.Dhuhr.slice(0,6)+"min";
  }
  if(totalMinutes>=totalSunriseMinutes && totalMinutes<=totalDhuhrMinutes){
    currentPrayer.textContent = "Sunrise"
    prayerTime.textContent = timeArray.Sunrise.slice(0,6)+"min";
    nextPrayer.textContent = "Dhuhr"
    nextPTime.textContent = timeArray.Dhuhr.slice(0,6)+"min";
  }
  if(totalMinutes>=totalDhuhrMinutes && totalMinutes<=totalAsrMinutes){
    currentPrayer.textContent = "Dhuhr"
    prayerTime.textContent = timeArray.Dhuhr.slice(0,6)+"min";
    nextPrayer.textContent = "Asr"
    nextPTime.textContent = timeArray.Asr.slice(0,6)+"min";
  }
  if(totalMinutes>=totalAsrMinutes && totalMinutes<=totalMaghribMinutes){
    currentPrayer.textContent = "Asr"
    prayerTime.textContent = timeArray.Asr.slice(0,6)+"min";
    nextPrayer.textContent = "Maghrib"
    nextPTime.textContent = timeArray.Maghrib.slice(0,6)+"min";
  }
  if(totalMinutes>=totalMaghribMinutes && totalMinutes<=totalIshaMinutes){
    currentPrayer.textContent = "Maghrib"
    prayerTime.textContent = timeArray.Maghrib.slice(0,6)+"min";
    nextPrayer.textContent = "Isha"
    nextPTime.textContent = timeArray.Isha.slice(0,6)+"min";
  }
  if(totalMinutes>=totalIshaMinutes && totalMinutes<=totalFirstthirdMinutes){
    currentPrayer.textContent = "Isha"
    prayerTime.textContent = timeArray.Isha.slice(0,6)+"min";
    nextPrayer.textContent = "Tahajjud"
    nextPTime.textContent = timeArray.Lastthird.slice(0,6)+"min";
  }
  if(totalMinutes>=totalFirstthirdMinutes || totalMinutes<=totalMidnightMinutes){
    currentPrayer.textContent = "Night"
    let hour = date.getHours();
    let minutes = date.getMinutes();
    prayerTime.textContent = hour+":"+minutes;
    nextPrayer.textContent = "Tahajjud"
    nextPTime.textContent = timeArray.Lastthird.slice(0,6)+"min";
  }
  
  
}
getPrayerTime()

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Please allow location for currect time..")
  }
}

function showPosition(position) {
  if(position.coords.latitude){
    getPrayerTime(position.coords.latitude,position.coords.longitude);
    lat.textContent = position.coords.latitude;
  }
}
getLocation()

//Hadith 
let title = document.getElementById('title');
let hadith = document.getElementById('hadith');
let explain = document.getElementById('explain');
let nextHadith = document.querySelector('.next-hadith');

async function getHadith(){
  let randomId = Math.floor(Math.random()*3+1);
  const url = `https://hadeethenc.com/api/v1/hadeeths/list/?language=ur&category_id=${randomId}&page=1&per_page=600`
  const data = await fetch(url);
  const response = await data.json();
  let randomHadith = Math.floor(Math.random()*response.data.length);
  let hadithId = Number.parseInt(response.data[randomHadith].id);
  const url2 = `https://hadeethenc.com/api/v1/hadeeths/one/?language=ur&id=${hadithId}`
  const data2 = await fetch(url2);
  const response2 = await data2.json();
  title.textContent = response2.title;
  hadith.textContent = response2.hadeeth;
  explain.textContent = response2.explanation;
  console.log(response2)
}
getHadith()

nextHadith.addEventListener('click',(e)=>{
  e.preventDefault();
  getHadith();
})
