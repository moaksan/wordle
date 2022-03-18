import fetchWord from './fetchWord.js'
import button from './button.js'
import wordBox from './wordBox.js'
import keyboard from './keyboard.js'
import addEvent from './addEvent.js'

export default function app(){
  this.render= async ()=>{
    const target=document.querySelector('.app');
    target.innerHTML='';

    const word=await fetchWord();
    button(target);
    wordBox(target, word);
    keyboard(target);

    addEvent(word);
    
  }

  this.render();
}