package com.timesheet.service;

import com.timesheet.model.Task;

import java.util.Date;
import java.util.List;

public interface TaskService {

    List<Task> findByDate(Date date);
    Task save(Task task, Date date);
    void deleteTaskById(Long id);
    Task findById(Long id);

    Integer setTotal(Date date, Integer total);


}
