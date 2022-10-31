package rest.db.builder.factory;

import rest.db.repos.ProductsRepository;
import rest.db.repos.UserRepository;
import rest.db.repos.typeOfRep;

public class DBFactory implements IDFactory {

	@Override
	public Object createRepos(typeOfRep type) {
		Object rep = null;
		if (type == typeOfRep.USER) {
			rep = new UserRepository();
		} else if (type == typeOfRep.PRODUCTS) {
			rep = new ProductsRepository();
		}
		return rep;
	}
}