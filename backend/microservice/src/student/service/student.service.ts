import { Injectable } from '@nestjs/common';
import { Student } from '../models/student.interface';
import axios from 'axios';
import { QueryService } from './query.service';

@Injectable()
export class StudentService {

  API_URL: string = '';

  constructor(private queryService: QueryService) {
    this.API_URL = process.env.POSTGRAPHILE_URL;
  }

  async add(student: Student): Promise<any> {
    const data = await axios.post(this.API_URL, {
      query: this.queryService.getAddQuery(student)
    }).then(function (response) {
      return response.data;
    }).catch(function (error) {
      return error;
    });
    return data;
  }

  async findAll(): Promise<any> {
    const data = await axios.post(this.API_URL, {
      query: this.queryService.getFindAllQuery()
    }).then(function (response) {
      return response.data;
    }).catch(function (error) {
      return error;
    });

    return data;

  }

  async update(student: Student): Promise<any> {
    const data = await axios.post(this.API_URL, {
      query: this.queryService.getUpdateQuery(student)
    }).then(function (response) {
      return response.data;
    }).catch(function (error) {
      return error;
    });
    return data;
  }

  async remove(id: number): Promise<any> {
    const data = await axios.post(this.API_URL, {
      query: this.queryService.getDeleteQuery(id)
    }).then(function (response) {
      return response.data;
    }).catch(function (error) {
      return error;
    });
    return data;

  }

}
