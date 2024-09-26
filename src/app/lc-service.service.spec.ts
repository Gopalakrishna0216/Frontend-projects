import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LcServiceService } from './lcservice.service';

describe('LcServiceService', () => {
  let service: LcServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LcServiceService]
    });

    service = TestBed.inject(LcServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    const mockUsers = [{ userId: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }];

    service.crudGet().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://localhost:7075/api/User');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should post a new user', () => {
    const user = { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' };

    service.crudPost(user).subscribe(response => {
      expect(response).toEqual('User created successfully');
    });

    const req = httpMock.expectOne('https://localhost:7075/api/User');
    expect(req.request.method).toBe('POST');
    req.flush('User created successfully');
  });

  it('should put (update) a user', () => {
    const userId = 1;
    const user = { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' };

    service.crudPut(userId, user).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`https://localhost:7075/api/User/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a user', () => {
    const userId = 1;

    service.crudDelete(userId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`https://localhost:7075/api/User/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
