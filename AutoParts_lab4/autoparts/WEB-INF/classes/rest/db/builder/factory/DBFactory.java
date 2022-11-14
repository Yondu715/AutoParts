package rest.db.builder.factory;

import rest.db.repos.RepositoryProducts;
import rest.db.repos.RepositoryUsers;
import rest.db.repos.typeOfRep;

public class DBFactory implements IDFactory {

	@Override
	public Object createRepos(typeOfRep type) {
		Object rep = null;
		if (type == typeOfRep.USER) {
			rep = new RepositoryUsers();
		} else if (type == typeOfRep.PRODUCTS) {
			rep = new RepositoryProducts();
		}
		return rep;
	}
}