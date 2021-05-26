//Create variables here
var dog , happyDog
var database
var foodS , foodStock
var dogImg , happyDogImg
var feedButton , addFoodButton
var fedTime , lastFed
var foodObj

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png")
  happyDogImg  = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database()
	createCanvas(800, 700);

  foodObj = new Food()

  foodStock = database.ref('Food')
  foodStock.on("value",readStock)

  dog = createSprite(400,450,30,30)
  dog.addImage(dogImg)
  dog.scale = 0.45

  

  feedButton = createButton("Feed the dog")
  feedButton.position(700,95)
  feedButton.mousePressed(feedDog)
  
  addFoodButton = createButton("addFoodS")
  addFoodButton.position(800,95)
  //addFoodButton.mousePressed(addFoodS)
  addFoodButton.mousePressed(addFoodS)
}


function draw() {  
 background(46,139,87)

 foodObj.display()

 fedTime = database.ref('FeedTime')
 fedTime.on("value",function(data){
   lastFed = data.val()
 })

fill(255,255,258)
textSize(15)
if(lastFed>=12){
  text("Last Feed : " + lastFed%12 + " PM" , 350 , 30)
} 
else if(lastFed==0){
  text("Last Feed : 12AM",350 , 30)
}
else{
  text("Last Feed" + lastFed + "AM" , 350 , 30)
}

//jnvjf vn

foodObj.display()



drawSprites();
 
}

//function to read_values from DB
function readStock(data){

  foodS = data.val();
  foodObj.updateFoodStock(foodS)
  //lastFed = data.val();
}

//function to update FoodStock and last fedTime
function feedDog(){
  dog.addImage(happyDogImg)

  foodObj.updateFoodStock(foodObj.getfoodStock()-1)
  database.ref('/').update({
  Food:foodObj.getfoodStock(),
  FeedTime:hour()
  })
}

 //function to add food in Stock 
 function addFoodS(){
   foodS++
   database.ref('/').update({
     Food:foodS
   })
 }






