package rest.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import rest.model.dataObject.Product;

public class DataBase implements IDatabase {

	private Connection dbConnection;
	private static DataBase instance;

	private DataBase() {
		dbConnection = getConnection();
	}

	public static DataBase getInstance(){
		if (instance == null){
			instance = new DataBase();
		}
		return instance;
	}

	private Connection getConnection() {
		try {
			Class.forName(ConnectionData.DRIVER);
			dbConnection = DriverManager.getConnection(ConnectionData.URL, ConnectionData.USER, ConnectionData.PASSWORD);
		} catch (SQLException | ClassNotFoundException e) {}
		return dbConnection;
	}

	private void closeConnection() {
		try {
			dbConnection.close();
		} catch (SQLException e) {}
	}

	@Override
	public boolean authUser(String login, String password) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		String select = "select login, password from autoparts.user where login=? and password=?;";
		try {
			ps = dbConnection.prepareStatement(select);
			ps.setString(1, login);
			ps.setString(2, password);
			rs = ps.executeQuery();
			if (rs.next()) {
				return true;
			}
		} catch (SQLException e) {
			closeConnection();
		}
		return false;
	}

	@Override
	public boolean addUser(String login, String password) {
		PreparedStatement ps = null;
		String insert = "insert into autoparts.user (login, password) values(?, ?);";
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setString(1, login);
			ps.setString(2, password);
			ps.executeUpdate();
		} catch (SQLException e) {
			if (e.getErrorCode() == 1062){
				return false;
			}
			closeConnection();
		}
		return true;
	}

	@Override
	public ArrayList<Product> getAllProducts() {
		ArrayList<Product> products = new ArrayList<>();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String select = "select * from autoparts.product;";
		try {
			ps = dbConnection.prepareStatement(select);
			rs = ps.executeQuery();
			while (rs.next()) {
				Integer id = rs.getInt(1);
				String name = rs.getString(2);
				String sellerName = rs.getString(3);
				String model = rs.getString(4);
				String brand = rs.getString(5);
				Integer cost = rs.getInt(6);
				Product product = new Product(id, name, sellerName, brand, model, cost);
				products.add(product);
			}
		} catch (SQLException e) {
			closeConnection();
		}
		return products;
	}

	@Override
	public ArrayList<Product> getUserProducts(String seller_name) {
		ArrayList<Product> products = new ArrayList<>();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String select = "select * from autoparts.product where seller_name=?;";
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
		} catch (SQLException e) {
			closeConnection();
		}
		return products;
	}

	@Override
	public void addProduct(Product product) {
		PreparedStatement ps = null;
		String insert = "insert into autoparts.product (name, seller_name, model, brand, cost) values (?, ?, ?, ?, ?);";
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setString(1, product.getName());
			ps.setString(2, product.getSellerName());
			ps.setString(3, product.getModel());
			ps.setString(4, product.getBrand());
			ps.setInt(5, product.getCost());
			ps.executeUpdate();
		} catch (SQLException e) {
			closeConnection();
		}
	}

	@Override
	public void deleteProduct(Integer productID) {
		PreparedStatement ps = null;
		String insert = "delete from autoparts.product where id=?;";
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setInt(1, productID);
			ps.executeUpdate();
		} catch (SQLException e) {
			closeConnection();
		}
	}
}
