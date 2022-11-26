package rest.model.interfaces.in;

import java.util.ArrayList;
import java.util.List;

import rest.model.dto.Application;
import rest.model.interfaces.out.IRepositoryApplications;
import rest.model.interfaces.out.IRepositoryUsers;

public interface IModelApplications {
	public void setRepository(IRepositoryApplications repApp, IRepositoryUsers repUsers);

	public ArrayList<Application> getApplications();

	public boolean addAplication(Application application);

	public void deleteApplication(List<Application> applicaionsID);

	public boolean acceptApplication(List<Application> applications);
}
