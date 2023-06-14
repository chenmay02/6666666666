let points = [[2, 4], [3,6], [6, 5],[8,6],[9,6],[7,4],[8,4],[8,3],[9 ,3],[7,1],[6,-6],[3,-6],[4,-3],[-3,-3],
[-4,-6],[-7,-6], [-6,-1], [-7, 5],[-6,7],[-4,7],[-5,5],[-4,2], [2, 2],[3,3],[2,3],[4,4],[3,5]]; //小狗
var fill_colors = "ffcdb2-ffb4a2-e5989b-b5838d-6d6875".split("-").map(a=>"#"+a) //填滿顏色
var line_colors = "22223b-4a4e69-9a8c98-c9ada7-f2e9e4".split("-").map(a=>"#"+a) //線條顏色

 //++++++++++設定畫points所有"點"的物件變數
  var ball 
  var balls=[]
  //++++++++++++++++設定飛彈物件變數
  var bullet
  var bullets =[]
  //++++++++++++++++設定怪物的物件變數
  //設定怪物的物件變數
  var monster //把目前要處理的物件，暫存到bullet變數內
  var monsters = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
  var score =0 //分數
  var shipP//設定砲台位移

  function preload(){ //加入音樂
    cat_sound = loadSound("mousic/cat3b.mp3")
    bullet_sound = loadSound("mousic/jump13.mp3")
    monster_sound = loadSound("mousic/destruction1.mp3")
  }


  function setup() {
    createCanvas(windowWidth, windowHeight);
    shipP = createVector(width/2,height/2)
    for(var i=0;i<20;i=i+1){ 
      ball = new Obj({}) //產生一個Obj class元件
      balls.push(ball) //把ball的物件放入到balls陣列內
    }
    for(var i=0;i<10;i=i+1){
      monster = new Monster({}) //產生一個Obj class元件
      monsters.push(monster) //把ball的物件放入到balls陣列內
    }
  }
  
 
  function draw() {
    background(220);
  //  for(var j=0;j<balls.length;j=j+1){
  //   ball =balls[j]
  //   ball.draw()
  //   ball.update()
  //  }

  if(keyIsPressed){
    if(key=="ArrowRight" || key=="d"){ //下往右鍵或d往右移動
      shipP.x = shipP.x+5
    }
  
    if(key=="ArrowLeft" || key=="a"){ //按往左鍵或a往左移動0
      shipP.x = shipP.x-5
    }
  
    if(key=="ArrowUp" || key=="w"){ //按往上鍵或w往上移動
      shipP.y = shipP.y-5
    }
  
    if(key=="ArrowDown" || key=="s"){ //按往下鍵或s往下移動
      shipP.y = shipP.y+5
    }

  }


  //貓咪顯示
   for(let ball of balls) //只要是陣列方式，都可以利用此方式處理
   {
     ball.draw()
     ball.update()
     for(let bullet of bullets){ 
        if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){   //物件有無接觸現在的ball 
          balls.splice(balls.indexOf(ball),1) //按物件，少一個物件
          bullets.splice(bullets.indexOf(bullet),1) 
          score = score - 1
          cat_sound.play()
        }
      }
   }
 
  //飛彈顯示
   for(let bullet of bullets) //只要是陣列方式，都可以利用此方式處理
   {
     bullet.draw()
     bullet.update()
   }
   
   //怪物的顯示(monster)
   for(let monster of monsters){ //只要是陣列的方式，都可以利用此方式處理
    if(monster.dead == true && monster.deadStartTime>4 ){
      monsters.splice(monsters.indexOf(monster),1)
    }
     monster.draw()
     monster.update()
     for(let bullet of bullets){ //檢查每一個物件
      if(monster.isMonsterInRanger(bullet.p.x,bullet.p.y) ){ //飛彈物件有沒有接觸現在的ball
        // monsters.splice(monsters.indexOf(monster),1) //從倉庫balls裡取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取一個
        bullets.splice(bullets.indexOf(bullet),1)         
        score = score + 2 
        monster_sound.play()
        monster.dead = true
      }
    }
   }
  
  push()
    fill(255)
    textSize(50)
    text(score,50,50)//在座標(50,50)上，顯示score分數內容
  pop()



  
  push()  //開始設定
     let dx = mouseX - width/2 //滑鼠
     let dy = mouseY - height/2 //滑鼠
     let angle = atan2(dy,dx) //跟著滑鼠移動
        translate(shipP.x,shipP.y)
        noStroke()
        rotate(angle)
        fill("#cdb4db")
        ellipse(0,0,50)
        fill("#ffafcc")
        triangle(-25,25,-25,-25,50,0) //設定三個點，畫成三角形
  pop()  //設定恢復原樣

    if (score >= 15) {
      background("#ffcdb2");
      fill(255);
      textSize(100);
      textAlign(CENTER, CENTER);
      text("恭喜你，你是神射手", width / 2, height / 2);
    } else if (score < (-5)) {
      background("#e5989b");
      fill(255);
      textSize(100);
      textAlign(CENTER, CENTER);
      text("可惜，再接再厲", width / 2, height / 2);
    }
  }

  
  
    // function mousePressed(){
    // for(let ball of balls){ //檢查每一個物件
    //   if(ball.isBallInRanger()){ 
    //     balls.splice(balls.indexOf(ball),1) //按物件，少一個物件
    //     score = score + 1
    //   }
    // }  

    //++++++++++++++按一下產生一個飛彈++++++++++++++++++++++++++++++++++++++
    function mousePressed(){ 
    bullet = new Bullet({}) //在滑鼠按下的地方，產生一個bullet class 元件(產生一個飛彈)
    bullets.push(bullet)    //把bullet的物件放到bullets陣列內
    bullet_sound.play()
  }
    function keyPressed(){
      if(key==" "){ //按下空白鍵
        bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛彈(Bullet class)
        bullets.push(bullet)
        bullet_sound.play()
    }
  }
  