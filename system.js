let cursorX, cursorY;
let screenW, screenH;

let padding = 15;

let cursorBlink = false;
let prefix = "user>";

let textBuffer = [
                    "PrevterOS v.0.0.1                                                               ",
                    "build web-1                                                                     ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                    "                                                                                ",
                 ]

function preload() {
    fontIBM = loadFont('IBMVGA.ttf');
}

function setup(){
    createCanvas(720 + (2 * padding), 400 + (2 * padding));

    fill(255);
    color(255);
    textFont(fontIBM);
    textSize(16);
    //SETUP INFORMATION
    cursorX = 0;
    cursorY = 0;
    screenW = 80;
    screenH = 25;

    background(0);
    SetCursor(0, 2);
    Write(prefix);
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function SetCursorPos(pos){
    cursorX = pos % screenW;
    cursorY = ~~(pos / screenW);
}

function GetCursor(){
    return cursorX + (cursorY * screenW);
}

function SetCursor(x, y){
    cursorX = x;
    cursorY = y;
}

function Render(string){
    text(string, padding + (cursorX * 9), padding + (cursorY * 16) + 9);
}

function SetChar(char){
    textBuffer[cursorY] = setCharAt(textBuffer[cursorY], cursorX, char);
    SetCursorPos(GetCursor() + 1);
}

function Write(string){
    for(var i = 0; i < string.length; i++){
        if (string[i] == "\n") { SetCursor(cursorX, cursorY+1); continue; }
        else if (string[i] == "\r") { SetCursor(0, cursorY); continue; }
        SetChar(string[i]);
    }
}

function Clear(){
    textBuffer = []
    for (var i = 0; i < 25; i++){
        textBuffer.push("                                                                                ");
    }
}

function draw(){
    background(0);
    //Logic

    text("X: " + cursorX + " Y: " + cursorY, padding, height - padding)



    //Screen render
    tmpCur = GetCursor();
    SetCursorPos(0);
    textBuffer.forEach(function(line){
        Render(line);
        SetCursor(0, cursorY + 1);
    });
    SetCursorPos(tmpCur);
    //Cursor
    if((frameCount % 16) == 0) cursorBlink = !cursorBlink;
    if(cursorBlink) Render("_");
    else Render(" ");

    //console.log(textBuffer);
}

function RunCommand(cmd){
    if (cmd.startsWith("help") && cmd == "help") {
        Write("\r\nhelp         - List all commands");
        Write("\r\ncls          - Clear screen");
        Write("\r\necho (text)  - Print line of text");
    }
    else if (cmd.startsWith("cls") && cmd == "cls") {
        Clear();
        SetCursor(0, -1);
    }
    else if (cmd.startsWith("echo ")) {
        Write("\r\n" + cmd.substring(5));
    }
    else if (cmd == "") return;
    else Write("\r\nUnknown command: \"" + cmd.split(" ")[0] +"\"");
}

function keyPressed() {
    if(keyCode == BACKSPACE && cursorX > prefix.length){
        SetCursorPos(GetCursor() - 1);
        SetChar(" ");
        SetCursorPos(GetCursor() - 1);
    }
    if(keyCode == ENTER){
        cmd = textBuffer[cursorY].substring(prefix.length).trim()
        RunCommand(cmd);
        SetCursor(0, cursorY+1);
        Write(prefix);
    }
}

function keyTyped() {
    if (key == "Enter") return;
    Write(key);
}

function mouseClicked(event) {
    Write(prompt("Enter string (For mobile devices): "));
    cmd = textBuffer[cursorY].substring(prefix.length).trim()
    RunCommand(cmd);
    SetCursor(0, cursorY+1);
    Write(prefix);
}