import { ArgumentType } from '@/shared/model/enumerations/argument-type.model';

export interface IArgument {
  name?: string | null;
  type?: ArgumentType | null;
  value?: any;
}

export class Argument implements IArgument {
  constructor(
    public name?: string | null,
    public type?: ArgumentType | null,
    public value?: any,
  ) {
    this.value = this.value ? this.value : null;
  }
}
