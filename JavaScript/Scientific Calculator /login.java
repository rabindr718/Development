import java.io.IOException; 
import java.io.PrintWriter; 
import javax.servlet.*; 
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest; 
import javax.servlet.http.HttpServletResponse;
public class Login extends HttpServlet {@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException {
String pwd = request.getParameter("Password"); response.setContentType("text/html"); PrintWriter out = response.getWriter();
if(pwd.equals("AZIZ"))
{RequestDispatcher rd = request.getRequestDispatcher("WelcomeServlet");
rd.forward(request, response); }
else
{out.print("Sorry..Password is incorrect...Please try again..!!!");
RequestDispatcher rd = request.getRequestDispatcher("/Start.html");rd.include(request,
response); }
}