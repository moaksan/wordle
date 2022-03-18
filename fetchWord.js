export default async function fetchWord(){
  const res=await fetch("https://random-words5.p.rapidapi.com/getMultipleRandom?count=1&&minLength=4&maxLength=6", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": "b744195f13msh446819f5cbb85b5p10c26ejsn8e4ff45530d9"
    }
  });
  const ls=await res.json();
  const word=ls[0];
  
  return word;
}