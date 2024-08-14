import { PropertyMapType } from '@/shared/model/enumerations/property-map-type.model';

export interface IPropertyMap {
  type?: PropertyMapType | null;
  from?: string | null;
  to?: string;
  value?: string;
}

export class PropertyMap implements IPropertyMap {
  constructor(
    public type?: PropertyMapType | null,
    public from?: string | null,
    public to?: string,
    public value?: string,
  ) {}
}
