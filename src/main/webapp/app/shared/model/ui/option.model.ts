export interface IOption {
  value?: any | null;
  text?: string | null;
  disabled?: boolean | null;
}

export class Option implements IOption {
  constructor(
    public value?: any | null,
    public text?: string | null,
    public disabled?: boolean | null,
  ) {}
}
