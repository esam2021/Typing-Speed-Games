// Array Of Words 
const easy_words = [
    "Easy",
    // "Hard",
    // "Hello",
    // "Code",
    // "Town",
    // "Python",
    // "Scala",
    // "Coding",
    // "Funny",
    // "Working",
    // "Task",
    // "Runner",
    // "Roles",
    // "Test",
    "Rust",
];

// Medium Level Words 
const medium_words = [ 
    "Medium",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Styleing",
    "Cascade",
    "Playing"
];

// Hard Level Words 
const hard_words = [
    "Destrucruing",
    "Paradigm",
    "Documentation",
    "Depandencies",
];

// Setting Levels
const setting_levels = {
    "Easy":2,
    "Normal":3,
    "Hard":2
} 

// Default Level 

let default_level = "Normal" // Change Level From Here 

let default_level_seconds = setting_levels[default_level]

// Catch Selectors 
let start_button = document.querySelector(".start")
let level_name = document.querySelector(".message .level_name")
let level_seconds = document.querySelector(".message .seconds")
let the_word = document.querySelector(".the-word")
let input = document.querySelector(".input")
let up_words = document.querySelector(".upcoming-words")
let time = document.querySelector(".time span")
let score = document.querySelector(".score .got")
let total = document.querySelector(".score .total")
let final_message = document.querySelector(".finish")
let content_name = document.querySelector(".name")
let words = [];
let username


// Setting Level Name + Seconds + score 
level_name.innerHTML = default_level 
level_seconds.innerHTML = default_level_seconds
time.innerHTML = default_level_seconds
total.innerHTML = words.length

// Disabled Paste Event 
input.onpaste = function(){
    return false;
}

function choseLevel(){
    let chose_level = document.querySelector(".chose-level")

    start_button.classList.add("disabled")

    input.style.display = "none"
  
    chose_level.addEventListener('change',function(){
        
        
        default_level = this.value

        level_name.innerHTML = default_level

        if(default_level == "Easy"){
            
            words = easy_words;
            
            onChangeLevel(default_level)

        }else if(default_level == "Normal"){
            
            words = medium_words;

            onChangeLevel(default_level)

        }else {
        
            words = hard_words;
            
            onChangeLevel(default_level)

        }        

        
        start_button.classList.remove("disabled")

        input.style.display = "block"

        this.style.display = "none"
    })
}

// Change Times On When Change Levels 
function onChangeLevel(level){

    default_level_seconds = setting_levels[level]
                
    level_seconds.innerHTML = default_level_seconds 

    time.innerHTML = default_level_seconds
}

 window.onload = function(){
    username = prompt("Enter Your Name")
    if(username == "" || username == null){
        username = " No Name"
        content_name.innerHTML += `
        <span class="no-name"> ${username} </span>
        `
    }else {
        content_name.innerHTML += `
            <span class="username"> ${username} </span>
        `
    }
    choseLevel()
 }

// Start Game 
start_button.onclick = function(){
    if(words.length == 0){
        the_word.innerHTML = "Place Choose Level"
    }else {
        this.remove();
        input.focus()
    
        // Generate Word Function 
        generateWords()
    }
}

// Generate Words 
function generateWords(){
    // Get Random Word From Array 
    let random_words = words[Math.floor(Math.random() * words.length)] 
    // Get Word Index 
    let word_index = words.indexOf(random_words)
    // Remove This Word From Array
    words.splice(word_index,1);
    // Show The Random Word 
    the_word.innerHTML = random_words
    // Empty Upcoming Words 
    up_words.innerHTML = ''
    // Generate Words
    for(let i =0 ; i < words.length;i++){
        // Create Div Element 
        let div = document.createElement("div")
        // Create Text Node For Div 
        let content_div = document.createTextNode(`${words[i]}`);
        // Append Content Div In Div Element
        div.appendChild(content_div)
        // Append Div Element In Up Words
        up_words.append(div)
    }

    // Call Start Play Function 
    startPlay()

}

// Start Play 
function startPlay(){
    time.innerHTML = default_level_seconds
    let start = setInterval(()=>{
        time.innerHTML--
        if(time.innerHTML === "0") {
            // Stop Timer 
            clearInterval(start)
            // Compare Words 
            if(the_word.innerHTML.toLowerCase() === input.value.toLowerCase()){
                // Empty Input Field 
                input.value = '';
                // Increeze Score 
                score.innerHTML++
                // Check If Exsist Words In Array 
                if(words.length > 0){
                    // Call Generate Word Function
                    generateWords()
                }else {                
                    // Create Span Element 
                    let span = document.createElement("span")
                    // Add Class On Span Element
                    span.classList.add('good')
                    // Create Span Text  
                    let span_text = document.createTextNode("Congratulations")
                    // Append Span Text In Span Element 
                    span.appendChild(span_text)
                    // Append Span Element In Finsh Message 
                    final_message.appendChild(span)
                    // Remove UpComing Words Box 
                    up_words.remove()
                    // Save Data 
                    saveData("Congratulations")
                    // Add Button Agin Play
                    playAgin()
                }
            }else {
                // Create Span Elemet 
                let span = document.createElement('span')
                // Add Class On Span Element 
                span.classList.add('bad')
                // Create Text Span 
                let text_span = document.createTextNode("Game Over");
                // Append Text Span In Span Element 
                span.appendChild(text_span)
                // Append Span Elemnt In Final Message 
                final_message.appendChild(span)
                // Save Data 
                saveData("Gane Over")
                // Add Button Agin Play
                playAgin()
            }
        }
    },1000)
}

// Select Text 
function selectText() {
  const input = document.getElementById("text-box");
  input.focus();
  input.select();
}

// Reload Game 
function reloadGame(){
    window.location.reload();
}

function playAgin(){
    // Create Button Agin Game 
    let button = document.createElement("button")
    // Append Class For Button 
    button.classList.add("play-agine");
    // Create Text Button 
    let text_button = document.createTextNode("Agin Game")
    // Append Text Button In Button 
    button.appendChild(text_button)
    // Append Button On Final Message
    final_message.appendChild(button)
    // Add Function For Button 
    button.onclick = function(){
        reloadGame()
    }
}

function saveData(result){
    // Save Result In LocalStorage 
    let date =  new Date()
    
    let info = {
        "name":username,
        "date":date,
        "score":`${score.innerHTML} from / ${words.length}`,
        "result": result,
        "level":default_level
    }

    let save_data

    if(localStorage.length > 0){
        save_data = JSON.parse(localStorage.getItem('results'))
    }else {
        save_data = []
    }

    save_data.push(info)
    
    let data_saved = JSON.stringify(save_data)

    localStorage.setItem('results',data_saved)
}