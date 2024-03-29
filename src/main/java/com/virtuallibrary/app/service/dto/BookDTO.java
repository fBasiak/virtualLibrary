package com.virtuallibrary.app.service.dto;

import com.virtuallibrary.app.domain.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String title;

    private String author;

    private Boolean available;

    private String publicationYear;

    private String publisher;

    public BookDTO(Book book) {
        this.id = book.getId();
        this.author = book.getAuthor();
        this.available = book.getAvailable();
        this.publicationYear = book.getPublicationYear();
        this.publisher = book.getPublisher();
        this.title = book.getTitle();
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(String publicationYear) {
        this.publicationYear = publicationYear;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Boolean getAvailable() {return available;}

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
