const container = document.querySelector('.grille');
let toutesLesDivs;
let alienInvaders = [];
let tireurPosition = 229;
let direction = 1;

function creationGrilleEtAliens(){
    let indexAttr = 0;
    for(i = 0; i < 240; i++){
        if(indexAttr === 0){
            const bloc = document.createElement('div');
            bloc.setAttribute('data-left','true');
            container.appendChild(bloc);
            indexAttr++;
        } else if(indexAttr === 19){
            const bloc = document.createElement('div');
            bloc.setAttribute('data-right','true');
            container.appendChild(bloc);
            indexAttr=0;
        } else{
            const bloc = document.createElement('div');
            container.appendChild(bloc);
            indexAttr++;
        }
    }

    for(i = 1; i < 53; i++){
        if(i === 13){
            i = 21;
            alienInvaders.push(i);
        } else if(i === 33){
            i = 41;
            alienInvaders.push(i);
        } else{
            alienInvaders.push(i);
        }
    }

    toutesLesDivs = document.querySelectorAll('.grille div');
    alienInvaders.forEach(invader => {
        toutesLesDivs[invader].classList.add('alien');
    })

    toutesLesDivs[tireurPosition].classList.add('tireur');
}

creationGrilleEtAliens();

function deplacerLeTireur(e){
    toutesLesDivs[tireurPosition].classList.remove('tireur');
    
    if(e.keyCode === 37 && tireurPosition > 220){
        tireurPosition -= 1;
    }
    if(e.keyCode === 39 && tireurPosition < 239){
        tireurPosition += 1;
    }

    toutesLesDivs[tireurPosition].classList.add('tireur');
}
document.addEventListener('keydown', deplacerLeTireur);

let descendreRight = true;
let descendreLeft = true;

function bougerLesAliens(){
    for(let i = 0; i < alienInvaders.length; i++){
        if(toutesLesDivs[alienInvaders[i]].getAttribute('data-right') === 'true'){
           if(descendreRight){
               direction = 20;
               setTimeout(() => {
                descendreRight = false;
               }, 50);
           } else if(!descendreRight){
               direction = -1;
           }
           descendreLeft = true;
        }

        if(toutesLesDivs[alienInvaders[i]].getAttribute('data-left') === 'true'){
            if(descendreLeft){
                direction = 20;
                setTimeout(() => {
                 descendreLeft = false;
                }, 50);
            } else if(!descendreLeft){
                direction = 1;
            }
            descendreRight = true;
         }
    }


    for(let i = 0; i < alienInvaders.length; i++){
        toutesLesDivs[alienInvaders[i]].classList.remove('alien');
    }
    for(let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction;
    }
    for(let i = 0; i < alienInvaders.length; i++){
        toutesLesDivs[alienInvaders[i]].classList.add('alien');
    }
}

let invaderId = setInterval(bougerLesAliens,500);