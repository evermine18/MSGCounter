```javascript
let msg = JSON.parse(localStorage.getItem("messages"))
let remainingTime = [];

for(let i = 0;i<msg.length;i++){
    msg[i] = new Date(msg[i]);
    let threeHoursLater = new Date(msg[i].getTime() + 2*60*60*1000);
    let time = new Date(threeHoursLater - new Date())
    remainingTime.push(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`);

}
console.table({"Sended Hour":msg, "Remaining Time":remainingTime});
```