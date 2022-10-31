package rest.db.builder.factory;

import rest.db.DataBase;
import rest.db.IDatabase;

public class DBFactory implements IDFactory {

	@Override
	public IDatabase createDatabase(){
		return DataBase.getInstance();	
	}
}