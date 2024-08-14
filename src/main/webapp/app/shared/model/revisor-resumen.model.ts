import { type IRevision } from '@/shared/model/revision.model';

export interface IRevisorResumen {
  revisorId?: string | null;
  nombre?: string | null;
}

export class RevisorResumen implements IRevisorResumen {
  constructor(
    public revisorId?: string | null,
    public nombre?: string | null,
    public revision?: IRevision | null,
  ) {}
}
