package application.interfaces.in;

import java.util.List;

import application.dto.User;
import application.interfaces.out.IUsersRepository;

public interface IApplicationService {
	public void setRepository(IUsersRepository repUsers);

	public List<User> getApplications();

	public boolean addAplication(User userApplication);

	public void deleteApplication(List<Integer> userApplicaionsID);

	public void acceptApplication(List<User> userApplications);
}
