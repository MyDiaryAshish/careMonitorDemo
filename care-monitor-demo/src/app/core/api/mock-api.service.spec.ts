import { TestBed } from '@angular/core/testing';
import { MockApiService } from './mock-api.service';
import { RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { MockDbSchema } from './mock-api.service';

describe('MockApiService', () => {
  let service: MockApiService;
  let utils: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockApiService);
    utils = {
      parseRequestUrl: jasmine.createSpy().and.returnValue({
        collectionName: 'users',
        apiBase: 'api',
        resourceUrl: 'api/users',
        query: new Map<string, string[]>(),
        id: undefined,
      }),
      getDb: jasmine.createSpy().and.returnValue({
        users: [{ id: 1, email: 'demo@caremonitor.com', password: 'Demo@123', token: 'abcd12324' }],
        items: [{ id: 1, name: 'John Doe', description: 'Male, 32 years old, Diabetes' },
      { id: 2, name: 'Jane Smith', description: 'Female, 45 years old, Hypertension' },
      { id: 3, name: 'Alan Johnson', description: 'Male, 27 years old, Asthma' },
      { id: 4, name: 'Emily Davis', description: 'Female, 38 years old, Migraine' },
      { id: 5, name: 'Michael Brown', description: 'Male, 50 years old, Arthritis' },
      { id: 6, name: 'Olivia Wilson', description: 'Female, 29 years old, PCOD' },
      { id: 7, name: 'William Martinez', description: 'Male, 60 years old, Heart Disease' },
      { id: 8, name: 'Sophia Anderson', description: 'Female, 35 years old, Anxiety' },
      { id: 9, name: 'James Thomas', description: 'Male, 41 years old, Insomnia' },
      { id: 10, name: 'Isabella Jackson', description: 'Female, 23 years old, Anemia' },
      { id: 11, name: 'Benjamin White', description: 'Male, 34 years old, Obesity' },
      { id: 12, name: 'Mia Harris', description: 'Female, 48 years old, Menopause' },
      { id: 13, name: 'Elijah Martin', description: 'Male, 31 years old, Fracture' },
      { id: 14, name: 'Charlotte Garcia', description: 'Female, 55 years old, Cataract' },
      { id: 15, name: 'Daniel Clark', description: 'Male, 26 years old, Allergy' },
      { id: 16, name: 'Amelia Rodriguez', description: 'Female, 37 years old, Back Pain' },
      { id: 17, name: 'Lucas Lewis', description: 'Male, 43 years old, Liver Disease' },
      { id: 18, name: 'Evelyn Lee', description: 'Female, 30 years old, Depression' },
      { id: 19, name: 'Henry Walker', description: 'Male, 39 years old, Hypertension' },
      { id: 20, name: 'Abigail Hall', description: 'Female, 51 years old, Diabetes' },
      { id: 21, name: 'Sebastian Allen', description: 'Male, 36 years old, Kidney Stones' },
      { id: 22, name: 'Ella Young', description: 'Female, 33 years old, Hypothyroidism' },
      { id: 23, name: 'Jack Hernandez', description: 'Male, 49 years old, High Cholesterol' },
      { id: 24, name: 'Grace King', description: 'Female, 28 years old, Migraine' },
      { id: 25, name: 'Aiden Wright', description: 'Male, 44 years old, Sinusitis' },
      { id: 26, name: 'Chloe Lopez', description: 'Female, 40 years old, Insomnia' },
      { id: 27, name: 'Matthew Hill', description: 'Male, 52 years old, Arthritis' },
      { id: 28, name: 'Sofia Scott', description: 'Female, 34 years old, PCOS' },
      { id: 29, name: 'Jackson Green', description: 'Male, 61 years old, Heart Disease' },
      { id: 30, name: 'Lily Adams', description: 'Female, 46 years old, Menstrual Issues' },
      { id: 31, name: 'David Baker', description: 'Male, 33 years old, Cold & Cough' },
      { id: 32, name: 'Zoe Nelson', description: 'Female, 26 years old, Anxiety' },
      { id: 33, name: 'Joseph Carter', description: 'Male, 58 years old, High BP' },
      { id: 34, name: 'Hannah Mitchell', description: 'Female, 29 years old, Asthma' },
      { id: 35, name: 'Samuel Perez', description: 'Male, 42 years old, Obesity' },
      { id: 36, name: 'Victoria Roberts', description: 'Female, 39 years old, Migraine' },
      { id: 37, name: 'Logan Turner', description: 'Male, 35 years old, Allergy' },
      { id: 38, name: 'Avery Phillips', description: 'Female, 24 years old, Acne' },
      { id: 39, name: 'Mason Campbell', description: 'Male, 31 years old, Gastritis' },
      { id: 40, name: 'Scarlett Parker', description: 'Female, 50 years old, Thyroid' },
      { id: 41, name: 'Ethan Evans', description: 'Male, 29 years old, Sprain' },
      { id: 42, name: 'Layla Edwards', description: 'Female, 36 years old, UTI' },
      { id: 43, name: 'Owen Collins', description: 'Male, 40 years old, Cold & Cough' },
      { id: 44, name: 'Aria Stewart', description: 'Female, 32 years old, PCOD' },
      { id: 45, name: 'Gabriel Sanchez', description: 'Male, 55 years old, Diabetes' },
      { id: 46, name: 'Nora Morris', description: 'Female, 47 years old, Menopause' },
      { id: 47, name: 'Wyatt Rogers', description: 'Male, 38 years old, Insomnia' },
      { id: 48, name: 'Camila Reed', description: 'Female, 30 years old, Anemia' },
      { id: 49, name: 'Julian Cook', description: 'Male, 45 years old, Arthritis' },
      { id: 50, name: 'Penelope Morgan', description: 'Female, 53 years old, Thyroid' }],
      } as MockDbSchema),
      createResponse$: jasmine.createSpy().and.callFake((fn: () => any) => of(fn())),
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

it('createDb() should return the initial mock database with the correct number of users and items', () => {
    const db = service.createDb();
    expect(db.users.length).toBe(1);
    expect(db.users[0]).toEqual({ id: 1, email: 'demo@caremonitor.com', password: 'Demo@123', token: 'abcd12324' });
    expect(db.items.length).toBe(50);
    expect(db.items[0].name).toBe('John Doe');
    expect(db.items[49].name).toBe('Penelope Morgan');
  });

  it('parseRequestUrl() should return \'/login\' as collectionName for URLs ending with \'/login\'', () => {    utils.parseRequestUrl.and.returnValue({
      collectionName: 'login',
      apiBase: 'api',
      resourceUrl: 'api/login',
      query: new Map<string, string[]>(),
      id: undefined,
    });
    const parsedUrl = service.parseRequestUrl('api/login', utils);
    expect(parsedUrl.collectionName).toBe('login');
  });

  it('parseRequestUrl() should return the original parsed collectionName for other URLs', () => {
    service.parseRequestUrl('api/users', utils);
    expect(utils.parseRequestUrl).toHaveBeenCalledWith('api/users');
    expect(utils.parseRequestUrl()).toEqual({
      collectionName: 'users',
      apiBase: 'api',
      resourceUrl: 'api/users',
      query: new Map<string, string[]>(),
      id: undefined,
    });
  });

  describe('post()', () => {
    let reqInfo: RequestInfo;

    beforeEach(() => {
      reqInfo = {
        id: undefined,
        req: { body: {} } as HttpRequest<any>,
        resourceUrl: 'api/login',
        collectionName: 'login',
        query: new Map<string, string[]>(),
        utils: utils,
        apiBase: 'api',
        collection: 'login' as any,
        headers: new HttpHeaders(),
        method: 'POST',
        url: 'api/login',
      };
    });

    it('with valid credentials should return an Observable with a success response (200 OK) containing a token and user email', () => {
      (reqInfo.req as any).body = { email: 'demo@caremonitor.com', password: 'Demo@123' };
      let response: any;
      service.post(reqInfo)?.subscribe(res => response = res);
      expect(utils.createResponse$).toHaveBeenCalled();
      const args = (utils.createResponse$ as jasmine.Spy).calls.argsFor(0);
      if (args && args.length > 0 && typeof args[0] === 'function') {
        const responseOptions = args[0]();
        expect(responseOptions.status).toBe(STATUS.OK);
        expect(responseOptions.body).toEqual({ token: 'abcd12324', user: { email: 'demo@caremonitor.com' } });
      } else {
        fail('createResponse$ was not called with a function');
      }
    });

    it('with invalid email should return an Observable with an unauthorized response (401 UNAUTHORIZED) containing an \'Invalid email\' error', () => {
      (reqInfo.req as any).body = { email: 'invalid@email.com', password: 'Demo@123' };
      let response: any;
      service.post(reqInfo)?.subscribe(res => response = res);
      expect(utils.createResponse$).toHaveBeenCalled();
      const args = (utils.createResponse$ as jasmine.Spy).calls.argsFor(0);
      if (args && args.length > 0 && typeof args[0] === 'function') {
        const responseOptions = args[0]();
        expect(responseOptions.status).toBe(STATUS.UNAUTHORIZED);
        expect(responseOptions.body).toEqual({ error: 'Invalid email' });
      } else {
        fail('createResponse$ was not called with a function');
      }
    });

    it('with invalid password should return an Observable with an unauthorized response (401 UNAUTHORIZED) containing an \'Invalid password\' error', () => {
      (reqInfo.req as any).body = { email: 'demo@caremonitor.com', password: 'wrongpassword' };
      let response: any;
      service.post(reqInfo)?.subscribe(res => response = res);
      expect(utils.createResponse$).toHaveBeenCalled();
      const args = (utils.createResponse$ as jasmine.Spy).calls.argsFor(0);
      if (args && args.length > 0 && typeof args[0] === 'function') {
        const responseOptions = args[0]();
        expect(responseOptions.status).toBe(STATUS.UNAUTHORIZED);
        expect(responseOptions.body).toEqual({ error: 'Invalid password' });
      } else {
        fail('createResponse$ was not called with a function');
      }
    });

    it('with a collectionName other than \'login\' should return undefined', () => {
      reqInfo.collectionName = 'items';
      expect(service.post(reqInfo)).toBeUndefined();
    });
  });
});
