package com.timesheet.exceptions;

public class TaskExceptionResponse {

    private String error;

    public TaskExceptionResponse(String totalHours) {
        this.error = totalHours;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
