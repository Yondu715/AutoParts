package rest.model.interfaces.in;

import java.util.List;

import rest.model.dto.User;
import rest.model.interfaces.out.IUsersRepository;

public interface IApplicationModel {
	public void setRepository(IUsersRepository repUsers);

	public List<User> getApplications();

	public boolean addAplication(User userApplication);

	public void deleteApplication(List<User> userApplicaionsID);

	public void acceptApplication(List<User> userApplications);
}
