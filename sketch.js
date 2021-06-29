var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var hour1;
var response,response1,response2,response3
//create feed and lastFed variable here
var feed
var lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage('dog',sadDog);
  dog.scale=0.2

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  feedDog=createButton("Feed the dog")
  feedDog.position(700,95)
  feedDog.mousePressed(feedDogs)
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref('feedTime'); 
  fedTime.on("value",function(data){ 
    lastFed=data.val();
  })
  
    fill("black")
    textSize(20)
  //write code to display text lastFed time here
 if (lastFed>=12){
fill("black")
 
  text("Last Fed: "+lastFed%12+ ' pm',350,30)
 }else if(lastFed===0){
   fill("black")
   text("Last Fed:"+" 12am",350,30 )
 }else {
   fill("black")
   text("Last Fed:"+lastFed+"am",350,30)
 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDogs(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
 food_val=foodObj.getFoodStock();
  if (food_val<=0){
    foodObj.updateFoodStock(food_val*0)
  }else {
    foodObj.updateFoodStock(food_val-1)
  }

 

  database.ref("/").update({
    food:foodObj.getFoodStock(),
  
    feedTime:hour()
  })


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
