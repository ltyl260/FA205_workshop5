*link: https://ltyl260.github.io/FA205_workshop5/*

## Workshop 5: Data and Visualisation
I need to produce a 'data self-portrait' in a p5.js sketch by making a visualisation that shows something about yourself from a dataset. Use a csv file to store the dataset.
 
For my sleep issues I’ve had to keep track of my sleep. I’ve had to keep track of my sleep in excel so I have converted them from the shaped cell format I was asked to initially fill it out in, into a percentage of sleep per hour. 
I want to display this data using ducks! Different colours for being awake/asleep!
# Interpreting the .csv dataset
After loading my .csv as a proof of concept I decided it was much easier to store my data into an array                                                                       
> data = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Friday                                                          
>          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Saturday                                                     
>          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Sunday                                                     
>          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Monday                                                     
>          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Tuesday                                                     
>          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  // Wednesday                                                     
>          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]; // Thursday                                                     
From here I can store the info from my .csv table into this conveniently indexable data array!                                                     
>  for (let r = 1; r < table.getRowCount(); r++) {
 >   for (let c = 1; c < table.getColumnCount(); c++) {
   >  if ((r != 0)&&(c!=0)) {
   >     data[r-1][c-1] = table.getString(r, c);
   >   }
I then used this to add ducks like a bar graph except each duck is shaded and displays the number of minutes slept in a given hour of the day in the week. And it looks absolutely stunning! **such a shame that it doesn’t seem to load through github** *hopefully I can fix this easily as it works perfectly locally… not too sue what’s gone wrong by uploading it to pages*
#interactivity
I also spent WAY too long getting each column to reveal with a mouse click for a big reveal and it works amazingly locally, I tried removing it in hopes of making loading easier but alas nothing worked. At least I can still enjoy it on my computer!
> function mouseClicked(){
  if (click == 0) {
    textSize(22);  //  https://p5js.org/reference/p5/text/#:~:text=Call%20textSize()%20and%20textFont,fonts%20loaded%20with%20loadFont().
    textStyle(BOLD); // https://p5js.org/reference/p5/textStyle/
    text(str('click to reveal data'),width*0.4,height * 0.515);
    textSize(10)
  } if (click == 1) {
    fill(200,200,200)
    rect(width*0.4,height * 0.5,200,20)
  }
   day = click;
    for (let time = 0; time < data[day].length; time++) {
      p = data[day][time];
      if (p == 0){
     AwakeDuck.new(7*spacingN+spacingX*day-30,spacingN+spacingY*time+80,p);
      } else if (p == 1){
      AsleepDuck.new(7*spacingN+spacingX*day-30,spacingN+spacingY*time+80,p);
      } else {  ImbetweenDuck.new(7*spacingN+spacingX*day-30,spacingN+spacingY*time+80,p)}  } click+=1; }

#resolution
My brain is 90% full of ducks and this was the perfect way to visualise how awake and alert they all are!


   
