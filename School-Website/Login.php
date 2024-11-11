<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<head>
  </script>
  <style> 
 p1{color: rgb(45, 226, 114);
margin-bottom : -20px;
padding: 410;
font-size: 70px;
}
#Heading{
  width:80%;
  color:#fff;
  top:30%;
  left:50%;
  bottom: 500%;
  position: absolute;
  transform: translate(-50%,-50%);
  border-radius: 10px;
  border-top:40%;
  text-align: center;
}
button{
          font-size: 20px;
          font-weight: bold;
          background-color: orange;
          color: white;
          padding: 14px 20px;
          margin: 8px 105px;
          cursor: pointer;
          border: none;
          width: 30%;
          border-radius: 7px;
        }
body{
  background-color: rgb(9, 122, 160);
}
/* After Moving Cursor on Submit Button */
button:hover {
  opacity: 0.8;}

  .container{
    padding: 100px;
  }
  /* Entering value in Username and password */
  input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  }
</style>
</head>
<body>
<?php
$errorName = $errorPassword = "";
$name = $email = $message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["uname"])) {
    $errorName = "Name is mandatory";
  }else if(!preg_match("/^[a-z A-Z]*$/",$_POST['uname'])){
    $errorName = "only characters are allowed";

  }
  if (empty($_POST["psw"])) {
    $errorPassword = "Password is mandatory";
  }else if((strlen($_POST['psw'])<2) || (strlen($_POST['psw'])>9)){
    $errorPassword = "Please Enter Valid Password";

  }
}
$servername="localhost";
$username = "root";
$password="";
$database = "profile";
$con = mysqli_connect($servername,$username,$password,$database);
if($_SERVER['REQUEST_METHOD']=='POST')
{
  $username = $_POST['uname'];
  $pass = $_POST['psw'];
  
  
  
  $sql = "select *from profile where Email = '$username' and pass = '$pass'"; 
  $result = mysqli_query($con,$sql);
  $count = mysqli_num_rows($result);
  if($count==1)
  {
    
     header('Location:/ValidatePHP/Homepage1.html');
      // echo "Hello";
  }
  else{
    echo"<h3 style='color:red;'>Invalid Credentials</h3>";
  }
}

?>
          <center>
          <p1>Enter Your Login</p1>
          </center>
    <div id="Heading">
    <form action="/ValidatePHP/Login.php" method="POST">
    <label for="uname"><b>UserName</b></label>
    <input type="text" name="uname" placeholder="UserName" id="uname">
      <span id = "errorName" style="color:rgb(137, 45, 45);"><?php echo$errorName;?></span><br><br>
    <label for="psw"><b>Password</b></label>
    <input type="Password" placeholder="Password" name="psw" id="psw"><br>
    <span id = "errorPassword" style="color:rgb(137, 45, 45);"><?php echo$errorPassword;?></span><br><br>
        <button type="submit">Login</button>
        </form>
      </div>
      <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script> -->
      </body>
      </html>