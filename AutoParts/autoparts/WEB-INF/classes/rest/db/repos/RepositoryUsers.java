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
import rest.db.entities.EUser;
import rest.model.dto.User;
import rest.model.interfaces.out.IRepositoryUsers;

public class RepositoryUsers implements IRepositoryUsers {

	@PersistenceUnit(unitName = "autoparts_PersistenceUnit")
	private EntityManagerFactory entityManagerFactory;

	private EntityManager entityManager;

	@Resource
	UserTransaction userTransaction;

	@Override
	public boolean check(User user) {
		String query = "select u from EUser u where u.login=:login";
		Integer size = 0;
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EUser> users_list = entityManager.createQuery(query, EUser.class)
					.setParameter("login", user.getLogin()).getResultList();
			size = users_list.size();
			userTransaction.commit();
			entityManager.close();
		} catch (Exception e) {
			Logger.getLogger(RepositoryUsers.class.getName()).log(Level.INFO, null, e);
		}
		return (size == 1);
	}

	@Override
	public boolean add(User user) {
		boolean reg_status = true;
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			EUser eUser = new EUser();
			eUser.setLogin(user.getLogin());
			eUser.setPassword(user.getPassword());
			eUser.setRole(user.getRole());
			entityManager.persist(eUser);
			userTransaction.commit();
			entityManager.close();
		} catch (Exception e) {
			reg_status = false;
			Logger.getLogger(RepositoryUsers.class.getName()).log(Level.INFO, null, e);
		}
		return reg_status;
	}

	@Override
	public User find(String login) {
		String query = "select u from EUser u where u.login=:login";
		User user = new User();
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EUser> users_list = entityManager.createQuery(query, EUser.class)
					.setParameter("login", login).getResultList();
			userTransaction.commit();
			entityManager.close();
			EUser eUser = users_list.get(0);
			user.setLogin(eUser.getLogin());
			user.setPassword(eUser.getPassword());
			user.setRole(eUser.getRole());
		} catch (Exception e) {
			Logger.getLogger(RepositoryUsers.class.getName()).log(Level.INFO, null, e);
		}
		return user;
	}

	@Override
	public ArrayList<User> findAll() {
		String query = "select u from EUser u";
		ArrayList<User> users = new ArrayList<>();
		try {
			entityManager = entityManagerFactory.createEntityManager();
			userTransaction.begin();
			entityManager.joinTransaction();
			List<EUser> users_list = entityManager.createQuery(query, EUser.class).getResultList();
			userTransaction.commit();
			entityManager.close();
			for (EUser eUser : users_list) {
				User user = new User();
				user.setLogin(eUser.getLogin());
				user.setPassword(eUser.getPassword());
				user.setRole(eUser.getRole());
				users.add(user);
			}
		} catch (Exception e) {
			Logger.getLogger(RepositoryUsers.class.getName()).log(Level.INFO, null, e);
		}
		return users;
	}
}
