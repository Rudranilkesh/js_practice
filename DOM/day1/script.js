const bulb = document.querySelector(".bulb");
const btn = document.querySelector("button");

let flag = true;

// btn.addEventListener('click',()=>{
//     if(flag){
//     bulb.style.backgroundColor = 'yellow';
//     btn.textContent = 'OFF';
//     flag = false;
//     } else {
//         bulb.style.backgroundColor = 'transparent';
//     btn.textContent = 'ON';
//     flag = true;
//     }
// });

// without flag

btn.addEventListener('click',()=>{
    if(bulb.classList.toggle("lightup")){
        btn.textContent = "off";
    } else {
        btn.textContent = "On";
    }
});