package com.timesheet;

import com.timesheet.model.Task;
import com.timesheet.repository.TaskRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class TestData implements ApplicationListener<ContextRefreshedEvent> {

    private TaskRepository taskRepository;

    public TestData(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        try {
            loadDayAndTasks();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    private void loadDayAndTasks() throws ParseException {


        Date dateNew = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("dd-M-yyyy");
        String dateNewS = sdf.format(dateNew);
        sdf.setLenient(false);
        Date date1 = sdf.parse(dateNewS);
        Integer totalHours = 10;


        Task t1 = new Task();
        t1.setTitle("Learning React");
        t1.setHours(2);
        t1.setPublicationDate(date1);
        t1.setTotalHours(totalHours);
        taskRepository.save(t1);

        Task t2 = new Task();
        t2.setTitle("Learning Redux");
        t2.setHours(2);
        t2.setPublicationDate(date1);
        t2.setTotalHours(totalHours);

        taskRepository.save(t2);

        Task t3 = new Task();
        t3.setTitle("Some task...");
        t3.setHours(2);
        t3.setPublicationDate(date1);
        t3.setTotalHours(totalHours);

        taskRepository.save(t3);



    }

}
