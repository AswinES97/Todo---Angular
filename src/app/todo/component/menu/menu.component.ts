import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAddTodo, Idata } from '../../model/data.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() data!: Idata[]
  @Output() emitData: EventEmitter<Idata> = new EventEmitter()
  @Output() addTodo: EventEmitter<IAddTodo> = new EventEmitter()


  changeDisplay(data:Idata) {
    this.emitData.emit(data)
  }

  submitForm(date: string, todo: string) {
    this.addTodo.emit({
      date:date,
      todo:todo
    })
  }
}
