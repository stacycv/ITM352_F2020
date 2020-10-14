while(true) {
    controller.move();
    
if(controller.move() == false) {
    controller.rotate();
    }
 }

