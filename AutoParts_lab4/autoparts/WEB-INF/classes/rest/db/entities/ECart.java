package rest.db.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "carts")
public class ECart implements Serializable {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private EUser user;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private EProduct product;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public EUser getUser() {
		return user;
	}

	public void setUser(EUser user) {
		this.user = user;
	}

	public EProduct getProduct() {
		return product;
	}

	public void setProduct(EProduct product) {
		this.product = product;
	}

}
