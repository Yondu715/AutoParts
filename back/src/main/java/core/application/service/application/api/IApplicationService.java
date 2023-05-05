package core.application.service.application.api;

import java.util.List;

import core.application.dto.User;
import core.application.repository.users.api.IUsersRepository;

public interface IApplicationService {
	public void setRepository(IUsersRepository repUsers);

	public List<User> getApplications();

	public boolean addAplication(User userApplication);

	public void deleteApplication(List<Integer> userApplicaionsID);

	public void acceptApplication(List<User> userApplications);
}
