function Register(){

   var first=document.getElementById('fname').value;
   var Middle =document.getElementById('mname2').value;
   var Last=document.getElementById('lname').value;
   var Mobile=document.getElementById('mobileno').value;
   var SClass=document.getElementById('studenc').value;
   var SSession=document.getElementById('students').value;
   var BGroup=document.getElementById('bloodg').value;
   var Fname=document.getElementById('Fname').value;
   var FatherM=document.getElementById('fathernm').value;
   var FOccup=document.getElementById('FOccup').value;
   var FQualifiication=document.getElementById('FQualification').value;
   var Mname=document.getElementById('Mname').value;
   var Mdetail=document.getElementById('Mdetail').value;
   var VCity=document.getElementById('VCity').value;
   var POffice=document.getElementById('POffice').value;
   var PStation=document.getElementById('PStation').value;
   var Block=document.getElementById('Block').value;
   var Distic=document.getElementById('Distic').value;
   var State=document.getElementById('stat').value;
   var National=document.getElementById('National').value;

   var SClass=document.getElementById('studenc').value;



   if(first=="") 
   {
      document.getElementById("errorfirstname").innerHTML ="Please Enter Your First Name";
      return false;
   }
   else{
      document.getElementById("errorfirstname").innerHTML ="";
   }

   if(Middle=="") 
   {
      
      document.getElementById('errormiddle2').innerHTML ="Please Enter Your Middle Name";
      return false;
   }
   else{
      document.getElementById("errormiddle2").innerHTML ="";
   }

   if(Last=="") 
   {
     
      document.getElementById('errorlname').innerHTML ="Please Enter Your First Name";
      return false;
   }
   else{
      document.getElementById("errorlname").innerHTML ="";
   }


   if(Mobile=="") 
   {
     
      document.getElementById('errormobile').innerHTML ="Please Enter Your Mobile Number";
      return false;
   }
   else{
      document.getElementById("errormobile").innerHTML ="";
   }
   
   if(SClass=="") 
       {
         
          document.getElementById('sclass').innerHTML ="Please Enter Student Class";
          return false;
       }
   if(SSession=="") 
       {
        
          document.getElementById('errorssession').innerHTML ="Please Enter Student Session";
          return false;
       }
       if(BGroup=="") 
       {
          
          document.getElementById('errorbgroup').innerHTML ="Please Enter Blood Group";
          return false;
       }
       if(Fname=="") 
       {
          // console.log("hello");
          document.getElementById('errorname_f').innerHTML ="Please Enter Father Name";
          return false;}

       if(FatherM=="") 
          {
             // console.log("hello");
             document.getElementById('errormob_num').innerHTML ="Please Enter Your Mobile Number";
             return false;
          }
          if(FOccup=="") 
          {
            
             document.getElementById('errorfoccuption').innerHTML ="Please Enter Father Occupation";
             return false;
          }
          if(FQualifiication=="") 
          {
             // console.log("hello");
             document.getElementById('errorfqualification').innerHTML ="Please Enter Father Qualification";
             return false;
          }

       if(Mname=="") 
       {
          document.getElementById('errorm_name').innerHTML ="Please Enter Mother Name";
          return false;
       }
       if(Mdetail=="") 
       {

          document.getElementById('mdetails').innerHTML ="Please Enter Mother Details";
          return false;
       }
       if(VCity=="") 
       {
          // console.log("hello");
          document.getElementById('errcity').innerHTML ="Please Enter Village or City";
          return false;
       }
       if(POffice=="") 
       {
          // console.log("hello");
          document.getElementById('errpost').innerHTML ="Please Enter Post Office";
          return false;
       }
       if(PStation=="") 
       {
          // console.log("hello");
          document.getElementById('errstation').innerHTML ="Please Enter Police Station";
          return false;
       }
       if(Block=="") 
       {
          // console.log("hello");
          document.getElementById('errblock').innerHTML ="Please Enter Block";
          return false;
       }
       if(Distic=="") 
       {
          // console.log("hello");
          document.getElementById('errdistic').innerHTML ="Please Enter Distic";
          return false;
       }
       if(State=="") 
       {
          // console.log("hello");
          document.getElementById('errstate').innerHTML ="Please Enter State";
          return false;
          
       }
       if(National=="") 
       {
          // console.log("hello");
          document.getElementById('errnational').innerHTML ="Please Enter National";
          return false;
       }

}