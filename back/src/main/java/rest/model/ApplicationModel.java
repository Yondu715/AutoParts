package rest.model;

import java.util.List;

import rest.model.dto.User;
import rest.model.interfaces.in.IApplicationModel;
import rest.model.interfaces.out.IUsersRepository;

public class ApplicationModel implements IApplicationModel {

	private IUsersRepository usersRepository;

	@Override
	public void setRepository(IUsersRepository usersRepository) {
		this.usersRepository = usersRepository;
	}

	@Override
	public List<User> getApplications() {
		return usersRepository.findWithoutRole();
	}

	@Override
	public boolean addAplication(User userApplication) {
		return usersRepository.add(userApplication);
	}

	@Override
	public void deleteApplication(List<User> userApplicaionsId) {
		for (User user : userApplicaionsId) {
			usersRepository.delete(user.getId());
		}
	}

	@Override
	public void acceptApplication(List<User> userApplications) {
		for (User user : userApplications) {
			usersRepository.setRole(user);
		}
	}
}
