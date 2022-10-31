package rest.db.interfaces;

public interface IRepositoryUser {
	public boolean checkUser(String login, String password);

	public boolean addUser(String login, String password);
}
