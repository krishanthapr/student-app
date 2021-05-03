import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { UploadModule, UploadsModule } from '@progress/kendo-angular-upload';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { GraphQLModule } from '../graphql.module';
import { CommonService } from '../services/common.service';
import { GraphqlService } from '../services/graphql.service';
import { HttpService } from '../services/http.service';

import { StudentsComponent } from './students.component';

const config: SocketIoConfig = { url: environment.WEBSOCKET_URL, options: {} };

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      declarations: [ StudentsComponent ],
      providers: [HttpService, CommonService, GraphqlService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
