import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { stat } from 'fs';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private _taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this._taskRepository.getTasks(filterDto);
  }

  async getTaskById(taskId: number): Promise<Task> {
    const found = await this._taskRepository.findOne(taskId);

    if (!found) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this._taskRepository.createTask(createTaskDTO);
  }

  async deleteTask(taskId: number): Promise<void> {
    const found = await this._taskRepository.findOne(taskId);

    if (!found) {
      throw new NotFoundException(
        `Task with id ${taskId} not found. Unable to delete`,
      );
    }
    await this._taskRepository.delete(taskId);
  }

  async updateTaskStatus(taskId: number, newStatus: TaskStatus): Promise<Task> {
    const taskToUpdate = await this.getTaskById(taskId);
    taskToUpdate.status = newStatus;
    taskToUpdate.save();
    return taskToUpdate;
  }

  // public updateTaskStatus(taskId: string, newStatus: TaskStatus): Task {
  //   const task = this.getTaskById(taskId);
  //   task.status = newStatus;
  //   return task;
  // }
}
