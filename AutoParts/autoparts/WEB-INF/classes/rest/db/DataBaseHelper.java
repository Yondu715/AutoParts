package rest.db;

import java.sql.Connection;
import java.sql.SQLException;

import javax.naming.InitialContext;
import javax.sql.DataSource;

public class DataBaseHelper {

	public static Connection getConnection() {
		Connection connection = null;
		try {
			InitialContext initialContext = new InitialContext();
			DataSource ds = (DataSource) initialContext.lookup("jdbc/autoparts");
			connection = ds.getConnection();
		} catch (Exception e) {
			
		}
		return connection;
	}

	public static void closeConnection(Connection connection){
		try {
			connection.close();
		} catch (SQLException e) {
		}
	}
}
