package rest.db;

public class ConnectionData {
	public static final String DRIVER = "org.postgresql.Driver";
	public static final String DB = "autoparts";
	public static final String PORT = "5432";
	public static final String URL = "jdbc:postgresql://localhost:" + PORT + "/" + DB;
	public static final String USER = "postgres";
	public static final String PASSWORD = "1234";
}
