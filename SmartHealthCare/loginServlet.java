/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.*;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author HARSHIT DWIVEDI
 */
public class loginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String email = request.getParameter("name");
        String password = request.getParameter("pswd");
//        BeanComponent bean = new BeanComponent();
//        bean.setusername(username);
//        bean.setpassword(password);
//        request.setAttribute("",bean);
        try{
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/patientdetails","root","");
                PreparedStatement st = con.prepareStatement("select firstname,password from patient_info where email=email");
                ResultSet rs = st.executeQuery();              //      '" + email + "' 
                String s = "";
                int count=0;
                while(rs.next()){
                    String name = rs.getString(1);
                    String psw = rs.getString(2);
                    if(psw.equals(password))
                    {
                        s= name;
                        count=0;break;
                    }
                    if(!psw.equals(password)){
                         count++;
                         continue;
                    }
                }
                
                if(count>0){
                    String message = "Invalid Credentials";
                    request.setAttribute("message", message);
                    request.getRequestDispatcher("/loggin.jsp").forward(request, response);
                }
                else{
//                    response.sendRedirect("home.jsp");
                    String user = s;
                    request.setAttribute("user", s);
                    request.getRequestDispatcher("/home.jsp").forward(request, response);
                }
        }
        catch(Exception e)
        {
            out.println(e);
        }
    }
}
