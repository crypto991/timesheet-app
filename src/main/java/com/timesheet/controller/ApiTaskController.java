package com.timesheet.controller;

import com.timesheet.converters.TaskDTOToTask;
import com.timesheet.converters.TaskToTaskDTO;
import com.timesheet.converters.dto.TaskDTO;
import com.timesheet.model.Task;
import com.timesheet.service.TaskService;
import com.timesheet.util.DateFormater;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/timesheet")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ApiTaskController {

    private DateFormater dateFormater;
    private TaskService taskService;
    private TaskDTOToTask toTask;
    private TaskToTaskDTO toTaskDTO;

    public ApiTaskController(DateFormater dateFormater, TaskService taskService,
                             TaskDTOToTask toTask, TaskToTaskDTO toTaskDTO) {
        this.dateFormater = dateFormater;
        this.taskService = taskService;
        this.toTask = toTask;
        this.toTaskDTO = toTaskDTO;
    }

    @GetMapping("/{date}")
    ResponseEntity<List<TaskDTO>> getTasksByDate(@PathVariable String date) throws ParseException {

        Date date1 = dateFormater.formatDate(date);

        List<Task> tasks = taskService.findByDate(date1);

        List<TaskDTO> taskConverted = toTaskDTO.convert(tasks);

        return new ResponseEntity<>(
            taskConverted,
            HttpStatus.OK);

    }

    @PostMapping("/{date}")
    public ResponseEntity<List<TaskDTO>> createTask(@RequestBody TaskDTO taskDTO,
                                           @PathVariable String date) throws ParseException {

        Date date1 = dateFormater.formatDate(date);

        Task convertedTask = toTask.convert(taskDTO);

        taskService.save(convertedTask, date1);

        List<TaskDTO> tasks = toTaskDTO.convert(taskService.findByDate(date1));

        return new ResponseEntity<>(
            tasks, HttpStatus.CREATED);
    }


    @PutMapping("/{date}")
    public ResponseEntity<List<TaskDTO>> updateTask(@RequestBody TaskDTO taskDTO,
                                           @PathVariable String date) throws ParseException {

        Date date1 = dateFormater.formatDate(date);

        Task taskConverted = toTask.convert(taskDTO);

        taskService.save(taskConverted, date1);

        List<TaskDTO> tasks = toTaskDTO.convert(taskService.findByDate(date1));

        return new ResponseEntity<>(
            tasks, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) throws ParseException {

        Long idTask = Long.parseLong(id);
        taskService.deleteTaskById(idTask);

        return new ResponseEntity<>(HttpStatus.OK);


    }

    @PatchMapping("/{date}")
    public ResponseEntity<TaskDTO> updateTotal(@RequestBody TaskDTO taskDTO, @PathVariable String date) throws ParseException {

        Date date1 = dateFormater.formatDate(date);

        Integer total = taskService.setTotal(date1, taskDTO.getTotalHours());

        taskDTO.setTotalHours(total);

        return new ResponseEntity<>(taskDTO, HttpStatus.OK);
    }


}
