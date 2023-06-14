class Bullet{
    constructor(args){ //預設值，基本資料(物件顏色、移動速度、大小、初始顯示位置.......)
        this.r = args.r || 100  //設計飛彈有大有小時，就傳參數，args.r來設定飛彈大小，沒有參數就以10為主
        this.p = args.p ||createVector(width/2,height/2)    //建立一個向量{x:width/2, y:height/2}
        this.v = args.v ||createVector(mouseX-width/2,mouseY-height/2).limit(10)
        this.color = args.color || "#e4c1f9"

    }
    draw(){ //繪出物件
        push()
             translate(this.p.x,this.p.y)
             fill(this.color)
             noStroke()
            ellipse(0,0,this.r)
        pop()
    }
    update(){ //計算出移動後的位置
        this.p.add(this.v)
    }

}