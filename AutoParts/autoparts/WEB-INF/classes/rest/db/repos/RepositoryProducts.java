package rest.db.repos;

import java.util.ArrayList;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import rest.db.DataBaseHelper;
import rest.db.interfaces.IRepositoryProducts;

import rest.model.dataObject.Product;

public class RepositoryProducts implements IRepositoryProducts {

	private Connection dbConnection = DataBaseHelper.getConnection();

	@Override
	public ArrayList<Product> getAll() {
		ArrayList<Product> products = new ArrayList<>();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String select = "select * from autoparts.products;";
		try {
			ps = dbConnection.prepareStatement(select);
			rs = ps.executeQuery();
			while (rs.next()) {
				Integer id = rs.getInt(1);
				String name = rs.getString(2);
				String seller_name = rs.getString(3);
				String model = rs.getString(4);
				String brand = rs.getString(5);
				Integer cost = rs.getInt(6);
				String date = rs.getDate(7).toString();
				String image_name = rs.getString(8);
				Product product = new Product(id, name, seller_name, brand, model, cost, date, image_name);
				products.add(product);
			}
		} catch (SQLException e) {
			DataBaseHelper.closeConnection();
		}
		return products;
	}

	@Override
	public ArrayList<Product> getByUser(String seller_name) {
		ArrayList<Product> products = new ArrayList<>();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String select = "select * from autoparts.products where seller_name=?;";
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
				String date = rs.getDate(7).toString();
				String imageBase64 = rs.getString(8);
				Product product = new Product(id, name, seller_name, brand, model, cost, date, imageBase64);
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
		String insert = "insert into autoparts.products (name, seller_name, model, brand, cost, image_base64) values (?, ?, ?, ?, ?, ?);";
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setString(1, product.getName());
			ps.setString(2, product.getSellerName());
			ps.setString(3, product.getModel());
			ps.setString(4, product.getBrand());
			ps.setInt(5, product.getCost());
			ps.setString(6, product.getImageBase64());
			ps.executeUpdate();
		} catch (SQLException e) {
			DataBaseHelper.closeConnection();
		}
	}

	@Override
	public void delete(Integer productID) {
		PreparedStatement ps = null;
		String insert = "delete from autoparts.products where id=?;";
		try {
			ps = dbConnection.prepareStatement(insert);
			ps.setInt(1, productID);
			ps.executeUpdate();
		} catch (SQLException e) {
			DataBaseHelper.closeConnection();
		}
	}

}
