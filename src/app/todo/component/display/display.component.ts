import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Idata } from '../../model/data.interface';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  standalone: true,
  imports: [CdkDropList, NgFor, CdkDrag]

})
export class DisplayComponent implements OnChanges {
  @Input() displayData!: Idata
  @Input() emitedData!: Idata
  @Output() changeTodo: EventEmitter<Idata> = new EventEmitter()

  todo!: string[]
  done!: string[]
  date!: string
  id!: number

  ngOnChanges(changes: SimpleChanges): void {    

    if (changes?.["displayData"]) {
      this.id = this.displayData.id
      this.date = this.displayData.date
      this.todo = [...this.displayData.todo]
      this.done = [...this.displayData.done]

    }

    if (changes?.["emitedData"]) {
      this.id = this.emitedData.id
      this.date = this.emitedData.date
      this.todo = [...this.emitedData.todo]
      this.done = [...this.emitedData.done]
    }
  }

  emitChange() {
    this.changeTodo.emit({
      id: this.id,
      date: this.date,
      todo: this.todo,
      done: this.done
    })
  }

  handleTodoDelete(todo: string) {
    this.todo = this.todo.filter((data: string) => data != todo)
    this.emitChange()
  }

  handleDoneDelete(done: string) {    
    this.done = this.done.filter((data: string) => data != done)
    this.emitChange()
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.emitChange()

    }
  }

}
