package core.application.dto;

public class Message {
    private Integer id;
    private String content;
    private String from;
    private String date;
    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Message() {
    }

    public Integer getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getFrom() {
        return from;
    }

    public String getDate() {
        return date;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public void setDate(String date) {
        this.date = date;
    }

}
