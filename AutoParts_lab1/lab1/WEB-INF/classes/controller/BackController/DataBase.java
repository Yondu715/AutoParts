package controller.BackController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class DataBase {
	private Connection dbConnection = null;

	private Connection getDbConnection() {
		String connectionString = "jdbc:mysql://localhost:3306/lab1?useSSL=false&useUnicode=yes&characterEncoding=utf8";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			dbConnection = DriverManager.getConnection(connectionString, "root", "1234");
		} catch (Exception e) {
		}
		return dbConnection;
	}

	private void closeConnection(){
        if (dbConnection != null){
            try {
                dbConnection.close();
            } catch (Exception e) {}            
        }
    }

	public boolean check_user(String login, String password) {
		PreparedStatement preparedStatement = null;
		String select = "select login, password from lab1.users where login=?;";
		dbConnection = getDbConnection();
		try {
			preparedStatement = dbConnection.prepareStatement(select);
			preparedStatement.setString(1, login);
			ResultSet rs = preparedStatement.executeQuery();
			if (rs.next()) {
				String rsLogin = rs.getString("login");
				String rsPass = rs.getString("password");
				if (login.equals(rsLogin) && password.equals(rsPass)) {
					return true;
				}
			}
		} catch (Exception e) {
			closeConnection();
		}
		closeConnection();
		return false;
	}

	public void add_item(String login, String name, String cost, String count) {
		PreparedStatement preparedStatement = null;
		String insert = "insert into lab1.items (user, name, cost, count) values(?, ?, ?, ?);";
		dbConnection = getDbConnection();
		try {
			preparedStatement = dbConnection.prepareStatement(insert);
			preparedStatement.setString(1, login);
			preparedStatement.setString(2, name);
			preparedStatement.setString(3, cost);
			preparedStatement.setString(4, count);
			preparedStatement.executeUpdate();
		} catch (Exception e) {
			closeConnection();
		}
		closeConnection();
	}

	public void delete_item(String login, String name, String cost) {
		PreparedStatement preparedStatement = null;
		String delete = "delete from lab1.items where user=? and name=?;";
		dbConnection = getDbConnection();
		try {
			preparedStatement = dbConnection.prepareStatement(delete);
			preparedStatement.setString(1, login);
			preparedStatement.setString(2, name);
			preparedStatement.executeUpdate();
		} catch (Exception e) {
			closeConnection();
		}
		closeConnection();
	}

	public ArrayList<ArrayList<String>> get_data(String login) {
		ArrayList<ArrayList<String>> list = new ArrayList<ArrayList<String>>();
		PreparedStatement preparedStatement = null;
		ResultSet rs;
		String select = "select name, cost, count from lab1.items where user=?;";
		dbConnection = getDbConnection();
		try {
			preparedStatement = dbConnection.prepareStatement(select);
			preparedStatement.setString(1, login);
			rs = preparedStatement.executeQuery();
			while (rs.next()) {
				String name = rs.getString("name");
				String cost = String.valueOf(rs.getInt("cost"));
				String count = String.valueOf(rs.getInt("count"));
				ArrayList<String> line = new ArrayList<String>();
				line.add(name);
				line.add(cost);
				line.add(count);
				list.add(line);
			}
		} catch (Exception e) {
			closeConnection();
		}
		closeConnection();
		return list;
	}
}
