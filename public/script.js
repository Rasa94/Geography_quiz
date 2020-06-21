
import {hallOfFame} from "./hallOfFame.js" 
import {highScore} from "./highScore.js"
import {AddTerm} from "./add.js" 

// Dom elements  
  
    // Categories
let formBtn = document.getElementById('formSubmit');
let select = document.getElementById('select'); 
    // Login
let loginInput = document.getElementById('loginInput');
let login = document.getElementById('login');
    // Form 
let term = document.getElementById('term'); 
let termInput = document.getElementById('termInput'); 
let inputForm = document.getElementById('formNewDocument');    
    // High score
let hallOfFameCall = document.getElementById('hf'); 
let highScoreBtn = document.getElementById('hs');


    // Log in popup

$('#logInModal').modal('hide')

let popup = () => {
    $('#logInModal').modal('show');
}

if(!localStorage.usernameLocal && loginInput.value == ''){
    console.log("empty")
    $('#logInModal').modal('show');
}

// log in listener

let popUp;
login.addEventListener('click', e => { 
    e.preventDefault() 
    let username = loginInput.value;
    localStorage.setItem('usernameLocal', username);
    console.log(localStorage.usernameLocal);
    if(!localStorage.usernameLocal || loginInput.value == '') { 
        popUp = setTimeout(popup, 1000);
    } 
    else if (localStorage.usernameLocal) 
    { 
        clearTimeout(popUp)
    }
}); 

// Term validator

term.addEventListener('click', () => {
    let input = termInput.value;
    // The term can't contain any whitespace or special characters
    let validated = input.replace(/[^a-zA-Z0-9\S*$]/g, '').toLowerCase();  /*(/[^a-zA-Z0-9]/g, '')     ^\S*$*/  
    localStorage.setItem('termLocal', validated);      
})

// First letter uppercase conversion

let capitalFirst = val => {
    return val.charAt(0).toUpperCase() + val.slice(1);
}

// The object is checked if it is a duplicate and, if not, added 

inputForm.addEventListener('submit', e => {
    e.preventDefault();
    let username = localStorage.usernameLocal;
    let categoryLocal = localStorage.categoryLocal;
    let termLocal = capitalFirst(localStorage.termLocal);
    let obj = new AddTerm(username, categoryLocal, termLocal);   

    if (localStorage.categoryLocal == null || localStorage.termLocal == '') 
    {
        $('#insufficientDataModal').modal('show');
    } 
    else 
    { 
        obj.termCheck();   
        localStorage.setItem('termLocal', '');     
    } 
})        

hallOfFameCall.addEventListener("click", hallOfFame); 

// Event listener for categories buttons

formBtn.addEventListener('click', e => { 
    e.preventDefault(); 
    let category = select.value;  
    if(category === 'Država') 
    {  
        localStorage.setItem('categoryLocal', 'Država');  
    } 
    else if(category === 'Grad') 
    {
        localStorage.setItem('categoryLocal', 'Grad'); 
    } 
    else if(category === 'Reka') 
    {
        localStorage.setItem('categoryLocal', 'Reka'); 
    } 
    else if(category === 'Planina') 
    {
        localStorage.setItem('categoryLocal', 'Planina'); 
    } 
    else if(category === 'Životinja') 
    { 
        localStorage.setItem('categoryLocal', 'Životinja'); 
    } 
     else if(category === 'Biljka') 
    { 
        localStorage.setItem('categoryLocal', 'Biljka'); 
    } 
    else if(category === 'Predmet') 
    {
        localStorage.setItem('categoryLocal', 'Predmet');  
    } 
})

highScoreBtn.addEventListener('click', () => {
    //$('#logInModal').modal('show');
    highScore()
})

let lele = "Čaša Šolja Sveska Tabla Olovka Monitor Tastatura Miš Slušaslice Zvučnik Podmetač Lampa Pegla Fen Ogledalo Bočica Komoda Ormar Krevet Laptop Sto Stolica Džojstik Štampač Ranac Tašna Torba Kutija Kvaka Viljuška Kašika Nož Ključ Tanjir Tacna Kutlača Čačkalica Džezva Šporet Akumulator Agregat Činija Vaza Sat Lopata Budilnik Lopta Ašov Vila Kliker Lutka Igračka Pločice Jastuk Ćebe Jorgan Flaša Korpa Kanta Saksija Hemijska Sijalica Prekidač Četka Neseser Čekić Ekser Šrafciger Šnala Minđuše Ogrlica Lančić Heftalica Lenjir Volan Menjač Piksla Upaljač Točak Patosnica Češalj Čizma Ćup Bušilica Brijač Bubanj Cipela Cucla Dubak Džak Epruveta Gramofon Harpun Ljuljaška Mač Štit Metla Koplje Perika Sablja Strela Šešir Žeton Đubrovnik Telefon Mobilnitelefon Tablet Đevđir Marker Držač Turpija Grickalica Cangle Lak Farba Makaze Trimer Podmetač Sunđer Žica Ograda Otirač Tepih Staza Džemper Baterija Tipse Nalepnice Stikeri Magnet Flešmemorija Usb Udica Gitara Violina Šal Spajalica Harfa Gusle Gajde Luster Bure Tiganj Radar Klavir Igla Cigla Crep Akvarijum Fotelja Spatula Roleri Rošule Proteza Prsten Karmin Labelo Uložak Globus Lula Sekira Motika Flomaster Kofer Avan Bokal Šubara Kačket Kapa Guma Felna Maska Ratkapne Ofinger Frula Flauta Harmonika Truba Zihenadla Aspirator Šporet Respirator Ringla Brijač Električnaturpija Tabakera Secko Sokovnik Blender Ekspreslonac Kazan Varjača Mikroskop Lupa Unihop Hulahopke Gumica Kondom Rukavica Ceger Kesa Patike Sandale Štap Štake Oklagija Zavesa Rajf Puška Pištolj Snajper Bomba Metak Sačmara Krpa Džoger Ćunak Boca Rende Zavoj Šestar Uglomer Slamka Cevčica Knjiga Fenjer Lampion Padobran Mikser Šator Podloga Kišobran Suncobran Penkalo Lavor Zvono Muštikla Papuče Čiviluk Dušek Naddušek Štipaljka Slika Ram Burma Mišolovka Šlem Radijator Grejalica Peć Tapeć Smederevac Dugme Zastava Bačva Šajkača Hoklica Cirkon Kada Lavabo Đakuzi Šipka Termostat Termos Palica Ešarpa Nakovanj Suknja Haljina Daska Letva Čekrk  Visak Kreda Brojanica Narukvica Fioka Limenka Vangla Cigareta Tompus Elektronskacigareta Metar Naočare Sočivo Monokl Perorez Srp Šraf Kramp Toplomer Mantil Stetoskop Laser Barometar Durbin Dvogled Žilet Četkicazazube Osveživač Čutura Crevo Česma Kanta Pikado Strelica Čaršav Kamen Papir Trotinet Skuter Motor Hladnjak Antena Album Burgija Bunda Broš Bič Britva Bonsek Ćurak Čarapa Četkica Čunak Čekić Disk Dijabola Dildo Doboš Diktafon Drška Epoleta Elipsa Fišek Figura Gaće Grudnjak Grabulja Goblen Fotografija Hulahop Jastučnica Kanap Konac Kompjuter Kasa Kosa Kosilica Kundak Kotao Kompas Krčag Kandilo Kovčeg Kabl Kabel Kugla Kegla Kotur Kocka Kockica Klupko Kuka Kalem Kaca Krigla Kip Katanac Kapija Kontrabas Karniša Kamera Krplje Krevetac Kavez Karta Kartica Kaciga Košulja Ksilofon Keser Lanac Loptica Luk Milje Mašna Merdevine Mapa Mušema Maramica Marama Matica Metalofon Nalepnica Novine Novčanik Njihalo Omot Odvrtač Olovo Orman Oboa Opanak Opasač Rajsferšlus Poslužavnik Penkalo Palidrvce Posuda Sud Prekrivač Prečaga Pinceta Pidžama Pertle Prag Pištaljka Pisak Pljoska Privezak Pedala Poluga Poklopac Podvezica Prozor Plovak Propeler Pečat Sličica Sveća Svećnjak Sanduk Sundjer Sud Struna Samostrel Stalak Stega Slanik Slavina Stolnjak Šarka Štaka Štula Šilo Šibica Šorc Šoljica Štikla Šljokica Štucna Špric Špenadla Testera Terazije Tiara Teg Tegla Tučak Ukras Uzengija Vešalica Vaga Čep Vitlo Violončelo Vizir Valjak Viola"



let aa = lele.split(" ");

console.log(aa)

let mgc = document.getElementById('magic') ;

mgc.addEventListener('click', () => {
    aa.forEach(element => {
        let obj = new AddTerm('Marko', 'Predmet', element);   
        obj.termCheck();
    });
})