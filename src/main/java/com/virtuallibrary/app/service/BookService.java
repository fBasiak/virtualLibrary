package com.virtuallibrary.app.service;

import com.virtuallibrary.app.domain.Book;
import com.virtuallibrary.app.repository.BookRepository;
import com.virtuallibrary.app.service.dto.BookDTO;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class BookService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public Page<BookDTO> getAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable).map(BookDTO::new);
    }
}
