package rest.Server;


public class Token {
	private String value;

	public void setValue(String value){
		this.value = value;
	}

	public String getValue(){
		return value;
	}

	public boolean checkToken(String login, String password){
		return true;
	}
}
