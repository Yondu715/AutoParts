package rest.db.builder.factory;

import jakarta.inject.Inject;
import rest.db.repos.typeOfRep;
import rest.model.interfaces.repos.IRepositoryProducts;
import rest.model.interfaces.repos.IRepositoryUsers;

public class DBFactory implements IDFactory {
	@Inject
	IRepositoryProducts repProducts;
	@Inject
	IRepositoryUsers repUsers;

	@Override
	public Object createRepos(typeOfRep type) {
		Object rep = null;
		if (type == typeOfRep.USER) {
			rep = repUsers;
		} else if (type == typeOfRep.PRODUCTS) {
			rep = repProducts;
		}
		return rep;
	}
}