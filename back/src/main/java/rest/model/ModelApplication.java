package rest.model;

import java.util.List;

import rest.model.dto.User;
import rest.model.interfaces.in.IModelApplications;
import rest.model.interfaces.out.IRepositoryUsers;

public class ModelApplication implements IModelApplications {

	private IRepositoryUsers repUsers;

	@Override
	public void setRepository(IRepositoryUsers repUsers) {
		this.repUsers = repUsers;
	}

	@Override
	public List<User> getApplications() {
		return repUsers.findWithoutRole();
	}

	@Override
	public boolean addAplication(User userApplication) {
		return repUsers.add(userApplication);
	}

	@Override
	public void deleteApplication(List<User> userApplicaionsId) {
		for (User user : userApplicaionsId) {
			repUsers.delete(user.getId());
		}
	}

	@Override
	public void acceptApplication(List<User> userApplications) {
		for (User user : userApplications) {
			repUsers.setRole(user);
		}
	}
}
