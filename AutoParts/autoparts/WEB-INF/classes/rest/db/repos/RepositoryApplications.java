package rest.db.repos;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import jakarta.annotation.Resource;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import jakarta.transaction.UserTransaction;
import rest.db.entities.EApplication;
import rest.model.dto.Application;
import rest.model.interfaces.out.IRepositoryApplications;

public class RepositoryApplications implements IRepositoryApplications {

	@PersistenceUnit(unitName = "autoparts_PersistenceUnit")
	private EntityManagerFactory entityManagerFactory;

	private EntityManager entityManager;

	@Resource
	UserTransaction userTransaction;

	@Override
	public ArrayList<Application> findAll() {
		ArrayList<Application> applications = new ArrayList<>();
		String getApplications = "select a from EApplication a";
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EApplication> applicaions_list = entityManager.createQuery(getApplications, EApplication.class).getResultList();
			userTransaction.commit();
			for (EApplication eApplicaion : applicaions_list) {
				Application application = new Application();
				application.setId(eApplicaion.getId());
				application.setLogin(eApplicaion.getLogin());
				application.setPassword(eApplicaion.getPassword());
				applications.add(application);
			}
		} catch (Exception e) {
			Logger.getLogger(RepositoryApplications.class.getName()).log(Level.INFO, null, e);
		}
		return applications;
	}

	@Override
	public void delete(Integer application_id) {
		String query = "delete from EApplication p where p.id=:id";
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			entityManager.createQuery(query).setParameter("id", application_id).executeUpdate();
			userTransaction.commit();
			entityManager.close();
		} catch (Exception e) {
			Logger.getLogger(RepositoryProducts.class.getName()).log(Level.INFO, null, e);
		}
	}

	@Override
	public boolean add(Application application) {
		boolean reg_status = true;
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			EApplication eApplication = new EApplication();
			eApplication.setLogin(application.getLogin());
			eApplication.setPassword(application.getPassword());
			entityManager.persist(eApplication);
			userTransaction.commit();
			entityManager.close();
		} catch (Exception e) {
			reg_status = false;
			Logger.getLogger(RepositoryUsers.class.getName()).log(Level.INFO, null, e);
		}
		return reg_status;
	}
	
}
