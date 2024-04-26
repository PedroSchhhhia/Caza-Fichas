let pantalla; //string (MENU, JUGANDO, GANAR, PERDER, CREDITOS)
let MENU,GANASTE,PERDISTE,CREDITOS,TABLERO; //PImage

let xBotonA, yBotonA, xBotonB, yBotonB; //float

let tam;
let Piezas; // PFont

let timer; //float
let clicks; // int

let Ficha; // Clase

let xR, yR, despR, dirR; // Variables Reina
let vivaR;

let xT, yT, despT;// Variables Torre
let vivaT;

let xA, yA, despA, dirA; // Variables Alfil
let vivaA;

let xK, yK, despK, dirK;   // Variables Rey
let viveK;

/////////////////////////////////////////////////////////////////////////////////
//                                SETUP
/////////////////////////////////////////////////////////////////////////////////

function setup() 
{
  createCanvas(500, 500); // tamaño de pantalla

  Piezas = loadFont("data/Piezas.vlw"); // cargo fuente desde Data

  MENU = loadImage("data/MENU.png");
  GANASTE = loadImage("data/GANASTE.png");
  PERDISTE = loadImage("data/PERDISTE.png");
  CREDITOS = loadImage("data/CREDITOS.png");
  TABLERO = loadImage("data/TABLERO.jpg");

  pantalla = "MENU";

  cursor(HAND);
}

/////////////////////////////////////////////////////////////////////////////////
//                                        DRAW
/////////////////////////////////////////////////////////////////////////////////

function draw() 
{
  background(255);
  // Switch entre pantallas
  switch(pantalla) {

  case "MENU" :

    tam = 40;

    image(MENU, 0, 0);  //foto de fondo del Menu

    push();
    fill(0);
    textSize(16);
    textAlign(CENTER);
    text( "||------------------------------------------||", 248, 210);
    text( "||------------CAZA-FICHAS-------------||", 248, 230);
    text( "||------------------------------------------||", 248, 250);
    pop();

    push();                           //BOTON JUGAR
    xBotonA = 180;
    yBotonA = 275;

    fill(255, 90);
    noStroke();
    circle(xBotonA, yBotonA, tam);

    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text( "JUGAR", xBotonA, yBotonA-3);
    pop();

    push();                           //BOTON CREDITOS
    xBotonB = 320;
    yBotonB = 275;

    fill(255, 90);
    noStroke();
    circle(xBotonB, yBotonB, tam);

    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text( "Créditos", xBotonB, yBotonB-3);
    pop();

    break;


  case "JUGANDO" :

    push();
    tint(255, 100);
    image(TABLERO, 0, 0); //   TABLERO
    pop();

    en_juego();

    push();                          //TIMER
    fill(250, 75);
    rect(220, 40, 60, 20);
    pop();
    push();
    fill(0);
    textSize(13);
    textAlign(CENTER);
    text( "tiempo: " + round(timer), width/2, 55);
    pop();

    if (vivaT == false && vivaR == false && vivaA == false && viveK == false)
    {
      cursor(HAND);
      pantalla = "GANAR";           //cambio de estado al GANAR
    } else if (timer >=10)
    {
      pantalla = "PERDER";          // cambio de estado al PERDER
    }


    break;

  case "GANAR" :

    image(GANASTE, 0, 0);

    timer = round(timer);

    push();
    fill(0);
    textSize(16);
    textAlign(CENTER);
    text( "||------------------------------------------||", 248, 210);
    text( "||---------------GANASTE----------------||", 248, 230);
    text( "||------------------------------------------||", 248, 250);
    textSize(15);
    text( timer + " seg", 163, height/2 +25);
    text( "clicks: " + clicks, 167, height/2 +45);
    pop();

    push();                           //BOTON MENU
    xBotonA = 250;
    yBotonA = 275;
    tam = 40;
    fill(255, 90);
    noStroke();
    circle(xBotonA, yBotonA, tam);
    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text( "MENU", xBotonA, yBotonA-3);
    pop();



    break;

  case "PERDER" :

    image(PERDISTE, 0, 0);  //imagen PERDISTE

    push();
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text("¡PERDISTE!", 250, 230);
    pop();

    push();                           //BOTON MENU
    xBotonA = 250;
    yBotonA = 275;
    tam = 40;
    fill(255, 90);
    noStroke();
    circle(xBotonA, yBotonA, tam);
    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text( "MENU", xBotonA, yBotonA-3);
    pop();

    break;

  case "CREDITOS" :

    image(CREDITOS, 0, 0);          // imagen CREDITOS

    push();
    fill(0);
    textSize(13);
    textAlign(LEFT);
    text("TP02 - Informática Aplicada 1 - cát. Bedoian - Turno Noche", 90, 100);
    text("Universidad Nacional de las Artes - Artes Multimediales", 90, 120);
    text("Schiavi Iglesias, Pedro", 90, 160);
    text("Gracias por jugar a CAZA-FICHAS", 90, 200);
    pop();

    push();                           //BOTON MENU
    xBotonA = 250;
    yBotonA = 250;
    tam = 40;
    fill(255, 90);
    noStroke();
    circle(xBotonA, yBotonA, tam);
    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text( "MENU", xBotonA, yBotonA-3);
    pop();

    break;

  default:
    println("ESTADO INEXISTENTE");
    break;
  }

}

/////////////////////////////////////////////////////////////////////////////////
//                             FUNCIONES
/////////////////////////////////////////////////////////////////////////////////
function en_juego()
{
  cursor(CROSS);

  if (vivaR == true) {
    Reina();
  }
  if (vivaT == true) {
    Torre();
  }
  if (vivaA == true) {
    Alfil();
  }
  if (viveK == true) {
    Rey();
  }

  timer += 0.01666666666;
}

/////////////////////////////////////////////////////////////////////////////////

function Reina()
{

  push();                                     //Dibujo Reina
  fill(200);
  circle( xR, yR, tam);
  fill(0);
  textSize(10);
  textFont(Piezas);
  textAlign(CENTER);
  textSize(45);
  text( "w", xR, yR +20);
  pop();
  //Movimiento de Reina
  let despXR  = cos( dirR ) * despR;
  let despYR  = sin( dirR ) * despR;

  xR+=despXR;
  yR+=despYR;

  if ( xR>width-20 || xR<20) {
    dirR = atan2( despYR, -despXR);//espeja su direccion
  }

  if ( yR>height-20 || yR<20) {
    dirR = atan2( -despYR, despXR); //espeja su direccion
  }
}

/////////////////////////////////////////////////////////////////////////////////

function Torre() {

  push();                                     //Dibujo Torre
  fill(200);
  circle( xT, yT, tam);
  fill(0);
  textFont(Piezas);
  textAlign(CENTER);
  textSize(45);
  text( "t", xT +1.5, yT +20);
  pop();

  xT+= despT;    //Movimiento de torre

  if ( xT > width + tam)
  {
    despT = -despT;           // rebota
    yT = random(50, 450);   // Cambia de altura
  }

  if ( xT < -tam)
  {
    despT = -1 * despT;       // rebota
    yT = random(50, 450);  // Cambia de altura
  }
}

/////////////////////////////////////////////////////////////////////////////////

function Alfil()
{

  push();                                     //Dibujo Alfil
  fill(200);
  circle( xA, yA, tam);
  fill(0);
  textFont(Piezas);
  textAlign(CENTER);
  textSize(45);
  text( "n", xA, yA +20);
  pop();
  //Movimiento de Alfil
  let despXA  = cos( dirA ) * despA;
  let despYA  = sin( dirA ) * despA;

  xA+=despXA;
  yA+=despYA;

  if ( xA > width + 40 )
  {
    xA = -40;
  }

  if ( yA  > height + 40 )
  {
    xA = -40;
    yA = random(450);
  }
}

/////////////////////////////////////////////////////////////////////////////////

function Rey()
{
  push();                                     //Dibujo Rey
  fill(200);
  circle( xK, yK, tam);
  fill(0);
  textFont(Piezas);
  textAlign(CENTER);
  textSize(45);
  text( "l", xK, yK +15);
  pop();
  // Movimiento Rey

  let despXK  = cos(radians(dist( pmouseX, pmouseY, xK, yK )) ) * despK;
  let despYK  = sin(radians(dist( pmouseX, pmouseY, xK, yK )) ) * despK;

  xK+= despXK * 0.7;
  yK+= despYK * 0.7;


  if ( xK > width ) {
    xK = 20;
  }
  if ( xK < -20 ) {
    xK = width;
  }

  if ( yK > height) {
    yK = 20;
  }
  if ( yK < -20 ) {
    yK = height;
  }
}


/////////////////////////////////////////////////////////////////////////////////
//                            INTERACTIVIDAD
/////////////////////////////////////////////////////////////////////////////////

function mousePressed()
{


  if (pantalla == "MENU")
  {

    if ( dist(mouseX, mouseY, xBotonA, yBotonA) < tam/2 )  //colision BOTON JUGAR
    {
      tam = 50;                            //Inicializacion y Resteos
      timer = 0;
      clicks = 0;

      dirR = radians(random(360));    //reset reina
      despR = 5;
      xR = random(tam, width-tam);
      yR = random(tam, height-tam);
      vivaR = true;

      xT = random(tam, width-tam);     //reset torre
      yT = random(tam, height-tam);
      despT = 5;
      vivaT = true;

      dirA = radians(30);    //reset Alfil
      despA = 5;
      xA = random(tam, width-tam);
      yA = random(tam, height-tam);
      vivaA = true;

      viveK = true;   //reset Rey
      xK = random(tam, width-tam);
      yK = random(tam, height-tam);
      despK = 5;


      pantalla = "JUGANDO";           //cambio de estado
    }

    if ( dist(mouseX, mouseY, xBotonB, yBotonB) < tam/2 )  //colision BOTON CREDITOS
    {
      pantalla = "CREDITOS";
    }
  } else if (pantalla == "JUGANDO")
  {
    clicks++;

    if ( dist(mouseX, mouseY, xT, yT) < tam/2 )
    {
      vivaT = false;
    } // borrar Torre si hay colision

    if ( dist(mouseX, mouseY, xR, yR) < tam/2 )
    {
      vivaR = false;
    } // borrar Reina si hay colision

    if ( dist(mouseX, mouseY, xA, yA) < tam/2 )
    {
      vivaA = false;
    } // borrar Alfil si hay colision

    if ( dist(mouseX, mouseY, xK, yK) < tam/2 )
    {
      viveK = false;
    } // Borrar rey si hay colision
  } else if (pantalla == "GANAR")
  {
    cursor(HAND);

    if ( dist(mouseX, mouseY, xBotonA, yBotonA) < tam/2 )
    {
      pantalla = "MENU";
    }
  } else if (pantalla == "CREDITOS")
  {
    cursor(HAND);

    if ( dist(mouseX, mouseY, xBotonA, yBotonA) < tam/2 )
    {
      pantalla = "MENU";
    }
  } else if (pantalla == "PERDER")
  {
    cursor(HAND);

    if ( dist(mouseX, mouseY, xBotonA, yBotonA) < tam/2 )
    {
      pantalla = "MENU";
    }
  }
}
