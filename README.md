# WORDLE

## 개요
간단한 WORDLE 게임을 만들어보았다. 

## 링크
https://moaksan.github.io//

## 사용언어
HTML, CSS, JAVASCRIPT

## 구조
단일 페이지로 되어있고 refresh button, word box, keyboard로 구성되어 있다. 진행 방식은 일반적인 wordle과 같다. keyboard로 스펠링을 입력하고 word box에 입력된 단어의 알파벳이 정답과 일치하는지, 알파벳이 정답에 포함되는지, 알파벳이 정답에 존재하지 않는지를 체크한다. 각 제출 단어마다 결과를 red, yellow, green 색으로 출력한다. 단어 전체가 정답과 일치하면 성공이며, 6번의 기회 동안 정답을 맞추지 못한다면 실패이다.

## 검토
> app.js

```javascript
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
```
메인 페이지를 다루는 파일이다. 
1. fetchWord()는 random word api에서 무작위로 한 개의 단어를 fetch한다. 
2. button(target)은 refresh button을 렌더링한다.
3. wordBox(target, word)는 word box를 렌더링한다.
4. keyboard(target)은 keyboard를 렌더링 한다.
5. addEvent(word)은 본 게임을 동작시키는 event listener들을 설정한다.
