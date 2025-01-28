// # include duck class
/* visualise self-data set from .csv file*/
// first step: open the file! https://p5js.org/reference/p5/loadTable/
let table;

function preload() {
  // csv is formatted with comas seperaing each column and a header specifying the column labels
  table = loadTable('/SleepData.csv','csv');
}
// next step: use the table! https://p5js.org/reference/p5/p5.Table/
function setup() {
  createCanvas(800,1100);
  background(200,200,200);
  tic = -1; // initialise 'tic' to track the iterations of the sketch
  click = 0; //initialise 'click' to track the mouse clicks
  //count the columns
  rowN = table.getRowCount();
  colN = table.getColumnCount();
  spacingN = 20
  // let duck1 = new Duck(20,20,50);
  AsleepDuck = new Duck(100,100,20);
  AsleepDuck.colour(0,0,0);
  ImbetweenDuck = new Duck(100,100,20);
  ImbetweenDuck.colour(155,155,155);
  AwakeDuck = new Duck(155,155,20);
  ducKey = new Duck(20,20,15);
  ducKey.colour(255,0,0)
  // AwakeDuck = new Duck(random(width),random(height),random(100),232, 235, 52,'awake');
  // ImbetweenDuck = new Duck(random(width),random(height),random(100),0,0,0,'d');
  // want to calculate spacing fromcsv so width/rows for x, etc.
  spacingX = (width - 4*spacingN) / rowN; 
  spacingY = (height - 4*spacingN) / colN;
  
  if (click == 0) {
    textSize(22);  //  https://p5js.org/reference/p5/text/#:~:text=Call%20textSize()%20and%20textFont,fonts%20loaded%20with%20loadFont().
    textStyle(BOLD); // https://p5js.org/reference/p5/textStyle/
    text(str('click to reveal data'),width*0.4,height * 0.515);
    textSize(10)
  }
  // take table info and store in array
  // #############################################################################################  record table data to 'data' array
  data = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Friday
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Saturday
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Sunday
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Monday
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Tuesday
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Wednesday
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]; // Thursday

  for (let r = 1; r < table.getRowCount(); r++) {
    for (let c = 1; c < table.getColumnCount(); c++) {
      // text((table.getString(r, c)),c*80+20,r*70+100,200);
      if ((r != 0)&&(c!=0)) {
        data[r-1][c-1] = table.getString(r, c);
      }
    }
  }
}

class Duck {
  constructor(x,y,size){
    // duck pos x and y
    this.x = y;
    this.y = x;
    // duck movement gradient
    this.t = random(10);
    this.u = random(10);
    // ducks rgb colour variables
    this.r = 255;
    this.g = 255;
    this.b = 0;
    this.l = size;// unit length to standardise the size of the ducks
    this.grows = 1; //operator to control zoom fucntion
    this.z = random(width/6); //zoom variable for duck zoom rate
    this.d = 0
  }
  show(){
    // body
    stroke(this.r,this.g,this.b);
    fill(this.r,this.g,this.b);
    circle(this.x,this.y,this.l);
    circle(this.x+(4.5*this.l/5),this.y+(4*this.l/5),this.l);
    ellipse(this.x+(2*this.l/5),this.y+this.l,this.l*2,this.l+(this.l/5));
    //bill
    stroke(this.g, this.b, abs(this.r+100));
    fill(this.g, this.b, abs(this.r+100));
    ellipse(this.x-(2*this.l/5),this.y,(3*this.l/5),this.l/5);
    ellipse(this.x-(1.5*this.l/5),this.y-(this.l/10),(1.5*this.l/5),this.l/10);
    // duck eyes
      //eye white
    stroke(0,0,0);
    fill(0,0,0);
    circle(this.x+(this.l/5),this.y-(this.l/10),(1.1*this.l/5));
      // eye black
    stroke(255,255,255);
    fill(255,255,255);
    circle(this.x+(1.2*this.l/5),this.y-(1*this.l/5),this.l/10);
    // data
    stroke(255,255,255,2)
    fill(0,0,0);
    if ((this.r == 0) && (this.g == 0) && (this.b == 0)){ //if duck is black make text white
      fill(255,255,255)
    }
    text(str(this.d),this.x-(this.l/4),this.y+this.l*1.3)
  }
  colour(r,g,b){  // changed to set colour
    this.r = r;
    this.g = g;
    this.b = b;
  }
  new(x,y,d){ // changed to update x,y,d AND show duck
    this.x = x;
    this.y = y;
    this.d = str(d*60+' min');
    this.show();
  }
}

function draw(){  
  // background(200,200,200);
  //  create key to understand the graph
  keyX = width/2 + 3.6*spacingN;
  keyY = 30;
  keyN = 92;
  stroke(180,180,180)
  fill(180,180,180)
  rect(width/2+2.5*spacingN,spacingN*0.5,width*0.42,spacingN*3)
  ducKey.colour(155,155,155);  // imbetween duck key
  ducKey.new(keyX+keyN,keyY,0.3)
  text("   = imbetween sleep", keyX+26 +keyN, keyY+20,)
  ducKey.colour(255,255,0);  // awake duck key
  ducKey.new(keyX+2.55*keyN,keyY,0)
  text("= Awake", keyX+2.82*keyN, keyY+20,)
  ducKey.colour(0,0,0);  // asleep duck key
  ducKey.new(keyX,keyY,1)
  fill(0,0,0)
  text("= asleep", keyX+30, keyY+20,)
  textSize(22)  //  https://p5js.org/reference/p5/text/#:~:text=Call%20textSize()%20and%20textFont,fonts%20loaded%20with%20loadFont().
  textStyle(BOLD); // https://p5js.org/reference/p5/textStyle/
  text(str('Percentage of Sleep Had Hourly per Day'),spacingN*0.8,3*spacingN);
  
  textSize(10)
  for (let r = 0; r < table.getRowCount(); r++) {
    for (let c = 0; c < table.getColumnCount(); c++) {
      // text((table.getString(r, c)),c*80+20,r*70+100,200);
      if ((r == 0)&&(c > 0)) { // column header i.e. time of day
        text((table.getString(r, c)),r*70+spacingN,(height-spacingN-11)-c*spacingY,spacingN);
        // duck1 = new Duck(r*70+spacingN,(height-spacingN-11)-c*spacingY,50);
      } else if ((r >= 1)&&(c == 0)){ // row header i.e. day of the week 
        // duck1 = new Duck(r*70+spacingN,(height-spacingN)-c*spacingY,50);
        text((table.getString(r, c)),r*spacingX,(height-spacingN)-c*spacingY,spacingN);
      }
      // else{ ... rest of the data aside from headers}
    }
  }
  describe(`chart of percentage of sleep had per hour per day for a week in November"`);
  tic += 1; //tic starts at 0;
  for (let day = 0; day <= data.length; day++){
    for (let time = 0; time < data[day].length; time++) {
      p = data[day][time];
      if (p == 0){
        AwakeDuck.new(7*spacingN+spacingX*day-30,spacingN+spacingY*time+80,p);
      } else if (p == 1){
        AsleepDuck.new(7*spacingN+spacingX*day-30,spacingN+spacingY*time+80,p);
      } else {
        ImbetweenDuck.new(7*spacingN+spacingX*day-30,spacingN+spacingY*time+80,p);
      }
    }
  }  
}
