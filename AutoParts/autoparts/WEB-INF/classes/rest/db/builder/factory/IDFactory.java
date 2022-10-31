package rest.db.builder.factory;

import rest.db.IDatabase;

public abstract interface IDFactory {
	public IDatabase createDatabase();
}
