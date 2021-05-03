import { Test, TestingModule } from '@nestjs/testing';
import { UpdateStudentInput } from '../models/input/update-student.input';
import { Student } from '../models/student';
import { StudentService } from '../service/student.service';
import { StudentsResolver } from './students.resolver';

describe('StudentsResolver', () => {
  let resolver: StudentsResolver;
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsResolver,
        {
          provide: StudentService,
          useValue: {
            getElasticSearchData: jest.fn()
          }
        }],
    }).compile();

    resolver = module.get<StudentsResolver>(StudentsResolver);
    service = module.get<StudentService>(StudentService)
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should give the expected return findAll', async () => {
    service.findAll = jest.fn().mockReturnValue({ data: Array<Student>() })
    const students = await resolver.getStudents()
    expect(students).toEqual({ data: Array<Student>() })
  });

  it('should give the expected return getAge', async () => {
    service.getAge = jest.fn().mockReturnValue({ data: 1 })
    const students = await service.getAge(new Date("2020-01-01"))
    expect(students).toEqual({ data: 1 })
  });

  it('should give the expected return remove', async () => {
    service.remove = jest.fn().mockReturnValue({ data: {} })
    const students = await resolver.deleteStudent({ id: 5 })
    expect(students).toEqual({ data: {} })
  });
  
  it('should give the expected return update', async () => {
    service.update = jest.fn().mockReturnValue({ data: new Student() })
    const students = await resolver.updateStudent(new UpdateStudentInput())
    expect(students).toEqual({ data: {} })
  });

});
