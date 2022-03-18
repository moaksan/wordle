export default function wordBox(target, word){
  const wordBoxContainer=document.createElement('div');
  wordBoxContainer.classList.add('wordBoxContainer');
  const wordBox=document.createElement('div');
  wordBox.classList.add('wordBox');
  wordBoxContainer.appendChild(wordBox);

  for(let i=0;i<6;i++){
    const row=document.createElement('div');
    row.classList.add('row');
    row.id='row-' + i;

    for(let j=0;j<word.length;j++){
      const tile=document.createElement('div');
      tile.classList.add('tile');
      tile.id='tile-'+i+'-'+j;
      row.appendChild(tile);
    }
    wordBox.appendChild(row);
  }

  target.appendChild(wordBoxContainer);
}