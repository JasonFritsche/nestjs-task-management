import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { stat } from 'fs';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  public getAllTasks(): Array<Task> {
    return this.tasks;
  }

  public getTaskById(taskId: string): Task {
    const found = this.tasks.find((task) => task.id === taskId);

    if (!found) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    } else {
      return found;
    }
  }

  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, searchTerm } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (searchTerm) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(searchTerm) ||
          task.description.includes(searchTerm),
      );
    }

    return tasks;
  }

  public createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  public deleteTask(taskId: string): void {
    const task = this.getTaskById(taskId);
    if (task) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }
  }

  public updateTaskStatus(taskId: string, newStatus: TaskStatus): Task {
    const task = this.getTaskById(taskId);
    task.status = newStatus;
    return task;
  }
}
