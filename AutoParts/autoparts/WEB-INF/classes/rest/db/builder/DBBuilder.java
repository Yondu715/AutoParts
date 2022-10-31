package rest.db.builder;

import rest.db.IDatabase;
import rest.db.builder.factory.DBFactory;
import rest.db.builder.factory.IDFactory;

public class DBBuilder {
	public static IDatabase createInstance(){
		IDFactory dbFactory = new DBFactory();
		return dbFactory.createDatabase();
	}
}
