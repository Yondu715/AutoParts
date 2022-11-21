package controller.BackController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ControllerFactory {
	public Interface createController(String type, HttpServletRequest request, HttpServletResponse response){
		Interface intf = null;
		switch (type) {
			case "Main":
				intf = new Main(request, response);
				break;
			case "Add":
				intf = new Add(request, response);
				break;
			case "Delete":
				intf = new Delete(request, response);
				break;
			case "Auth":
				intf = new Auth(request, response);
				break;
			default:
				break;
		}
		return intf;
	}
}
