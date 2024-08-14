import { type IRevision } from '@/shared/model/revision.model';

export interface IRevisor {
  revisorId?: string | null;
  nombre?: string | null;
  revision?: IRevision | null;
}

export class Revisor implements IRevisor {
  constructor(
    public revisorId?: string | null,
    public nombre?: string | null,
    public revision?: IRevision | null,
  ) {}
}
