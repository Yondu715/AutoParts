package rest.db.interfaces;

public interface IRepositoryUsers {
	public boolean check(String login, String password);

	public boolean add(String login, String password);
}
