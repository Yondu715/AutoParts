package controller.BackController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.ArrayList;

public class Delete implements Interface {
	private HttpServletRequest request;
	private HttpServletResponse response;
	private DataBase dataBase = new DataBase();

	public Delete(HttpServletRequest request, HttpServletResponse response) {
		this.request = request;
		this.response = response;
	}

	public void process() {
		try{
			String login = (String) request.getSession(true).getAttribute("login");
			String name = (String) request.getParameter("name");
			String cost = (String) request.getParameter("cost");
			dataBase.delete_item(login, name, cost);
			ArrayList<ArrayList<String>> data = dataBase.get_data(login);
			request.setAttribute("data", data);
			request.getRequestDispatcher("WEB-INF/views/main.jsp").forward(request, response);
		} catch (Exception e){}
	}
}
