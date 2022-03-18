import app from './app.js'

export default function addEvent(word){

  const refreshBtn=document.querySelector('.refresh');
  refreshBtn.addEventListener('click', e=>{
    new app();
  })

  let curLocation=[0,0];
  word=word.toUpperCase();
  const keyBtn=document.querySelectorAll('.keyboard button');

  for(let i=0;i<keyBtn.length-2;i++){
    keyBtn[i].addEventListener('click', e=>{
      if(curLocation[1]<word.length){
        const curTile=document.querySelector(`#tile-${curLocation[0]}-${curLocation[1]}`);
        const alphabet=e.target.textContent;
        curTile.textContent=alphabet;
        curLocation[1]+=1;
      }
    })
  }
  keyBtn[keyBtn.length-2].addEventListener('click', e=>{
    if(curLocation[1]>0){
      curLocation[1]-=1;
      const curTile=document.querySelector(`#tile-${curLocation[0]}-${curLocation[1]}`);
      curTile.textContent='';
    }
  });
  keyBtn[keyBtn.length-1].addEventListener('click', e=>{
    if(curLocation[1]==word.length){
      let submittedWord='';
      const tiles=document.querySelectorAll(`#row-${curLocation[0]} > .tile`);
      for(let i=0;i<word.length;i++){
        submittedWord+=tiles[i].textContent;
      }
      
      fetch(`https://twinword-word-graph-dictionary.p.rapidapi.com/association/?entry=${submittedWord}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
          "x-rapidapi-key": "b744195f13msh446819f5cbb85b5p10c26ejsn8e4ff45530d9"
        }
      })
      .then(res => res.json())
      .then(json => {
        if(json.result_code=="200"){
          for(let i=0;i<word.length;i++){
            const key=document.querySelector(`.${submittedWord[i]}`);
            if(word[i]===submittedWord[i]){
              tiles[i].classList.add('strike');
              if(!key.classList.contains('strike')){
                key.className=`${submittedWord[i]} strike`;
              }
            }
            else if(word.includes(submittedWord[i])){
              tiles[i].classList.add('ball');
              if(!key.classList.contains('strike') && !key.classList.contains('ball')){
                key.className=`${submittedWord[i]} ball`;
              }
            }
            else{
              tiles[i].classList.add('out');
              if(!key.classList.contains('out')){
                key.className=`${submittedWord[i]} out`;
              }
            }
          }
          curLocation[0]+=1;
          curLocation[1]=0;

          if(word===submittedWord){
            const el = document.querySelector('.keyboard');
            const elClone = el.cloneNode(true);
            el.parentNode.replaceChild(elClone, el);
            customAlert('Correct!', 5000);
          }
          if(word!==submittedWord && curLocation[0]>=6){
            const el = document.querySelector('.keyboard');
            const elClone = el.cloneNode(true);
            el.parentNode.replaceChild(elClone, el);
            customAlert(`Fail! The answer is "${word}"`, 10000)
          }
        }
        else{
          customAlert('The word is not in dictionary',2000);
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
    else{
      customAlert('The word is too short',3000);
    }
  })
}

function customAlert(msg,duration){
  var styler = document.createElement("div");
    styler.setAttribute("style","display:flex; height:80px; background-color:rgb(181, 220, 255); border:solid black 3px; border-radius:5px; padding:0px 20px; position:fixed; justify-content:center; align-items:center;");
  styler.innerHTML = "<h1>"+msg+"</h1>";
  setTimeout(function(){
    styler.parentNode.removeChild(styler);
  },duration);
  document.querySelector('.buttonContainer').appendChild(styler);
}