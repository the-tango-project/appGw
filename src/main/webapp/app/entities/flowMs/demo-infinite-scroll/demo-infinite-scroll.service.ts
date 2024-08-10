import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { type IDemoInfiniteScroll } from '@/shared/model/flowMs/demo-infinite-scroll.model';

const baseApiUrl = 'services/flowms/api/demo-infinite-scrolls';

export default class DemoInfiniteScrollService {
  public find(id: string): Promise<IDemoInfiniteScroll> {
    return new Promise<IDemoInfiniteScroll>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: IDemoInfiniteScroll): Promise<IDemoInfiniteScroll> {
    return new Promise<IDemoInfiniteScroll>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: IDemoInfiniteScroll): Promise<IDemoInfiniteScroll> {
    return new Promise<IDemoInfiniteScroll>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public partialUpdate(entity: IDemoInfiniteScroll): Promise<IDemoInfiniteScroll> {
    return new Promise<IDemoInfiniteScroll>((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
