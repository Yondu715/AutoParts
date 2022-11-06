package rest.model.dataObject;

public class Product {
	private Integer id;
	private String name;
	private String sellerName;
	private String brand;
	private String model;
	private Integer cost;
	private String date;
	private String imageBase64;

	public Product() {
	}

	public Product(Integer id, String name, String sellerName, String brand, String model, Integer cost, String date, String imageBase64) {
		this.id = id;
		this.name = name;
		this.sellerName = sellerName;
		this.brand = brand;
		this.model = model;
		this.cost = cost;
		this.date = date;
		this.imageBase64 = imageBase64;
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

	public Integer getCost() {
		return cost;
	}

	public void setCost(Integer cost) {
		this.cost = cost;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getImageBase64() {
		return imageBase64;
	}

	public void setImageBase64(String imageBase64) {
		this.imageBase64 = imageBase64;
	}
}
