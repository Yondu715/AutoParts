package controller.BackController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Add implements Interface{
	private HttpServletRequest request;
	private HttpServletResponse response;
	private DataBase dataBase = new DataBase();

	public Add(HttpServletRequest request, HttpServletResponse response) {
		this.request = request;
		this.response = response;
	}

	public void process(){
		try {
			String login = (String) request.getSession(true).getAttribute("login");
			String name = request.getParameter("name");
			String cost = request.getParameter("cost");
			String count = request.getParameter("count");
			if (name == null & cost == null & count == null){
				request.getRequestDispatcher("WEB-INF/views/add.jsp").forward(request, response);
			} else {
				dataBase.add_item(login, name, cost, count);
				request.getRequestDispatcher("WEB-INF/views/add.jsp").forward(request, response);
			} 
		} catch (Exception e) {}
		
	}
}
