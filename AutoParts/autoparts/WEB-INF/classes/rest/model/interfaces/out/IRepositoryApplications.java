package rest.model.interfaces.out;

import java.util.ArrayList;

import rest.model.dto.Application;

public interface IRepositoryApplications {
	public ArrayList<Application> findAll();
	public void delete(Integer application_id);
	public boolean add(Application application);
}
