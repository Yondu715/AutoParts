package application;

import java.util.List;

import application.dto.User;
import application.interfaces.in.IApplicationService;
import application.interfaces.out.IUsersRepository;

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
