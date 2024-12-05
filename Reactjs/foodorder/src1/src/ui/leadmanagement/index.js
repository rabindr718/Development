 
 const changeInter=(first, second)=>{
 	return "The quick brown `${first}` jumps over the lazy `${second}`"

 }
 console.log('Start'); 

 setTimeout(() => console.log('Timeout'), 5000);

 Promise.resolve().then(() => console.log('Promise'));

 console.log('End');
 

 Start
 Timeot
 Promise
 End