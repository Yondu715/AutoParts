package controller.FrontController;

import java.io.PrintWriter;
import controller.BackController.Interface;
import controller.BackController.ControllerFactory;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class WebController extends HttpServlet {
	Interface intf;
	ControllerFactory cf = new ControllerFactory();

	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		PrintWriter printWriter = null;
		try {
			printWriter = response.getWriter();
			String url = request.getRequestURL().toString();
			url = url.substring(url.lastIndexOf("/"), url.length());
			response.setHeader("Content-Type", "text/html;charset=UTF-8");
			String login = (String) request.getAttribute("login");
			request.setAttribute("login", login);
			switch (url) {
				case "/auth":{
					intf = cf.createController("Auth", request, response);
					break;
				}
				case "/main":{
					intf = cf.createController("Main", request, response);
					break;
				}
				case "/add":{
					intf = cf.createController("Add", request, response);
					break;
				}
				case "/delete":{
					intf = cf.createController("Delete", request, response);
					break;
				}
				default:
					break;
			}
			intf.process();
		} catch (Exception ex) {
			printWriter.println(ex);
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) {
		PrintWriter printWriter = null;
		try {
			printWriter = response.getWriter();
			String url = request.getRequestURL().toString();
			url = url.substring(url.lastIndexOf("/"), url.length());
			response.setHeader("Content-Type", "text/html;charset=UTF-8");
			switch (url) {
				case "/auth": {
					intf = cf.createController("Auth", request, response);
					break;
				}
				case "/main": {
					intf = cf.createController("Main", request, response);
					break;
				}
				default:{
					break;
				}	
			}
			intf.process();
		} catch (Exception ex) {
			printWriter.println(ex);
		}
	}
}