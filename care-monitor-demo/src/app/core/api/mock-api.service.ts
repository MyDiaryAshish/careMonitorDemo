import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS, } from 'angular-in-memory-web-api';
interface User {
  id: number;
  email: string;
  password: string;
  token: string;
}

interface Item {
  id: number;
  name: string;
  description: string;
}

interface MockDbSchema {
  users: User[];
  items: Item[];
}


@Injectable({ providedIn: 'root' })
export class MockApiService implements InMemoryDbService {
  createDb(): MockDbSchema {
    const users = [
      { id: 1, email: 'demo@caremonitor.com', password: 'Demo@123', token: 'abcd12324' },
    ];
    const items = [
      { id: 1, name: 'John Doe', description: 'Male, 32 years old, Diabetes' },
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
      { id: 50, name: 'Penelope Morgan', description: 'Female, 53 years old, Thyroid' },
    ];

    return { users, items };
  }

  parseRequestUrl(url: string, utils: any) {
    const parsed = utils.parseRequestUrl(url);
    const { collectionName, apiBase, resourceUrl, query, id } = parsed;

    if (resourceUrl.endsWith('/login')) {
      return {
        apiBase,
        collectionName: 'login',
        id,
        query,
        resourceUrl,
      };
    }
    return parsed;
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'login') {
      return this.login(reqInfo);
    }
    return undefined;
  }

  private login(reqInfo: RequestInfo) {
    const body = (reqInfo.req as any).body as { email: string; password: string };
    const db = reqInfo.utils.getDb() as MockDbSchema;

    // validate the Email and password
    const userWithEmail = db.users.find(u => u.email === body.email);
    const userWithPassword = db.users.find(u => u.password === body.password);
    const user = db.users.find(u => u.email === body.email && u.password === body.password);

    //TO display respective error message
    let error = '';
    if (!userWithEmail && !userWithPassword) {
      error = 'Invalid email and password';
    } else if (!userWithEmail) {
      error = 'Invalid email';
    } else if (!userWithPassword || !user) {
      error = 'Invalid password';
    }

    const options: ResponseOptions = user
      ? {
        body: {
          token: user.token,
          user: { email: user.email },
        },
        status: STATUS.OK,
      }
      : {
        body: { error},
        status: STATUS.UNAUTHORIZED,
      };

    return reqInfo.utils.createResponse$(() => options);
  }
}
