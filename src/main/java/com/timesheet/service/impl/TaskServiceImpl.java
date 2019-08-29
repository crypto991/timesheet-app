package com.timesheet.service.impl;


import com.timesheet.exceptions.TaskException;
import com.timesheet.model.Task;
import com.timesheet.repository.TaskRepository;
import com.timesheet.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }


    @Override
    public List<Task> findByDate(Date date) {
        return taskRepository.findByPublicationDate(date);
    }

    @Override
    public Task save(Task task, Date date) {
        if (task.getId() != null) {
            Task forUpdate = taskRepository.getOne(task.getId());
            forUpdate.setTitle(task.getTitle());
            forUpdate.setPublicationDate(date);
            forUpdate.setHours(task.getHours());

            taskRepository.save(forUpdate);
        }
        task.setPublicationDate(date);

        return taskRepository.save(task);
    }


    @Override
    public void deleteTaskById(Long id) {
        Task task = taskRepository.getOne(id);
        if (task == null) {
            throw new TaskException("Task with '" + id + "' does not exist!");
        }

        taskRepository.deleteById(id);
    }

    @Override
    public Task findById(Long id) {
        return taskRepository.getOne(id);
    }


    @Override
    public Integer setTotal(Date date, Integer total) {
        List<Task> tasks = taskRepository.findByPublicationDate(date);
        int sumHours = 0;
        for (Task task : tasks) {
            sumHours += task.getHours();
        }
        if (total > sumHours) {
            for (Task task : tasks) {
                task.setTotalHours(total);
                taskRepository.save(task);
            }
            return total;
        }else {
            throw new TaskException("Total can not exceed sum of hours already set tasks");
        }
    }

}
