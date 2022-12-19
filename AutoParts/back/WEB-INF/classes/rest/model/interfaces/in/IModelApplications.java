package rest.model.interfaces.in;

import java.util.ArrayList;
import java.util.List;

import rest.model.dto.User;
import rest.model.interfaces.out.IRepositoryUsers;

public interface IModelApplications {
	public void setRepository(IRepositoryUsers repUsers);

	public ArrayList<User> getApplications();

	public boolean addAplication(User userApplication);

	public void deleteApplication(List<User> userApplicaionsID);

	public void acceptApplication(List<User> userApplications);
}
