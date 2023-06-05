/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author HARSHIT DWIVEDI
 */
public class UserDetails extends HttpServlet {

    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String firstname = request.getParameter("fname");
        String lastname = request.getParameter("lname");
        String address = request.getParameter("address");
        String email = request.getParameter("email");
        String password = request.getParameter("pswd");
        String cpassword = request.getParameter("cpswd");
        try{
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/patientdetails","root","");
            PreparedStatement pst = con.prepareStatement("insert into patient_info values(?,?,?,?,?,?)");
            pst.setString(1, firstname);
            pst.setString(2, lastname);
            pst.setString(3, address);
            pst.setString(4, email);
            pst.setString(5, password);
            pst.setString(6, cpassword);
            pst.executeUpdate();
            response.sendRedirect("loggin.jsp"); 
            con.close();
        }
        catch(Exception e){
            out.println(e);
        }
    }

    
}
