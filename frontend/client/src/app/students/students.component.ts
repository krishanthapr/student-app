import { Component, OnInit } from '@angular/core';
import { Student } from '../models/students/student';
import { CommonService } from '../services/common.service';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import { Socket } from 'ngx-socket-io';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  gridData: Array<Student>;
  isOpenSave: boolean = false;
  saveStudent: Student = new Student();
  isOpenDelete: boolean = false;
  deleteId: number | null;
  saveState: string;
  fileUid: string = "";
  fileToUpload: File;

  msgModalTitle: string = "";
  message: string = "";
  isOpenMsgModal: boolean = false;
  loadingPanelVisible = true;

  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;

  students:Observable<any>;

  constructor(private httpService: HttpService, private commonService: CommonService, private socket: Socket,private graphqlService: GraphqlService) {
    this.getMessage().subscribe((message: any) => {
      this.getStudents();
      this.msgModalTitle = "Success";
      this.message = message.text;
      this.isOpenMsgModal = true;
    })
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getMessage(): Observable<any> {
    return this.socket.fromEvent('msgToClient');
  }

  getStudents() {
    this.graphqlService.getData().then((response: any) => {
        this.gridData = this.mapGetStudents(response.data.students);
        this.loadItems(this.gridData);
        this.loadingPanelVisible = false;
      }).catch((err) => {
        console.error(err);
      });
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems(this.gridData);
  }

  private loadItems(data: Student[]): void {
    this.gridView = {
      data: data.slice(this.skip, this.skip + this.pageSize),
      total: data.length
    };
  }

  mapGetStudents(data: any[]) {
    return data.map((item) => ({
      ...item,
      age: this.getAge(new Date(item.birthday))
    }));
  }

  editStudent(data: Student) {
    this.saveStudent = <Student>{ id: data.id, name: data.name, email: data.email, birthday: new Date(data.birthday), age: data.age };
    this.isOpenSave = true;
    this.saveState = 'UPD';
  }

  deleteStudent(id: number) {
    this.isOpenDelete = true;
    this.deleteId = id;
  }

  triggerStudentDelete() {
    this.loadingPanelVisible = true;
    this.graphqlService.deleteData(this.deleteId).then((response: any) => {
      this.msgModalTitle = "Success";
      this.message = "Successfully deleted";
      this.isOpenMsgModal = true;
      this.getStudents();
    }).catch((err) => {
      console.error(err);
    });
  }

  studentSave() {
    console.log(this.saveStudent);
    if (this.saveState === 'ADD') {
      this.createStudent();
    } else if (this.saveState === 'UPD') {
      this.updateStudent();
    }
    this.closeSave();
  }

  createStudent() {
    this.loadingPanelVisible = true;
    let url = this.commonService.getCoreServiceUrl() + 'students'
    this.httpService.postData(url, this.saveStudent).then((response: Student) => {
      this.getStudents();
    }).catch((err) => {
      console.error(err);
    });
  }

  updateStudent() {
    this.loadingPanelVisible = true;
    this.graphqlService.putData(this.saveStudent).then((response: any) => {
      this.msgModalTitle = "Success";
      this.message = "Successfully updated";
      this.isOpenMsgModal = true;
      this.getStudents();
    }).catch((err) => {
      console.error(err);
    });
  }

  addStudent() {
    this.isOpenSave = true;
    this.saveState = 'ADD';
  }

  closeSave() {
    this.saveStudent = new Student();
    this.isOpenSave = false;
  }

  closeDelete(value: string) {
    if (value === 'yes') {
      this.triggerStudentDelete();
    }
    this.isOpenDelete = false;
  }

  selectEventHandler(event: any, fileSelect) {

    if (this.fileUid !== "") {
      fileSelect.removeFileByUid(this.fileUid);
    }
    this.fileToUpload = event.files[0].rawFile;
    this.fileUid = event.files[0].uid;

  }

  uploadFile(fileSelect) {
    this.loadingPanelVisible = true;
    let url = this.commonService.getCoreServiceUrl() + 'upload'
    this.httpService.postFile(url, this.fileToUpload).then(response => {
      fileSelect.removeFileByUid(this.fileUid);
    }, error => {
      console.log(error);
    });
  }

  getAge(dateOfBirth: Date) {
    const today = new Date();
    const diff = today.getTime() - dateOfBirth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  closeMsgModal() {
    this.msgModalTitle = "";
    this.message = "";
    this.isOpenMsgModal = false;
  }
}
