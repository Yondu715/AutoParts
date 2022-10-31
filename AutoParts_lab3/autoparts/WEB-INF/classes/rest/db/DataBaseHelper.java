package rest.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DataBaseHelper {

	private static Connection connection = null; 

	public static Connection getConnection() {
		if (connection == null){
			try {
				Class.forName(ConnectionData.DRIVER);
				connection = DriverManager.getConnection(ConnectionData.URL, ConnectionData.USER,
						ConnectionData.PASSWORD);
			} catch (SQLException | ClassNotFoundException e) {
			}
		}
		return connection;
	}

	public static void closeConnection(){
		try {
			connection.close();
		} catch (SQLException e) {
		}
	}
}
