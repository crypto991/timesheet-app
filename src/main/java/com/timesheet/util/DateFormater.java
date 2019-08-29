package com.timesheet.util;

import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class DateFormater {

    public Date formatDate (String date) throws ParseException {

        SimpleDateFormat sdf = new SimpleDateFormat("dd-M-yyyy");
        sdf.setLenient(false);
        Date date1 = sdf.parse(date);

        return date1;
    }
}
