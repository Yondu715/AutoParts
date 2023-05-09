package core.infrastructure.out.database.repository;

import java.util.List;

import core.application.dto.User;
import core.application.repository.users.api.IUsersRepository;
import core.infrastructure.out.database.entity.EUser;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import utils.mapper.userStruct;

@Stateless
public class UsersRepository implements IUsersRepository {

	@PersistenceContext(unitName = "autoparts_PersistenceUnit")
	private EntityManager entityManager;

	@Override
	public boolean add(User user) {
		boolean status = true;
		try {
			EUser eUser = userStruct.toEUser(user);
			entityManager.persist(eUser);
		} catch (Exception e) {
			status = false;
		}
		return status;
	}

	@Override
	public boolean delete(Integer userId) {
		TypedQuery<EUser> query = entityManager.createQuery("delete from EUser u where u.id=:id", EUser.class);
		query.setParameter("id", userId);
		Boolean status = true;
		try {
			query.executeUpdate();
		} catch (Exception e) {
			status = false;
		}
		return status;
	}

	@Override
	public User findByLogin(String login) {
		TypedQuery<EUser> query = entityManager
				.createQuery("select u from EUser u where u.login=:login and u.role is not null", EUser.class);
		query.setParameter("login", login);
		EUser eUser = null;
		try {
			eUser = query.getSingleResult();
		} catch (Exception e) {
			System.out.println(e);
		}
		User user = userStruct.toUser(eUser);
		return user;
	}

	@Override
	public List<User> findAll() {
		TypedQuery<EUser> query = entityManager.createQuery("select u from EUser u where u.role is not null",
				EUser.class);
		List<EUser> usersList = query.getResultList();
		List<User> users = userStruct.toUser(usersList);
		return users;
	}

	@Override
	public List<User> findWithoutRole() {
		TypedQuery<EUser> query = entityManager.createQuery("select u from EUser u where u.role is null", EUser.class);
		List<EUser> usersList = query.getResultList();
		List<User> users = userStruct.toUser(usersList);
		return users;
	}

	@Override
	public void setRole(User user) {
		TypedQuery<EUser> query = entityManager.createQuery("update EUser u set u.role=:role where u.id=:id",
				EUser.class);
		query.setParameter("role", user.getRole()).setParameter("id", user.getId());
		query.executeUpdate();
	}

	@Override
	public User findById(Integer userId) {
		TypedQuery<EUser> query = entityManager
				.createQuery("select u from EUser u where u.id=:id and u.role is not null", EUser.class);
		query.setParameter("id", userId);
		EUser eUser = null; 
		try {
			eUser = query.getSingleResult();
		} catch (Exception e) {
			System.out.println(e);
		}
		User user = userStruct.toUser(eUser);
		return user;
	}
}
