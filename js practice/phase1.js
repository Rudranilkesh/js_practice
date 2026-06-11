//Print "Good Morning", "Good Afternoon", or "Good Evening" based on time.

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

console.log(compare("raj","Raj"));

