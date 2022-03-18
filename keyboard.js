export default function keyboard(target){
  const keyboardContainer=document.createElement('div');
  keyboardContainer.className='keyboardContainer';
  const keyboard=document.createElement('div');
  keyboard.className='keyboard';
  keyboardContainer.appendChild(keyboard);

  const key=[
    'Q','W','E','R','T','Y','U','I','O','P',
    'A','S','D','F','G','H','J','K','L',
    'Z','X','C','V','B','N','M','BACKSPACE','ENTER'
  ]

  for(let i=0;i<key.length;i++){
    keyboard.innerHTML+=`
      <button class="${key[i]}">${key[i]}</button>
    `
  }
  
  target.appendChild(keyboardContainer);
}