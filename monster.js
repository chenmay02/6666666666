var monster_colors = "ede0d4-e6ccb2-ddb892-b08968-7f5539-9c6644".split("-").map(a=>"#"+a)

class Monster {
  constructor(args) {
    this.r = args.r || random(50,100)
    this.p = args.p || createVector(random(0+this.r,width-this.r), random(0+this.r,height-this.r))
    this.v = args.v || createVector(random(-1,1), random(-1,1))
    this.color = args.color || random(monster_colors)
    this.mode = random(["happy","bad"])
    this.dead = false; // 活着
    this.deadStartTime = 0; // 死亡状态开始时间
    this.deadDuration = 8000; // 死亡状态持续时间（以毫秒为单位）
  }
  
  draw() {
    push();
    translate(this.p.x, this.p.y);
    fill(this.color);
    noStroke();
    
    // 绘制星星形状
    beginShape();
    for (var i = 0; i < 25; i++) {
      var angle = map(i, 0, 10, 0, TWO_PI);
      var x = cos(angle) * this.r;
      var y = sin(angle) * this.r;
      vertex(x, y);
      var angle2 = map(i + 0.5, 0, 10, 0, TWO_PI);
      var x2 = cos(angle2) * (this.r / 2);
      var y2 = sin(angle2) * (this.r / 2);
      vertex(x2, y2);
    }
    endShape(CLOSE);
  if (this.dead == false) {
    if (this.mode == "happy") {
      fill(255);
      ellipse(0, 0, this.r/2);
      fill(0);
      ellipse(0, 0, this.r/3);
    } else {
      fill(255);
      arc(0, 0, this.r/2, this.r/2, 0, PI);
      fill(0);
      arc(0, 0, this.r/3, this.r/3, 0, PI);
    }
  } 
  else {
    this.deadStartTime = this.deadStartTime+1
    stroke(0);
    line(-this.r / 2, 0, this.r / 2, 0);
    stroke(this.color);
    strokeWeight(4);
    noFill();
    for (var j = 0; j < 10; j++) {
      rotate(PI / 5);
      line(this.r / 2, 0, this.r, 0);
    }
  }
    pop();
  }

  update() {
    this.p.add(this.v);

    if (this.p.x <= 0 + this.r || this.p.x >= width - this.r) {
      this.v.x = -this.v.x;
    }
    if (this.p.y <= 0 + this.r || this.p.y >= height - this.r) {
      this.v.y = -this.v.y;
    }
  }

isMonsterInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在此物件的範圍內
        let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
        if(d<this.r){ //滑鼠與物件的距離小於物件的寬度，代表碰到了
            return true //傳回true的值
        }
        else{ //滑鼠與物件的距離大於物件的寬度，代表沒有碰到
            return false //傳回false值
        }
    }

}