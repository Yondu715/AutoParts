package infrastructure.database.repository;

import java.util.List;

import application.dto.User;
import application.interfaces.out.IUsersRepository;
import infrastructure.database.entity.EUser;
import infrastructure.utils.userStruct;
import jakarta.annotation.Resource;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.UserTransaction;

public class UsersRepository implements IUsersRepository {

	@PersistenceUnit(unitName = "autoparts_PersistenceUnit")
	private EntityManagerFactory entityManagerFactory;

	private EntityManager entityManager;

	@Resource
	UserTransaction userTransaction;

	@Override
	public boolean add(User user) {
		entityManager = entityManagerFactory.createEntityManager();
		boolean status = true;
		try {
			userTransaction.begin();
			entityManager.joinTransaction();
			EUser eUser = userStruct.toEUser(user);
			entityManager.persist(eUser);
			userTransaction.commit();
		} catch (Exception e) {
			status = false;
		} finally {
			entityManager.close();
		}
		return status;
	}

	@Override
	public boolean delete(Integer userId) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EUser> query = entityManager.createQuery("delete from EUser u where u.id=:id", EUser.class);
		query.setParameter("id", userId);
		Boolean status = true;
		try {
			userTransaction.begin();
			entityManager.joinTransaction();
			query.executeUpdate();
			userTransaction.commit();
		} catch (Exception e) {
			status = false;
		} finally {
			entityManager.close();
		}
		return status;
	}

	@Override
	public User findByLogin(String login) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EUser> query = entityManager
				.createQuery("select u from EUser u where u.login=:login and u.role is not null", EUser.class);
		query.setParameter("login", login);
		EUser eUser = query.getSingleResult();
		User user = userStruct.toUser(eUser);
		entityManager.close();
		return user;
	}

	@Override
	public List<User> findAll() {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EUser> query = entityManager.createQuery("select u from EUser u where u.role is not null",
				EUser.class);
		List<EUser> usersList = query.getResultList();
		List<User> users = userStruct.toUser(usersList);
		entityManager.close();
		return users;
	}

	@Override
	public List<User> findWithoutRole() {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EUser> query = entityManager.createQuery("select u from EUser u where u.role is null", EUser.class);
		List<EUser> usersList = query.getResultList();
		List<User> users  = userStruct.toUser(usersList);
		entityManager.close();
		return users;
	}

	@Override
	public void setRole(User user) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EUser> query = entityManager.createQuery("update EUser u set u.role=:role where u.id=:id",
				EUser.class);
		query.setParameter("role", user.getRole()).setParameter("id", user.getId());
		try {
			userTransaction.begin();
			entityManager.joinTransaction();
			query.executeUpdate();
			userTransaction.commit();
		} catch (Exception e) {
		} finally {
			entityManager.close();
		}
	}

	@Override
	public User findById(Integer userId) {
		entityManager = entityManagerFactory.createEntityManager();
		TypedQuery<EUser> query = entityManager
				.createQuery("select u from EUser u where u.id=:id and u.role is not null", EUser.class);
		query.setParameter("id", userId);
		EUser eUser = query.getSingleResult();
		User user = userStruct.toUser(eUser);
		entityManager.close();
		return user;
	}
}
