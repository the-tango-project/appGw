import { type Language } from '@/shared/model/enumerations/language.model';
export interface IDemoPaginate {
  id?: string;
  name?: string;
  creationDate?: Date | null;
  age?: number | null;
  price?: number | null;
  active?: boolean | null;
  imaContentType?: string | null;
  ima?: string | null;
  dataAnyBlobContentType?: string | null;
  dataAnyBlob?: string | null;
  photoContentType?: string | null;
  photo?: string | null;
  description?: string;
  dataEnum?: keyof typeof Language | null;
}

export class DemoPaginate implements IDemoPaginate {
  constructor(
    public id?: string,
    public name?: string,
    public creationDate?: Date | null,
    public age?: number | null,
    public price?: number | null,
    public active?: boolean | null,
    public imaContentType?: string | null,
    public ima?: string | null,
    public dataAnyBlobContentType?: string | null,
    public dataAnyBlob?: string | null,
    public photoContentType?: string | null,
    public photo?: string | null,
    public description?: string,
    public dataEnum?: keyof typeof Language | null,
  ) {
    this.active = this.active ?? false;
  }
}
