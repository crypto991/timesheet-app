package com.timesheet.converters;

import com.timesheet.converters.dto.TaskDTO;
import com.timesheet.model.Task;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class TaskToTaskDTO implements Converter<Task, TaskDTO> {

    @Override
    public TaskDTO convert(Task source) {

        TaskDTO dto = new TaskDTO();

        dto.setId(source.getId());
        dto.setTitle(source.getTitle());
        dto.setHours(source.getHours());
        dto.setTotalHours(source.getTotalHours());

        return dto;
    }


    public List<TaskDTO> convert(List<Task> source) {
        List<TaskDTO> ret = new ArrayList<>();
        for (Task task : source) {
            ret.add(convert(task));
        }

        return ret;
    }
}
