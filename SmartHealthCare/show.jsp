<%-- 
    Document   : show
    Created on : 27 Feb, 2022, 10:20:21 PM
    Author     : HARSHIT DWIVEDI
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
        <link rel="icon"
              href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8AbAwyOpA9DR0PrkCif_zdKAfGG0KgAebMA&usqp=CAU">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <title>Smart HealthCare</title>
    <style>
        * {
        margin: 0%;
        /* padding: 0%; */
        }

        .menubar {
        /* float: right; */
        background-color: black;
        color: white;
        height: 3rem;
        width: 100%;

        }

        .nav {

        padding-top: 15px;
        /* margin-top: 5px; */
        float: right;
        display: flex;

        }

        .nav button {
        background-color: transparent;
        color: white;
        outline: none;
        border: none;
        /* float: right; */
        font-size: medium;
        padding-top: 0px;
        padding-right: 1rem;
        }

        .lang11 {
        /* float: right; */
        margin-right: 2rem;
        }

        .nav button:hover #search {
        display: inline-block;
        background-size: 2rem;
        }

        #search {
        /* padding:5px; */
        outline: none;
        }

        .midhead {
        display: flex;
        }
        .midhead h2{
        font-size: 31px;
        margin-top: 6rem;
        margin-left: 6rem;
        text-align: center;
        }

        .midhead h3{
        margin-top: 7rem;

        }
        .navigate{
        background-color: rgb(121, 185, 60);
        height: 3.1rem;
        padding-top: 7px;
        padding-left: 1rem;
        /* display: flex; */
        /* justify-content: space-evenly; */
        }

        .navbar a {
        text-decoration: none;
        color: black;
        /* margin: 1rem; */
        /* padding-top: 2px; */
        padding: 19px;
        justify-content: space-between;
        font-size: large;
        cursor: pointer;
        font-family: Arial, Helvetica, sans-serif;
        }
        .navigate button{
        outline: none;
        border: 1px solid white;
        color: #0b0c0c;
        float: right;
        margin-right: 1rem;
        padding: 7px;
        margin-top: -25px;
        background-color: transparent;
        box-shadow: 0px 8px 14px 0px rgba(34, 31, 31, 0.5);
        cursor: pointer;
        border-radius: 5px;
        }
        .navigate button:hover{
        background-color: black;
        color: white;
        } 
        .navbar a:hover {
        background-color: sienna;
        padding-bottom: 1.11rem; 
        color: wheat;
        /*transform: scaleY(1.0);*/
        }
        .footer {
                background-color: #101111;
                line-height: 6rem;
                margin-top: 4rem;
            }

            .footer a {
                text-decoration: none;
                color: white;
                font-family: cursive;
            }

            .element {
                display: flex;
                text-decoration: none;
                color: white;
                font-family: cursive;
                padding-left: 24rem;
                /* justify-content: space-around; */
            }

            .element img {
                margin-top: 1.1rem;
            }

            .lstfoot a {
                text-decoration: none;
                color: white;
                font-family: cursive;
            }

            .lstfoot {
                /* padding-left: 10rem; */
                justify-content: space-evenly;
                display: flex;

            }
    </style>
</head>
<body>
    <div class="menu">
        <div class="menubar">
            <div class="nav">
                <button id="btn"><i class="fa fa-search" aria-hidden="true"></i> <input type="text" name="search"
                                                                                        id="search" placeholder="Search your text" hidden> </button>
                <p class="lang11">Language: <select name="Lang" id="lang">
                        <option name="Lang" value="English">English</option>
                        <option name="Lang" value="Hindi">Hindi</option>
                        <option name="Lang" value="Spanish">Spanish</option>
                        <option name="Lang" value="French">French</option>
                    </select>
                </p>
            </div>
        </div>
        <div class="midhead">
            <img style="margin-top: 4rem; margin-left: 5px;" src="1.jpg" width="180px" height="160px">
            <h3
                style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;  color: rgb(56, 116, 184); font-size: x-large;">
                Smart Health Care</h3>
            <h2  style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;  color: rgb(207, 138, 59);" >Your Health is our priority</h2>
        </div><br>
        <div class="navigate">
            <div class="navbar">
                <a class="links" href="index.html"><i class="fa fa-home" aria-hidden="true" style="font-size: xx-large;"></i></a>
                <a class="links" href="HealthTopics.jsp" id="topics">Health Topics</a>
                <a class="links" href="#">Emergencies</a>
                <!-- <a href="login.html">Sign Up/Log In</a> -->
                <a class="links" href="#">About Us</a></div>
            <a href="loggin.jsp"><button class="btn11"> SIGN IN </button></a>
            <a href="signUP.html"><button class="btn11">SIGN UP</button></a>
        </div><br>
        <%@page import='java.sql.*' %>
        <%
            try {
                String name = request.getParameter("disease");
                Class.forName("com.mysql.jdbc.Driver");
                Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/diseaseinfo", "root", "");
                Statement st = con.createStatement();
                ResultSet rs = st.executeQuery("Select * from disease where name = name");
                boolean flag = false;
                int count = 0;
                while (rs.next()) {
//                        out.println(rs.getString(1)+" "+rs.getString(2)+" "+rs.getString(3));
                    String diseaseName = rs.getString(1);
//                        out.print(diseaseName);
                    if (!diseaseName.equals(name)) {
                        count++;
                        continue;

                    }
                    if (diseaseName.equals(name)) {
                        count = 0;
                        out.println("&nbsp&nbsp<table width=60% align='center' border='1' border-spacing='0' cellpadding='9'>");
                        out.println("<tr><td>Name</td><td>Symptoms</td><td>Treatment</td></tr>");
                        out.print("<tr>");
                        out.println("<td>" + diseaseName + "</td>");
                        out.println("<td>" + rs.getString(2) + "</td>");
                        out.println("<td>" + rs.getString(3) + "</td>");
                        out.print("</tr>");
//                        out.println(diseaseName + " " + rs.getString(2) + " " + rs.getString(3));
                        break;
                    }
                }
                if (count > 0) {
                    String message = "Data not found";
                    out.println("&nbsp &nbsp &nbsp"+ message);
//                    request.setAttribute("message", message);
//                    request.getRequestDispatcher("/emerge.jsp").forward(request, response);
                }

            } catch (Exception e) {
                System.out.println(e);
            }
        %>
<!--        <div class="footer">
                <div class="element"><img
                        src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png"
                        width="50px" height="50px"><a href="#">@HealthCare</a>
                    <div class="element">
                        <img src="data:image/png;base64,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"
                             width="40px" height="40px"><a href="#">Get
                            Email Updates</a>
                    </div>
                </div>
                <hr style="color: white;">
                <div class="lstfoot">
                    <div class="lstfoot1"><a href="#">Copyright©2022 HealtCare</a></div>
                    <div class="lstfoot2"><a href="#">Privacy Policy</a></div>
                    <div class="lstfoot3"><a href="#">Terms of Use</a></div>
                </div>
            </div>-->
        </body>
        </html>
