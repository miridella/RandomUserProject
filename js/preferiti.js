"use strict"

caricaPreferiti();

function caricaPreferiti(){
    let preferiti = JSON.parse(localStorage.getItem("favorites")) || [];

    if(preferiti.length>0)
    {
        for(let i=0;i<preferiti.length;i++)
        {
            generaCard(preferiti[i]);
        }
    }
    else{
        etichetta.textContent="Nessun preferito."
        etichetta.style.fontSize="20px";
        userCard.classList.add("d-none");
    }
}
