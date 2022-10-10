import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('FileController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/files/01GDFT4N13DWAN44K4KSED0Y74 (GET)', () => {
    return request(app.getHttpServer())
      .get('/files/01GDFT4N13DWAN44K4KSED0Y74')
      .expect(200)
      .expect('{"id":"01GDFT4N13DWAN44K4KSED0Y74","typeCode":"BASE","application":"CINAF","rootPath":"/","createdAt":"2022-09-21T10:40:17.443Z","updatedAt":"2022-09-21T10:40:17.478Z","format":[{"id":"01GDFT4N14XEMADJRSMQSRWYKR","resolution":"{\\"w\\":139,\\"h\\":296}","isOriginal":true,"extension":".webp","size":8282,"path":"cinaf-1-01GDFT4MZE4N5Z1CDXNVTVBCND.webp","createdAt":"2022-09-21T10:40:17.444Z","updatedAt":"2022-09-21T10:40:17.657Z"}]}');
  });
});
