package rest.db.repos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import rest.db.DataBaseHelper;
import rest.db.interfaces.IRepositoryUsers;
import rest.model.dataObject.User;

public class RepositoryUsers implements IRepositoryUsers {

	private Connection dbConnection = DataBaseHelper.getConnection();

	@Override
	public boolean check(User user) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		String select = "select login, password from users where login=? and password=?;";
		try {
			ps = dbConnection.prepareStatement(select);
			ps.setString(1, user.getLogin());
			ps.setString(2, user.getPassword());
			rs = ps.executeQuery();
			if (rs.next()) {
				return true;
			}
		} catch (SQLException e) {
			DataBaseHelper.closeConnection();
		}
		return false;
	}

	@Override
	public boolean add(User user) {
		PreparedStatement ps = null;
		String insert = "insert into users (login, password) values(?, ?);";
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setString(1, user.getLogin());
			ps.setString(2, user.getPassword());
			ps.executeUpdate();
		} catch (SQLException e) {
			if (e.getErrorCode() == 1062) {
				return false;
			}
			DataBaseHelper.closeConnection();
		}
		return true;
	}

	@Override
	public int getId(String login) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		Integer id = null;
		String select = "select id from users where login=?;";
		try {
			ps = dbConnection.prepareStatement(select);
			ps.setString(1, login);
			rs = ps.executeQuery();
			if (rs.next()){
				id = rs.getInt(1);
			}
		} catch (SQLException e) {
			DataBaseHelper.closeConnection();
		}
		return id;
	}

	@Override
	public String getName(Integer id) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		String login = "7";
		String select = "select login from users where id=?;";
		try {
			ps = dbConnection.prepareStatement(select);
			ps.setInt(1, id);
			rs = ps.executeQuery();
			if (rs.next()) {
				login = rs.getString(1);
			}
		} catch (SQLException e) {
			DataBaseHelper.closeConnection();
		}
		return login;
	}

}
