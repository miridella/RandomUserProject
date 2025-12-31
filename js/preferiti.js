"use strict"

caricaPreferiti();

function caricaPreferiti(){
    let preferiti = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log(preferiti);

    for(let i=0;i<preferiti.length;i++)
    {
        generaCard(preferiti[i]);
    }
}
