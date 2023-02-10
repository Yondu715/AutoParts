package rest.db.entities;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "carts")
public class ECart implements Serializable {


	@ManyToOne
	@JoinColumn(name = "user_id")
	private EUser user;

	@Id
	@ManyToOne
	@JoinColumn(name = "product_id")
	private EProduct product;

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
