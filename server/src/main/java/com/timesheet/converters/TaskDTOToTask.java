package com.timesheet.converters;

import com.timesheet.converters.dto.TaskDTO;
import com.timesheet.model.Task;
import com.timesheet.service.TaskService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class TaskDTOToTask implements Converter<TaskDTO, Task> {


    private TaskService taskService;

    public TaskDTOToTask(TaskService taskService) {
        this.taskService = taskService;
    }

    @Override
    public Task convert(TaskDTO source) {
        Task task;

        if(source.getId()==null){
            task = new Task();
        }else{
            task = taskService.findById(source.getId());
        }

        task.setTitle(source.getTitle());
        task.setHours(source.getHours());
        task.setTotalHours(source.getTotalHours());


        return task;
    }

    public List<Task> convert (List<TaskDTO> source){
        List<Task> ret = new ArrayList<>();
        for (TaskDTO dto : source){
            ret.add(convert(dto));
        }

        return  ret;
    }
}
