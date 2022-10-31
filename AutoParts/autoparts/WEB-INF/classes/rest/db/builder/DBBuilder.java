package rest.db.builder;

import rest.db.builder.factory.DBFactory;
import rest.db.builder.factory.IDFactory;
import rest.db.repos.typeOfRep;

public class DBBuilder {
	public static Object createRepository(typeOfRep type) {
		IDFactory dbFactory = new DBFactory();
		return dbFactory.createRepos(type);
	}
}
