const EventEmitter = require("events");
class Button extends EventEmitter {
    click(){
    console.log("Button Clicked");
this.emit("Click");

    }
    mouseOver(){
        console.log("Mouse is over the button");
        this.emit("mouseOver");

    }

}
const button = new Button();//object creation of Button
button.on("click",()=>{
    console.log("Click event handled");
});
button.on("mouseover",()=>{
    console.log("this is mouseover DOM handling in node js");
    
});

