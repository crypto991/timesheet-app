package com.timesheet.controller;

import com.timesheet.model.Quote;
import com.timesheet.util.QuoteGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping("api/quotes")
@CrossOrigin(origins = "*")
public class ApiQuoteController {

    private QuoteGenerator quoteGenerator;

    public ApiQuoteController(QuoteGenerator quoteGenerator) {
        this.quoteGenerator = quoteGenerator;
    }

    @GetMapping
    ResponseEntity<Quote> getQuote() throws IOException {

        Quote quote = quoteGenerator.getQuotes();

        if (quote == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(
            quote,
            HttpStatus.OK);
    }
}
