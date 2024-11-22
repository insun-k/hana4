package domain;

public class User {
	private Long id;
	private String name;

	public User() {
		this("");
	}

	public User(String name) {
		this(0L, name);
	}

	public User(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}
}
