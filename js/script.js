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
    
    generateBtn.addEventListener("click", function(){
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
       
        console.log(txtCerca.value)
        for(let i=0;i<data.length;i++)
        {
            if(data[i].includes(txtCerca.value))
            {
                generaCard(data[i]);
            }
        }
    })
}

function generaCard(user){
    let col = document.createElement("div");
    col.classList.add("mb-4");

    let card = document.createElement("div");
    card.classList.add("user-card");
    col.append(card);

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
    fav.src = "./img/saved.png";
    fav.classList.add("fav-icon");
    body.append(fav);

    fav.addEventListener("click", () => {
        if(favorites.some(persona => persona.login.uuid == user.login.uuid))
        {
            preferiti.push(user)
            localStorage.setItem("favorites", preferiti);
        }
        else{
            favorites = favorites.filter(user => user.login.uuid !== id);
             localStorage.setItem("favorites", preferiti);
        }
        
        fav.classList.add("saved");
    });

    userCard.append(col);

}
