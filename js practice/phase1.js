//Print "Good Morning", "Good Afternoon", or "Good Evening" based on time.

const { createElement } = require("react");

function greet(time){
if(time>0 && time<11){
    return("Good Morning");
}else if(time>=12 && time<=16){
    return("Good Afternoon");
}else if(time>16 && time<25){
    return("Good Evening");
}
}




// Generate a random OTP of 4 digits.
// Math.floor(Math.random() * (max - min + 1)) + min

function otpgenerate(){
    let random = Math.floor(Math.random()*(9999-1000+1))+1000;
    return random;
}



// Convert a full name into uppercase initials.
// console.log(initials("Rudranil kesh"));
function initials(name){
    let s = name.split(" ");
    let initials = "";

    for(let i=0;i<s.length;i++){
        let x = s[i];
        initials+= x.charAt(0).toUpperCase();
    }
    return initials
}




// Check whether two strings are equal ignoring case sensitivity.
// console.log(compare("raj","Rajendra"));
// console.log(compare("raj","Raj"));


function compare(str1,str2){
    let one = str1.toLowerCase();
    let two = str2.toLowerCase();

    if(one===two){
        return true
    }else{
        return false
    }
}


// Create a function named greet that prints "Hello World".

let first = () => {
    console.log("Hello world");
}
// first()
// console.log(first());


// Create a function with default parameter "Guest".
let x = (name = "guest") => {
    console.log("welcome " + name);
}

// x()


// Write a function expression for multiplication.
const y = (a,b) =>{
    console.log(a*b);
};

// y(6,7);


// Create a function that accepts unlimited numbers and returns their sum using rest operator.

let sum = (...numbers) => {
    let total =0;
    for(let n of numbers){
        total+=n;
    }  
    return total;
};

// console.log(sum(1,2,3,4,5,6,78,89))

// Write a callback function example using setTimeout.


// setTimeout(()=>{
//     console.log("My name is Rudranil");
//     console.log("my name is mao mao");
// },3000);


// Create a higher-order function that executes another function twice.

function higherorder(name,callback){
    console.log("hi " + name);
    callback(name);
}
function rollback(name){
    console.log("good morning "+name);
}

// higherorder("raj",rollback);


// Write a function that returns another function.
const createMultiple = (multiple) => (num) => console.log(num * multiple);

// createMultiple(4)(5);

// Create a pure function for subtraction

const sub = (a,b) => {return a-b};

// console.log(sub(5,2));


// Create an impure function using global variable modification.

let a = 10;

const change = (l,b)=>{
    a=l*b;
}

change(5,3)
// console.log(a);

