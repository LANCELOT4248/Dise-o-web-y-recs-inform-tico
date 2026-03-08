const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => {
navMenu.classList.toggle("active");
});

const audio = document.getElementById("introAudio");
document.addEventListener("click", function () {
audio.muted = false;
audio.play();
},{ once:true });

fetch("../xml/photographers.xml")
.then(response => response.text())
.then(str => (new window.DOMParser()).parseFromString(str,"text/xml"))
.then(data => {
const name = data.getElementsByTagName("name")[0].textContent;
const specialty = data.getElementsByTagName("specialty")[0].textContent;
const experience = data.getElementsByTagName("experience")[0].textContent;
document.getElementById("photographerInfo").innerHTML = `
<p><strong>Nombre:</strong> ${name}</p>
<p><strong>Especialidad:</strong> ${specialty}</p>
<p><strong>Experiencia:</strong> ${experience}</p>
`;
});

fetch("../json/gallery.json")
.then(response => response.json())
.then(data => {
const gallery = document.getElementById("galleryGrid");
data.fotos.forEach(foto => {
const card = document.createElement("div");
card.classList.add("photoCard");
card.innerHTML = `
<img src="${foto.img}" alt="${foto.titulo}">
<p>${foto.titulo}</p>
`;
gallery.appendChild(card);});
});
document.getElementById("formulario").addEventListener("submit", function(e){
e.preventDefault();
alert("Gracias por tu mensaje. Pronto responderé.");
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close");
document.addEventListener("click", function(e){
if(e.target.tagName === "IMG" && e.target.closest(".photoCard")){
lightbox.style.display = "flex";
lightboxImg.src = e.target.src;
}
});
closeBtn.addEventListener("click", () => {
lightbox.style.display = "none";
});

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add("visible");}
});
});
document.querySelectorAll("section").forEach(section =>{
section.classList.add("fade");
observer.observe(section);
});