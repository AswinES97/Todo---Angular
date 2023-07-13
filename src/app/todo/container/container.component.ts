import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IAddTodo, Idata } from '../model/data.interface';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  data: Idata[] = []
  emitedData!: Idata

  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
    this.todoService.getData().subscribe((res: Idata[]) => this.data = [...res])
  }

  handleEmitedData(data: Idata) {
    this.emitedData = data
  }

  handleChangeTodo(data: Idata) {
    this.todoService.updateTodo(data).subscribe((res: Idata) => {
      this.data = this.data.map((todo: Idata) => {
        if (todo.date === data.date) {
          todo.id = data.id
          todo.date = data.date
          todo.todo = data.todo
          todo.done = data.done
        }
        return todo
      })

    })
  }

  handleAddTodo(data: IAddTodo) {
    const hasDate = this.data.some((ele: Idata) => ele.date === data.date)
    let length: number = this.data.length + 1

    if (!hasDate) {
      const newData: Idata = {
        id: length,
        date: data.date,
        done: [],
        todo: [data.todo]
      }

      this.todoService.updateDb(newData).subscribe(() => [
        this.data[this.data.length] = {
          id: length,
          date: data.date,
          done: [],
          todo: [data.todo]
        }
      ])
      
    } else {

      let index = this.data.findIndex((ele: Idata) => ele.date == data.date)
      const ele = JSON.parse(JSON.stringify(this.data[index]))
      ele.todo.push(data.todo)

      this.todoService.updateTodo(ele).subscribe((data) => {

        this.data[index] = data
      })

    }

  }

}
