
// var errpsw = document.getElementById('errorPassword');
// var errname = document.getElementById('errorName');

// console.log(error);

function CheckForBlank(){

   let name = document.forms['Login']['uname'].value;
   let password = document.forms['Login']['psw'].value;
    //    alert('error');
    document.getElementById('errorName').innerHTML = 'Please Enter You Login';
    document.getElementById('errorPassword').innerHTML = 'Please Enter Your Password'
       return false;
   } 