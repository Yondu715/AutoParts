package rest.model.dataObject;

public class Product {
	private Integer id;
	private String name;
	private String sellerName;
	private String brand;
	private String model;
	private Integer price;
	private String date;
	private String image;

	public Product() {
	}

	public Product(Integer id, String name, String sellerName, String brand, String model, Integer price, String date, String image) {
		this.id = id;
		this.name = name;
		this.sellerName = sellerName;
		this.brand = brand;
		this.model = model;
		this.price = price;
		this.date = date;
		this.image = image;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSellerName() {
		return sellerName;
	}

	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
}
