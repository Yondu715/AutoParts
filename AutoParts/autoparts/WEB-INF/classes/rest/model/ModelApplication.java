package rest.model;

import java.util.ArrayList;
import java.util.List;

import rest.model.dto.Application;
import rest.model.dto.User;
import rest.model.interfaces.in.IModelApplications;
import rest.model.interfaces.out.IRepositoryApplications;
import rest.model.interfaces.out.IRepositoryUsers;

public class ModelApplication implements IModelApplications {

	private IRepositoryApplications repApp;
	private IRepositoryUsers repUsers;

	@Override
	public void setRepository(IRepositoryApplications repApp, IRepositoryUsers repUsers) {
		this.repApp = repApp;
		this.repUsers = repUsers;
	}

	@Override
	public ArrayList<Application> getApplications() {
		return repApp.findAll();
	}

	@Override
	public boolean addAplication(Application application) {
		return repApp.add(application);
	}

	@Override
	public void deleteApplication(List<Application> applicaionsID) {
		for (Application application : applicaionsID) {
			repApp.delete(application.getId());
		}	
	}

	@Override
	public boolean acceptApplication(List<Application> applications) {
		for (Application application : applications) {
			User user = new User();
			user.setLogin(application.getLogin());
			user.setPassword(application.getPassword());
			user.setRole(application.getRole());
			try {
				repApp.delete(application.getId());
				repUsers.add(user);
			} catch (Exception e) {
				return false;
			}
		}
		return true;
	}
	
}
