/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author HARSHIT DWIVEDI
 */
public class ShowMessage extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
                String name = request.getParameter("disease");
                Class.forName("com.mysql.jdbc.Driver");
                Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/diseaseinfo", "root", "");
                Statement st = con.createStatement();
                PrintWriter out = response.getWriter();
                ResultSet rs = st.executeQuery("Select * from disease where name = name");
                boolean flag = false;
                while (rs.next()) {
//                        out.println(rs.getString(1)+" "+rs.getString(2)+" "+rs.getString(3));
                    String diseaseName = rs.getString(1);
//                        out.print(diseaseName);
                    if (diseaseName.equals(name)) {
                        out.println("<table width=60% align='center' border='1' border-collapse='collapse'>");
                        out.println("<tr><td>Name</td><td>Symptoms</td><td>Treatment</td></tr>");
                        out.print("<tr>");
                        out.println("<td>" + diseaseName + "</td>");
                        out.println("<td>" + rs.getString(2) + "</td>");
                        out.println("<td>" + rs.getString(3) + "</td>");
                        out.print("</tr>");
//                        out.println(diseaseName + " " + rs.getString(2) + " " + rs.getString(3));
                        break;
                    } else {
                        flag = true;
                        continue;
                    }
                }
                if (flag) {
                    String message = "data not found";
                    request.setAttribute("message",message);
                    request.getRequestDispatcher("/emerge.jsp").forward(request, response);
                }
            } catch (Exception e) {
                System.out.println(e);
            }
    }

}
