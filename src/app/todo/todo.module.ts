import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

// container
import { ContainerComponent } from './container/container.component';

// components
import { MenuComponent } from './component/menu/menu.component';
import { DisplayComponent } from './component/display/display.component';

// service
import { TodoServiceService } from './todo-service.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContainerComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    DisplayComponent,
    HttpClientModule,
    FormsModule
  ],
  exports:[
    ContainerComponent
  ],
  providers:[
    TodoServiceService
  ]
})
export class TodoModule { }
