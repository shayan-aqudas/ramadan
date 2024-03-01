const apiKey = '$2y$10$6nFkdpEXzcqAJaGP5F1hXhiargNjnROiPpG3XN7yaTTyb3hWdGnG'
let dateUpdate = document.getElementById("date-head");
let arabicDate = document.getElementById('arDate');
let ayat = document.getElementById("ayat");
let surah = document.getElementById('surah');
let nextAyat = document.getElementById("next-ayat");
let previousAyat = document.getElementById("previous");

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



const apiUrl = `https://hadithapi.com/api/hadiths?apiKey=${apiKey}&paginate=10`;
async function getHadith() {
  const data = await fetch(apiUrl);
  const response = await data.json();
  let hadiths = response.hadiths.data;
  let randomHadith = hadiths[Math.floor(Math.random()*hadiths.length)];
}

let randomAyat = Math.floor(Math.random(100)*6236);

async function getAyat(random) {
  const data = await fetch(`https://api.alquran.cloud/v1/ayah/${random}/en.asad`)
  const response = await data.json();
  console.log(response)
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
