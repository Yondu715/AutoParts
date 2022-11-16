package rest.db.repos;

import java.util.ArrayList;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import rest.db.DataBaseHelper;
import rest.db.builder.DBBuilder;
import rest.db.interfaces.IRepositoryProducts;
import rest.db.interfaces.IRepositoryUsers;
import rest.model.dataObject.Product;

public class RepositoryProducts implements IRepositoryProducts {
	
	private IRepositoryUsers repUser = (RepositoryUsers) DBBuilder.createRepository(typeOfRep.USER);
	private Connection dbConnection = DataBaseHelper.getConnection();

	@Override
	public ArrayList<Product> getAll() {
		ArrayList<Product> products = new ArrayList<>();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String select = "select * from products;";
		try {
			ps = dbConnection.prepareStatement(select);
			rs = ps.executeQuery();
			while (rs.next()) {
				Integer id = rs.getInt(1);
				String name = rs.getString(2);
				String seller_name = repUser.getName(rs.getInt(3));
				String model = rs.getString(4);
				String brand = rs.getString(5);
				Integer price = rs.getInt(6);
				String date = rs.getDate(7).toString();
				String image = rs.getString(8);
				Product product = new Product(id, name, seller_name, brand, model, price, date, image);
				products.add(product);
			}
		} catch (SQLException e) {
			DataBaseHelper.closeConnection();
		}
		return products;
	}

	@Override
	public Product getById(Integer product_id){
		PreparedStatement ps = null;
		ResultSet rs = null;
		Product product = null;
		String select = "select * from products where id=?;";
		try {
			ps = dbConnection.prepareStatement(select);
			ps.setInt(1, product_id);
			rs = ps.executeQuery();
			if (rs.next()) {
				Integer id = rs.getInt(1);
				String name = rs.getString(2);
				String seller_name = repUser.getName(rs.getInt(3));
				String model = rs.getString(4);
				String brand = rs.getString(5);
				Integer price = rs.getInt(6);
				String date = rs.getDate(7).toString();
				String image = rs.getString(8);
				product = new Product(id, name, seller_name, brand, model, price, date, image);
			}
		} catch (SQLException e) {
			DataBaseHelper.closeConnection();
		}
		return product;
	}

	@Override
	public ArrayList<Product> getByUser(String seller_name) {
		ArrayList<Product> products = new ArrayList<>();
		PreparedStatement ps = null;
		ResultSet rs = null;
		Integer seller_id = repUser.getId(seller_name);
		String select = "select * from products where seller_id=?;";
		try {
			ps = dbConnection.prepareStatement(select);
			ps.setInt(1, seller_id);
			rs = ps.executeQuery();
			while (rs.next()) {
				Integer id = rs.getInt(1);
				String name = rs.getString(2);
				String model = rs.getString(4);
				String brand = rs.getString(5);
				Integer price = rs.getInt(6);
				String date = rs.getDate(7).toString();
				String image = rs.getString(8);
				Product product = new Product(id, name, seller_name, brand, model, price, date, image);
				products.add(product);
			}
		} catch (SQLException e) {
			DataBaseHelper.closeConnection();
		}
		return products;
	}

	@Override
	public void add(Product product) {
		PreparedStatement ps = null;
		String insert = "insert into products (name, seller_id, model, brand, price, image) values (?, ?, ?, ?, ?, ?);";
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setString(1, product.getName());
			ps.setInt(2, repUser.getId(product.getSellerName()));
			ps.setString(3, product.getModel());
			ps.setString(4, product.getBrand());
			ps.setInt(5, product.getPrice());
			ps.setString(6, product.getImageBase64());
			ps.executeUpdate();
		} catch (SQLException e) {
			DataBaseHelper.closeConnection();
		}
	}

	@Override
	public void delete(Integer productID) {
		PreparedStatement ps = null;
		String insert = "delete from products where id=?;";
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setInt(1, productID);
			ps.executeUpdate();
		} catch (SQLException e) {
			DataBaseHelper.closeConnection();
		}
	}

}
