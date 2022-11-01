package rest.db.repos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import rest.db.DataBaseHelper;
import rest.db.interfaces.IRepositoryUsers;

public class RepositoryUsers implements IRepositoryUsers {

	private Connection dbConnection = DataBaseHelper.getConnection();

	@Override
	public boolean check(String login, String password) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		String select = "select login, password from autoparts.user where login=? and password=?;";
		try {
			ps = dbConnection.prepareStatement(select);
			ps.setString(1, login);
			ps.setString(2, password);
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
	public boolean add(String login, String password) {
		PreparedStatement ps = null;
		String insert = "insert into autoparts.user (login, password) values(?, ?);";
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setString(1, login);
			ps.setString(2, password);
			ps.executeUpdate();
		} catch (SQLException e) {
			if (e.getErrorCode() == 1062) {
				return false;
			}
			DataBaseHelper.closeConnection();
		}
		return true;
	}

}
