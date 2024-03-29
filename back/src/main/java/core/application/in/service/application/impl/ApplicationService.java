package core.application.in.service.application.impl;

import java.util.List;

import core.application.dto.User;
import core.application.in.service.application.api.IApplicationService;
import core.application.out.repository.users.api.IUsersRepository;

public class ApplicationService implements IApplicationService {

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
	public void deleteApplication(List<Integer> userApplicaionsId) {
		for (Integer id : userApplicaionsId) {
			usersRepository.delete(id);
		}
	}

	@Override
	public void acceptApplication(List<User> userApplications) {
		for (User user : userApplications) {
			usersRepository.setRole(user);
		}
	}
}
