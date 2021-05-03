import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { HttpService } from './services/http.service';
import { CommonService } from './services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadModule } from '@progress/kendo-angular-upload';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { GraphQLModule } from './graphql.module';
import { GraphqlService } from './services/graphql.service';


const config: SocketIoConfig = { url: environment.WEBSOCKET_URL, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputsModule,
    BrowserAnimationsModule,
    GridModule,
    DropDownsModule,
    ButtonsModule,
    DialogModule,
    WindowModule,
    DateInputsModule,
    UploadModule,
    UploadsModule,
    SocketIoModule.forRoot(config),
    IndicatorsModule,
    GraphQLModule
  ],
  providers: [HttpService, CommonService, GraphqlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
