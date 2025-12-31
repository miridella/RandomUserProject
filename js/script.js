"use strict"
let url;
let nPersone = 1;
let preferiti=[]
let data

//gestione range età
const rangeInput = document.getElementById('range');
const rangeOutput = document.getElementById('rangeValue');

if(window.location.pathname.endsWith("/index.html"))
{

    rangeOutput.textContent = rangeInput.value;
    
    rangeInput.addEventListener('input', function() {
        rangeOutput.textContent = this.value;
    });
    
    BtnGenera.addEventListener("click", function(){
        userCard.innerHTML="";
        url="/api";
        //chiamata
        console.log(range.value);
        url+= `?results=${range.value}`;
    
        if(gender.value!="")
        {
            url += `&gender=${gender.value}`;
        }
    
        let selectedNations = [];
    
        document.querySelectorAll('#nationCheckboxes input:checked').forEach(cb => selectedNations.push(cb.value));
        
    
        let nations= selectedNations.join(",");
    
        if(selectedNations.length!=0)
        {
            url += `&nat=${nations}`;
        }
    
        console.log(url);
        
        let Promise = ajax.sendRequest("GET",url);
        Promise.catch(ajax.errore); //in caso di errore
        Promise.then(function(httpResponse){
            data=httpResponse.data.results;
            console.log(data);
            
            search.classList.remove("d-none")
            userCard.classList.remove("d-none")
            for(let i=0;i<data.length;i++)
            {
                generaCard(data[i]);
            }
        });
    })

    btnCerca.addEventListener("click", function(){
       userCard.innerHTML="";

       for(let i=0;i<data.length;i++)
       {
            let nomeCompleto= data[i].name.first + data[i].name.last;      
            nomeCompleto=nomeCompleto.toLowerCase();

            if(nomeCompleto.includes(txtCerca.value.toLowerCase()))
            {
                generaCard(data[i]);
            }

        }
        txtCerca.value="";
    })

    btnPulisci.addEventListener("click", function(){
        userCard.innerHTML="";
        for(let i=0;i<data.length;i++)
        {
            generaCard(data[i]);
        }
    })
}

function generaCard(user){
    let col = document.createElement("div");
    col.classList.add("mb-4");

    let card = document.createElement("div");
    card.classList.add("user-card");
    col.append(card);
    card.addEventListener("click", function(){
        modale(user);
    })

    // immagine
    let img = document.createElement("img");
    img.src = user.picture.large;
    img.classList.add("user-img");
    card.append(img);

    // body
    let body = document.createElement("div");
    body.classList.add("p-3", "text-center");
    card.append(body);

    // nome
    let name = document.createElement("h5");
    name.textContent = `${user.name.first} ${user.name.last}`;
    body.append(name);

    // email
    let email = document.createElement("p");
    email.classList.add("text-muted", "mb-1");
    email.textContent = user.email;
    body.append(email);

    // nazionalità + età
    let info = document.createElement("p");
    info.textContent = `${user.location.country} • ${user.dob.age} anni`;
    body.append(info);

    // cuore preferiti
    let fav = document.createElement("img");
    fav.src = "./img/salvato.png";
    fav.classList.add("fav-icon");
    body.append(fav);

    fav.addEventListener("click", function(e) {
        e.stopPropagation();
        const id = user.login.uuid;
        let preferiti = JSON.parse(localStorage.getItem("favorites")) || [];

        if (preferiti.some(p => p.login.uuid === id)) {
            preferiti = preferiti.filter(p => p.login.uuid !== id);
            fav.classList.remove("saved");
            location.reload();
        } else {
            preferiti.push(user);
            fav.classList.add("saved");
        }

        localStorage.setItem("favorites", JSON.stringify(preferiti));
    });

    userCard.append(col);

}

function modale(user){
    console.log("ciao");
    const modalElement = document.getElementById("userModal");
    const userModal = new bootstrap.Modal(modalElement);

    modalName.textContent = `${user.name.first} ${user.name.last}`;
    modalImg.src = user.picture.large;
    modalEmail.textContent = user.email;
    modalPhone.textContent = user.phone;
    modalCountry.textContent = user.location.country;
    modalAge.textContent = user.dob.age;
    modalAddress.textContent= user.location.city + ", "+ user.location.street.name + " " +user.location.street.number 
    modalUsername.textContent=user.login.username;
    modalGender.textContent=user.gender;

    userModal.show();
}
