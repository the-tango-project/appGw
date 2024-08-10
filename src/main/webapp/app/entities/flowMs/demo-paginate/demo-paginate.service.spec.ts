/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import DemoPaginateService from './demo-paginate.service';
import { DATE_TIME_FORMAT } from '@/shared/composables/date-format';
import { DemoPaginate } from '@/shared/model/flowMs/demo-paginate.model';

const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
  put: sinon.stub(axios, 'put'),
  patch: sinon.stub(axios, 'patch'),
  delete: sinon.stub(axios, 'delete'),
};

describe('Service Tests', () => {
  describe('DemoPaginate Service', () => {
    let service: DemoPaginateService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new DemoPaginateService();
      currentDate = new Date();
      elemDefault = new DemoPaginate(
        'ABC',
        'AAAAAAA',
        currentDate,
        0,
        0,
        false,
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'ES',
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            creationDate: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault,
        );
        axiosStub.get.resolves({ data: returnedFromService });

        return service.find('ABC').then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        axiosStub.get.rejects(error);
        return service
          .find('ABC')
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a DemoPaginate', async () => {
        const returnedFromService = Object.assign(
          {
            id: 'ABC',
            creationDate: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault,
        );
        const expected = Object.assign(
          {
            creationDate: currentDate,
          },
          returnedFromService,
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a DemoPaginate', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a DemoPaginate', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            creationDate: dayjs(currentDate).format(DATE_TIME_FORMAT),
            age: 1,
            price: 1,
            active: true,
            ima: 'BBBBBB',
            dataAnyBlob: 'BBBBBB',
            photo: 'BBBBBB',
            description: 'BBBBBB',
            dataEnum: 'BBBBBB',
          },
          elemDefault,
        );

        const expected = Object.assign(
          {
            creationDate: currentDate,
          },
          returnedFromService,
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a DemoPaginate', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a DemoPaginate', async () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            creationDate: dayjs(currentDate).format(DATE_TIME_FORMAT),
            price: 1,
            active: true,
            ima: 'BBBBBB',
            photo: 'BBBBBB',
            dataEnum: 'BBBBBB',
          },
          new DemoPaginate(),
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            creationDate: currentDate,
          },
          returnedFromService,
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a DemoPaginate', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of DemoPaginate', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            creationDate: dayjs(currentDate).format(DATE_TIME_FORMAT),
            age: 1,
            price: 1,
            active: true,
            ima: 'BBBBBB',
            dataAnyBlob: 'BBBBBB',
            photo: 'BBBBBB',
            description: 'BBBBBB',
            dataEnum: 'BBBBBB',
          },
          elemDefault,
        );
        const expected = Object.assign(
          {
            creationDate: currentDate,
          },
          returnedFromService,
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of DemoPaginate', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a DemoPaginate', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete('ABC').then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a DemoPaginate', async () => {
        axiosStub.delete.rejects(error);

        return service
          .delete('ABC')
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
