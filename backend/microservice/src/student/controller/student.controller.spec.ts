import { Test, TestingModule } from '@nestjs/testing';
import { Student } from '../models/student.interface';
import { StudentService } from '../service/student.service';
import { StudentController } from './student.controller';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should give the expected return findAll', async () => {
    service.findAll = jest.fn().mockReturnValue({ data: Array<Student>() })
    const students = await controller.findAll('')
    expect(students).toEqual({ data: Array<Student>() })
  });

  it('should give the expected return getAge', async () => {
    service.getAge = jest.fn().mockReturnValue({ data: 1 })
    const students = await service.getAge(new Date("2020-01-01"))
    expect(students).toEqual({ data: 1 })
  });

  it('should give the expected return remove', async () => {
    service.remove = jest.fn().mockReturnValue({ data: {} })
    const students = await controller.remove(5)
    expect(students).toEqual({ data: {} })
  });

  it('should give the expected return update', async () => {
    service.update = jest.fn().mockReturnValue({ data: <Student>{} })
    const students = await controller.update(<Student>{})
    expect(students).toEqual({ data: <Student>{} })
  });
});
