package com.virtuallibrary.app.service.mapper;

import com.virtuallibrary.app.domain.Book;
import com.virtuallibrary.app.service.dto.BookDTO;
import org.springframework.stereotype.Service;


@Service
public class BookMapper {

    public BookDTO bookToBookDTO(Book book) {
        return new BookDTO(book);
    }

    public Book bookDTOToBook(BookDTO bookDTO) {
        if (bookDTO == null) {
            return null;
        } else {
            Book book = new Book();
            book.setId(bookDTO.getId());
            book.setTitle(bookDTO.getTitle());
            book.setAvailable(bookDTO.getAvailable());
            book.setAuthor(bookDTO.getAuthor());
            book.setPublisher(bookDTO.getPublisher());
            book.setPublicationYear(bookDTO.getPublicationYear());
            return book;
        }
    }

}
