/////// EVENT
////// EventEmitter is a class in which we have to use emit("event emit parameter") for trigger./crate/fire event and on("emit parameter",call back function) is a listener that will register  //////

// emit on()

// const EventEmitter = require('events');
// const event = new EventEmitter();
// // event.on("greet",()=>{
//     // console.log("this is event emitter")
// // })
// event.once("greet",()=>{
//         console.log("this is event emitter")

// })
// event.emit("greet");


///// ----> PROGRAM-1  <---- /////
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const event = new MyEmitter();

// Register listeners
event.on("greet", (name) => {
    console.log(`Hello ${name}`);
});

event.on("exit", () => {
    console.log("Exits my custom event emitter...");
});

// Emit events
event.emit("greet", "CSE-25");
event.emit("exit");









