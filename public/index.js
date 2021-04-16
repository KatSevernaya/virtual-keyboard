
const keyboardWrapper = document.createElement('section')
const keyboard = document.createElement('div')
keyboard.classList.add('keyboard__keys')
const inputTextArea = document.createElement('textarea')
const comment = document.createElement('h5')
const commentOs = document.createElement('h5')
comment.innerHTML = 'To change language press Shift+Alt'
commentOs.innerHTML = 'Plugin was developed in Windows'
inputTextArea.classList.add('keyboard__input')
keyboardWrapper.prepend(inputTextArea)
keyboardWrapper.append(keyboard)
keyboardWrapper.append(comment)
keyboardWrapper.append(commentOs)
document.body.append(keyboardWrapper)
let capsLockIndicator = false
let keysPressedArray = []
let actualIndex = 0
let currentCursorPostion = {
    wasOverWrapped: false
}


const keyRu = [ 'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Minus', 'Equal', 'Backspace',
'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Backslash', 'Delete',
'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
'ShiftLeft', 'Period', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'Slash', 'ArrowUp', 'ShiftRight',
'ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
]
const keyRuCaps = [ 'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Minus', 'Equal', 'Backspace',
'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Backslash', 'Delete',
'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
'ShiftLeft', 'Period', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'Slash', 'ArrowUp', 'ShiftRight',
'ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
]

const keyEn = [ 'Backquote', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Minus', 'Equal', 'Backspace',
'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Semicolon', "Quote", 'Enter',
'ShiftLeft', '!', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
'ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
]
const keyEnCaps = [ 'Backquote', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Minus', 'Equal', 'Backspace',
'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter',
'ShiftLeft', '!', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
'ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
]
let currentArray = keyEn

let language = 'en'


const textFormat = function toArrangeInputLessThen15signsInLine() {
    const lastBreakPosition = inputTextArea.value.lastIndexOf('\n')
    const textLength = inputTextArea.value.length
    const lineLength = 8
    const linesQuantaty = Math.ceil(inputTextArea.value.length / lineLength)
      //-------cursor position calculation 
            
      let textBeforeCaret = inputTextArea.value.slice(0, inputTextArea.selectionStart)
      let breakQuantaty = 0
      for (let i = 0; i< textBeforeCaret.length; i++) {
          if (textBeforeCaret[i] === '\n') {
              breakQuantaty += 1
          }
      }
      const rowsTotal = inputTextArea.value.split('\n')
      let rowsBeforeCaret = textBeforeCaret.split('\n')
      let rowsBeforeCaretQuantaty = rowsBeforeCaret.length
      let cursorPosition = 0
      for (let i = 0; i < rowsBeforeCaret.length; i++) {
          cursorPosition = rowsBeforeCaret[i].length        
      }
    
      //---------------------------------- 
    if (currentCursorPostion.start) {
        let signsBeforeLineEnds = lineLength - (currentCursorPostion.start - lineLength*(rowsBeforeCaretQuantaty-1))
       
        console.log(currentCursorPostion.wasOverWrapped,signsBeforeLineEnds)
        if (rowsTotal[rowsBeforeCaretQuantaty-1].length < lineLength+1) {
   
        } 
        if ((rowsTotal[rowsBeforeCaretQuantaty-1].length - lineLength) === 1)  {
            

                if (currentCursorPostion.wasOverWrapped === false) {
                    inputTextArea.value = inputTextArea.value.slice(0, rowsBeforeCaretQuantaty*lineLength) + '\n' + inputTextArea.value.slice(rowsBeforeCaretQuantaty*lineLength) 
                    
                    console.log(currentCursorPostion.wasOverWrapped,inputTextArea.value.indexOf('\n'))
                    inputTextArea.setSelectionRange(currentCursorPostion.start, currentCursorPostion.start)

                }
                if (currentCursorPostion.wasOverWrapped === true) {
                    console.log('strange1',inputTextArea.value.slice(rowsBeforeCaretQuantaty*lineLength+1, rowsBeforeCaretQuantaty*lineLength+2), inputTextArea.value.slice(rowsBeforeCaretQuantaty*lineLength+2, rowsBeforeCaretQuantaty*lineLength+3))

                         inputTextArea.value = inputTextArea.value.slice(0, rowsBeforeCaretQuantaty*lineLength) + '\n'  + inputTextArea.value.slice(rowsBeforeCaretQuantaty*lineLength, rowsBeforeCaretQuantaty*lineLength+1) + inputTextArea.value.slice(rowsBeforeCaretQuantaty*lineLength+2)
                         inputTextArea.setSelectionRange(currentCursorPostion.start, currentCursorPostion.start)
                        console.log('strange2',inputTextArea.value.slice(rowsBeforeCaretQuantaty*lineLength+1, rowsBeforeCaretQuantaty*lineLength+2), inputTextArea.value.slice(rowsBeforeCaretQuantaty*lineLength+2, rowsBeforeCaretQuantaty*lineLength+3))
                }
                currentCursorPostion.wasOverWrapped = true

               
            } 
        
    }   else {
        if (lastBreakPosition === -1) {
            if (textLength >= lineLength) {
                inputTextArea.value = inputTextArea.value + '\n'  
            }
        } else 
            { if (textLength - lastBreakPosition > lineLength)  
                {
                    inputTextArea.value = inputTextArea.value + '\n'
                }
        }
    } 
} 
let arrowPressed = function putSignOnRigthPlaceIfArrowPressed(key) {
    inputTextArea.value =inputTextArea.value.slice(0, currentCursorPostion.start) + key + inputTextArea.value.slice(currentCursorPostion.start, inputTextArea.value.length-1)
    currentCursorPostion.start = currentCursorPostion.start+1
    inputTextArea.setSelectionRange(currentCursorPostion.start, currentCursorPostion.start)
    textFormat()
}

class MainClass {
    constructor(options) {
        this.signArray = options.signArray
    }

    buildKeyboard() {
               
               this.signArray.forEach( key => {
                let keyboardKey = document.createElement('button')
                keyboardKey.classList.add('keyboard__item')
                keyboardKey.style.boxShadow = '0px 4px 5px rgba(0,0, 0, 0.5)'
                keyboardKey.setAttribute("type", "button")
                keyboardKey.setAttribute("value", key)
                keyboardKey.id = `key-${key}`
                const insertLineBreake = ['Backspace', 'DEL', 'Enter', 'ShiftRight'].indexOf(key) !== -1
                keyboardKey.append(key)
                keyboard.append(keyboardKey )
                
                
               
               

                if (insertLineBreake) {
                    const breakLine = document.createElement('br')
                    keyboard.append(breakLine)
                }

                 switch (key) {
                    case 'Space':
                        keyboardKey.innerHTML = ' '
                        keyboardKey.classList.add('space')
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  ' '
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'Tab':
                        
                        keyboardKey.classList.add('tab')
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  '    '
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'ControlRight':
                    case 'ControlLeft':
                        keyboardKey.innerHTML = 'ctrl'
                        keyboardKey.classList.add('ctrl')
                        keyboardKey.addEventListener('click', () => {
                            
                        })
                    break
            
                    case 'Enter':
                         
                        keyboardKey.classList.add('enter')
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  '\n'
                            textFormat()
                            
                        })
                    break
            
                    case 'Backspace':
                        keyboardKey.classList.add('backspace')
                        keyboardKey.addEventListener('click', () => {
                            let newValue = []
                            inputTextArea.focus()
                            
                            //inputTextArea.setSelectionRange(currentCursorPostion.start, currentCursorPostion.start)
                             //-------cursor position calculation 
            
                        let textBeforeCaret = inputTextArea.value.slice(0, inputTextArea.selectionStart)
                        let breakQuantaty = 0
                        for (let i = 0; i< textBeforeCaret.length; i++) {
                            if (textBeforeCaret[i] === '\n') {
                                breakQuantaty += 1
                            }
                        }
                        const rowsTotal = inputTextArea.value.split('\n')
                        let rowsBeforeCaret = textBeforeCaret.split('\n')
                        let cursorPosition = 0
                        for (let i = 0; i < rowsBeforeCaret.length; i++) {
                            cursorPosition = rowsBeforeCaret[i].length        
                        }
            
                        //---------------------------------- 
                            
                          
                            inputTextArea.value = inputTextArea.value.slice(0,currentCursorPostion.start-1) + inputTextArea.value.slice(currentCursorPostion.start)
                            currentCursorPostion.start = currentCursorPostion.start-1
                            inputTextArea.setSelectionRange(currentCursorPostion.start, currentCursorPostion.start)
                            
                               
                                
                            
                        })
                    break
                    case 'Delete': 
                        keyboardKey.classList.add('del')
                        keyboardKey.innerHTML = 'DEL'
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            const textBeforeDeletedSign = inputTextArea.value.slice(0, inputTextArea.selectionStart)
                            const textAfterDeletedSign = inputTextArea.value.slice(inputTextArea.selectionStart+1)
                            const caretPosition = inputTextArea.selectionStart
                            inputTextArea.value = textBeforeDeletedSign + textAfterDeletedSign
                            inputTextArea.setSelectionRange(caretPosition, caretPosition)
                          
                        })
                    break
                    
                    
                    case 'ShiftLeft':
                        keyboardKey.classList.add('shift')
                    case 'ShiftRight':
                        keyboardKey.classList.add('dark')
                        keyboardKey.innerHTML = 'Shift'
                        keyboardKey.addEventListener('click', () => {
                            document.getElementById('key-AltLeft').onclick = () => {
                                this.signArray.forEach( () => {
                                    document.querySelector('.keyboard__item').remove()

                                 })
                                 for (let i=0; i <= document.querySelectorAll('br').length + 1; i++) {
                                    document.querySelector('br').remove()
                                 }
                               

                                if (language === 'ru') {
                                    language = 'en'
                                    engArray.buildKeyboard()
                                    currentArray = keyEn
                                } else if (language === 'en') {
                                    language = 'ru'
                                    ruArray.buildKeyboard()
                                    currentArray = keyRu
                                }

                                let seriaLang = JSON.stringify(language)
                                localStorage.setItem('currLang', seriaLang)
                               
                              
                            }
                        })
                    break
            
                    case 'CapsLock':
                        keyboardKey.classList.add('caps-lock')
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            this.signArray.forEach(() => {
                                document.querySelector('.keyboard__item').remove()

                             })
                             for (let i=0; i <= document.querySelectorAll('br').length + 1; i++) {
                                document.querySelector('br').remove()
                             }
                            capsLockIndicator = !capsLockIndicator 
                            if (language === 'ru') {
                                if ( capsLockIndicator === true ) {
                                    ruArrayCaps.buildKeyboard()
                                    currentArray = keyRuCaps                                    
                                } else {
                                    ruArray.buildKeyboard()
                                    currentArray = keyRu
                                }
                            } else if (language === 'en') {
                                if ( capsLockIndicator === true ) {
                                    engArrayCaps.buildKeyboard()
                                    currentArray = keyEnCaps  
                                } else {
                                    engArray.buildKeyboard()
                                    currentArray = keyEn
                                }
                            }
                            
                            
                        })
                        if (capsLockIndicator === true) {
                            keyboardKey.classList.add('keyboard__capslock-pressed')
                        } else {
                            keyboardKey.classList.remove('keyboard__capslock-pressed')
                        }
                        
                    break
                   
            
                    case 'ArrowUp':
                        keyboardKey.classList.add('dark')
                        keyboardKey.innerHTML = '<i class="fas fa-arrow-up"></i>'
                        keyboardKey.addEventListener('click', () => {
                        inputTextArea.focus()
                        //-------cursor position calculation 
            
                        let textBeforeCaret = inputTextArea.value.slice(0, inputTextArea.selectionStart)
                        let breakQuantaty = 0
                        for (let i = 0; i< textBeforeCaret.length; i++) {
                            if (textBeforeCaret[i] === '\n') {
                                breakQuantaty += 1
                            }
                        }
                        const rowsTotal = inputTextArea.value.split('\n')
                        let rowsBeforeCaret = textBeforeCaret.split('\n')
                        let cursorPosition = 0
                        for (let i = 0; i < rowsBeforeCaret.length; i++) {
                            cursorPosition = rowsBeforeCaret[i].length        
                        }
            
                        //---------------------------------- 
            
                            if (rowsTotal[breakQuantaty-1] !== undefined) {
                                const higherCaretPosition = textBeforeCaret.length - rowsTotal[breakQuantaty-1].length
                                const higherCaretPositionPreviosLineLess = textBeforeCaret.length - cursorPosition
            
                                if (cursorPosition > rowsTotal[breakQuantaty - 1].length) {
                                    inputTextArea.setSelectionRange(higherCaretPositionPreviosLineLess - 1, higherCaretPositionPreviosLineLess -1)
                                    currentCursorPostion.start = higherCaretPositionPreviosLineLess - 1
                                } else {
                                inputTextArea.setSelectionRange(higherCaretPosition - 1, higherCaretPosition -1)
                                currentCursorPostion.start = higherCaretPosition - 1
                                }
                            }
                        })
                    break
            
                    case 'ArrowDown':
                       
                        keyboardKey.classList.add('dark')
                        keyboardKey.innerHTML = '<i class="fas fa-arrow-down"></i>'
                        keyboardKey.addEventListener('click', () => {
                        inputTextArea.focus() 
                        //-------cursor position calculation 
            
                        let textBeforeCaret = inputTextArea.value.slice(0, inputTextArea.selectionStart)
                        let breakQuantaty = 0
                        for (let i = 0; i< textBeforeCaret.length; i++) {
                            if (textBeforeCaret[i] === '\n') {
                                breakQuantaty += 1
                            }
                        }
                        const rowsTotal = inputTextArea.value.split('\n')
                        let rowsBeforeCaret = textBeforeCaret.split('\n')
                        let cursorPosition = 0
                        for (let i = 0; i < rowsBeforeCaret.length; i++) {
                            cursorPosition = rowsBeforeCaret[i].length        
                        }
    
            
                        //---------------------------------- 
            
                            if (rowsTotal[breakQuantaty+1] !== undefined) {
                                const lowerCaretPosition = rowsTotal[breakQuantaty].length + textBeforeCaret.length
                                const LowerCaretPositinNextLineLess = textBeforeCaret.length + rowsTotal[breakQuantaty].length - cursorPosition + rowsTotal[breakQuantaty+1].length
                                if (cursorPosition > rowsTotal[breakQuantaty+1].length) {
                                    inputTextArea.setSelectionRange( LowerCaretPositinNextLineLess + 1, LowerCaretPositinNextLineLess + 1)
                                    currentCursorPostion.start = LowerCaretPositinNextLineLess + 1
                                } else {
                                    inputTextArea.setSelectionRange(lowerCaretPosition+1, lowerCaretPosition+1)
                                    currentCursorPostion.start = lowerCaretPosition+1   
                                }
                            }          
                        })
                    break
            
                    case 'ArrowRight':
                        keyboardKey.classList.add('dark')
                        keyboardKey.innerHTML = '<i class="fas fa-arrow-right"></i>'
                        keyboardKey.addEventListener('click', () => {
                        inputTextArea.focus()
                        inputTextArea.setSelectionRange(inputTextArea.selectionEnd+1, inputTextArea.selectionEnd+1)
                        currentCursorPostion.start = inputTextArea.selectionEnd+1 
                        })
                    break
                    case 'ArrowLeft':
                        
                        keyboardKey.classList.add('dark')
                        keyboardKey.innerHTML = '<i class="fas fa-arrow-left"></i>'
                        keyboardKey.addEventListener('click', () => {
                        inputTextArea.focus()
                        inputTextArea.setSelectionRange(inputTextArea.selectionStart, inputTextArea.selectionStart-1)
                        currentCursorPostion.start = inputTextArea.selectionStart
                        console.log(currentCursorPostion.start )
                        })
                    break
                   
                    case 'AltRight':
                    case 'AltLeft':
                        keyboardKey.classList.add('dark')
                        keyboardKey.innerHTML = 'Alt'
                    break
                    case 'Win':
                        keyboardKey.classList.add('dark')
                    break
            
                    case 'Minus':
                        keyboardKey.innerHTML = '-'
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  '-'
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'Equal':
                        keyboardKey.innerHTML = '='
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  '='
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'BracketLeft':
                        keyboardKey.innerHTML = '['
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  '['
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'BracketRight':
                        keyboardKey.innerHTML = ']'
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  ']'
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'Backslash':
                        keyboardKey.innerHTML = "\ "
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  '\ '
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'Semicolon':
                        keyboardKey.innerHTML = ';'
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  ';'
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'Quote':
                        keyboardKey.innerHTML = "'"
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value += "'"
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'Comma':
                        keyboardKey.innerHTML = ','
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  ','
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'Period':
                        keyboardKey.innerHTML = '.'
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  '.'
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'Slash':
                        keyboardKey.innerHTML = "/"
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  '/'
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break
                    case 'Backquote':
                        keyboardKey.innerHTML = "`"
                        keyboardKey.addEventListener('click', () => {
                            inputTextArea.focus()
                            inputTextArea.value +=  "`"
                            if (currentCursorPostion.start) {
                                arrowPressed(key)
                            } else {
                                textFormat()
                            }
                        })
                    break

                    default:   
                    keyboardKey.addEventListener('click', () => {
                        inputTextArea.focus()
                        inputTextArea.value += capsLockIndicator ? key.toUpperCase() : key.toLowerCase()
                        if (currentCursorPostion.start) {
                            arrowPressed(key)
                        } else {
                            textFormat()
                        }
                         
                       
                    })
                } 

                keyboardKey.onclick = () => {
                    
                    
                    function animate({timing, draw, duration}) {
                        let start = performance.now()
                        requestAnimationFrame(function animate(time) {
                            let timeFraction = (time - start) / duration
                            let progress = timing(timeFraction)
                
                            draw(progress)
                        
                            if (timeFraction < 1) {
                              requestAnimationFrame(animate);
                            } 
                        })
                    }

                    animate({
                        duration: 300,
                        timing(timeFraction) {
                          return timeFraction
                        },
                        draw(progress) {
                            keyboardKey.style.boxShadow = `0px ${4 - (4 * progress)}px ${5 - (5 * progress)}px rgba(0,0, 0, 0.5)`
                          }    
                    })


                    
                    function animate1({timing, draw, duration}) {

                        let start = performance.now()
                        requestAnimationFrame(function animate1(time) {
                            let timeFraction = (time - start) / duration
                            let progress = timing(timeFraction)
                
                            draw(progress)
                        
                            if (timeFraction < 1) {
                              requestAnimationFrame(animate1);
                            } 
                        })
                    }

                    animate1({
                        duration: 300,
                        timing(timeFraction) {
                          return timeFraction
                        },
                        draw(progress) {
                            keyboardKey.style.boxShadow = `0px ${4 * progress}px ${5 * progress}px rgba(0,0, 0, 0.5)`
                          }    
                    })

                }
            })

    }


  

}

const ruArray = new MainClass({
    signArray: keyRu,

})
const engArray = new MainClass({
    signArray: keyEn,
})
const ruArrayCaps = new MainClass({
    signArray: keyRuCaps,

})
const engArrayCaps = new MainClass({
    signArray: keyEnCaps,
})
let currentLanguage = JSON.parse(localStorage.getItem("currLang"))

if (currentLanguage !== null) {
    language = currentLanguage
} 

if (language === 'ru') {
    ruArray.buildKeyboard()
} else if  (language === 'en') {
    engArray.buildKeyboard()
}






  onkeydown = onkeyup = (event) => {
    
        textFormat()
        keysPressedArray[event.code] = event.type == 'keydown'

            for (let i=0; i < currentArray.length; i++) { 
              if ( capsLockIndicator === true ) { 
                
                    if (currentArray[i] === event.key.toUpperCase()) {                               
                        actualIndex = i          
                    } else {
                        if (currentArray[i] === event.code) {                              
                            actualIndex = i          
                        } 
                    }
                } else {
                    if (currentArray[i] === event.key) {                                 
                        actualIndex = i          
                    } else {
                        if (currentArray[i] === event.code) {                               
                            actualIndex = i          
                        } 
                    }
                }
        } 
        let actual = document.querySelector(`#key-${currentArray[actualIndex]}`)
        if (keysPressedArray[event.code]) {
        actual.classList.add('active')
        } else {
            actual.classList.remove('active')
        }
        
    }
    