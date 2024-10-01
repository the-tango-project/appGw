import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';
import buildQueryOpts from '@/shared/filters/query-opts';

import { type ISolucion } from '@/shared/model/solucion.model';

const baseApiUrl = 'services/flowms/api/soluciones';

export default class SolucionService {
  public find(id: string): Promise<ISolucion> {
    return new Promise<ISolucion>((resolve, reject) => {
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

  public findByLastEdited(id: string): Promise<ISolucion> {
    return new Promise<ISolucion>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}/historicos`)
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
        .get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}${buildQueryOpts(paginationQuery.filter)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieveByActive(paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + '/activas' + `?${buildPaginationQueryOpts(paginationQuery)}`)
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

  public create(entity: ISolucion): Promise<ISolucion> {
    return new Promise<ISolucion>((resolve, reject) => {
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

  public update(entity: ISolucion): Promise<ISolucion> {
    return new Promise<ISolucion>((resolve, reject) => {
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

  public publicar(entity: ISolucion): Promise<ISolucion> {
    return new Promise<ISolucion>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}/publicaciones`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public archivar(entity: ISolucion): Promise<ISolucion> {
    return new Promise<ISolucion>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}/archivar`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public partialUpdate(entity: ISolucion): Promise<ISolucion> {
    return new Promise<ISolucion>((resolve, reject) => {
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

  public findEvaluacionDefinicion(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}/evaluaciones`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public updateEvaluacionDefinicion(entity: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}/evaluaciones`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
