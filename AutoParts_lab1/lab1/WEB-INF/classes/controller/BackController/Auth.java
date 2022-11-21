package controller.BackController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.ArrayList;

public class Auth implements Interface{
	private HttpServletRequest request;
	private HttpServletResponse response;
	private DataBase dataBase = new DataBase();

	public Auth(HttpServletRequest request, HttpServletResponse response){
		this.request = request;
		this.response = response;
	}

	public void process(){
		try{
			String login = request.getParameter("login");
			String password = request.getParameter("password");
			if (dataBase.check_user(login, password)) {
				ArrayList<ArrayList<String>> data = dataBase.get_data(login);
				request.setAttribute("data", data);
				request.getSession(true).setAttribute("login", login);
				request.getRequestDispatcher("WEB-INF/views/main.jsp").forward(request, response);
			} else {
				request.getRequestDispatcher("index.jsp").forward(request, response);
			}
		} catch (Exception e){}
		
	}
}
