package com.timesheet.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.timesheet.model.Quote;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.Random;

@Component
public class QuoteGenerator {

    public Quote getQuotes() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Quote[] quotes = objectMapper.readValue(new File("quotes.json"), Quote[].class);

        int rnd = new Random().nextInt(quotes.length);

        return quotes[rnd];
    }

}
