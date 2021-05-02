class Pig extends BaseClass{
    constructor(x,y){
     super(x, y, 50, 50);
     this.img = loadImage("sprites/enemy.png");
     this.Visibility = 255;
     
    }
    display(){
        
        console.log(this.body.speed);
        if(this.body.speed < 3){
            super.display();
        }
        else{
            World.remove(world, this.body);
            push();
            this.Visibility = this.Visibility - 5;
            tint(255, this.Visibility);
            image(this.img, this.body.position.x, this.body.position.y, 50, 50);
            pop();
        }
    }
}