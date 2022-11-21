package rest.DB;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import rest.DataObject.Product;


public class DataBase implements IDB{

	private Connection dbConnection;

	public Connection getConnection(){
		String connectionString = "jdbc:mysql://localhost:3306/autoparts?useSSL=false";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			dbConnection = DriverManager.getConnection(connectionString, "root", "1234");
		} catch (Exception e) {
		}
		return dbConnection;
	}

	public void closeConnection(){
		try {
			dbConnection.close();
		} catch (Exception e) {}
	}

	public boolean authUser(String login, String password){
		PreparedStatement ps = null;
		ResultSet rs = null;
		String select = "select login, password from autoparts.user where login=? and password=?;";
		dbConnection = getConnection();
		try {
			ps = dbConnection.prepareStatement(select);
			ps.setString(1, login);
			ps.setString(2, password);
			rs = ps.executeQuery();
			if (rs.next()) return true;
		} catch (Exception e) {
			closeConnection();
			return false;
		}
		return false;
	}

	public boolean registerUser(String login, String password){
		PreparedStatement ps = null;
		String insert = "insert into autoparts.user (login, password) values(?, ?);";
		dbConnection = getConnection();
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setString(1, login);
			ps.setString(2, password);
			ps.executeUpdate();
		} catch (Exception e) {
			closeConnection();
			return false;
		}
		closeConnection();
		return true;
	}

	public ArrayList<Product> getAllProduct(){
		ArrayList<Product> products = new ArrayList<>();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String select = "select * from autoparts.product;";
		dbConnection = getConnection();
		try {
			ps = dbConnection.prepareStatement(select);
			rs = ps.executeQuery();
			while(rs.next()){
				Integer id = rs.getInt(1);
				String name = rs.getString(2);
				String sellerName = rs.getString(3);
				String model = rs.getString(4);
				String brand = rs.getString(5);
				Integer cost = rs.getInt(6);
				Product product = new Product(id, name, sellerName, brand, model, cost);
				products.add(product);
			}
		} catch (Exception e) {
			closeConnection();
			return products;
		}
		return products;
	}

	public ArrayList<Product> getUserProduct(String seller_name) {
		ArrayList<Product> products = new ArrayList<>();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String select = "select * from autoparts.product where seller_name=?;";
		dbConnection = getConnection();
		try {
			ps = dbConnection.prepareStatement(select);
			ps.setString(1, seller_name);
			rs = ps.executeQuery();
			while (rs.next()) {
				Integer id = rs.getInt(1);
				String name = rs.getString(2);
				String model = rs.getString(4);
				String brand = rs.getString(5);
				Integer cost = rs.getInt(6);
				Product product = new Product(id, name, seller_name, brand, model, cost);
				products.add(product);
			}
		} catch (Exception e) {
			closeConnection();
			return products;
		}
		return products;
	}

	public void addProduct(Product product){
		PreparedStatement ps = null;
		String insert = "insert into autoparts.product (name, seller_name, model, brand, cost) values (?, ?, ?, ?, ?);";
		dbConnection = getConnection();
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setString(1, product.getName());
			ps.setString(2, product.getSellerName());
			ps.setString(3, product.getModel());
			ps.setString(4, product.getBrand());
			ps.setInt(5, product.getCost());
			ps.executeUpdate();
		} catch (Exception e) {
			closeConnection();
		}
	}

	public void deleteProduct(Integer productID){
		PreparedStatement ps = null;
		String insert = "delete from autoparts.product where id=?;";
		dbConnection = getConnection();
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setInt(1, productID);
			ps.executeUpdate();
		} catch (Exception e) {
			closeConnection();
		}
	}

}
