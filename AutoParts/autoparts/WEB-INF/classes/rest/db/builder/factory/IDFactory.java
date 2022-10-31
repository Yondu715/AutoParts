package rest.db.builder.factory;

import rest.db.repos.typeOfRep;

public abstract interface IDFactory {
	public Object createRepos(typeOfRep type);
}
