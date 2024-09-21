export interface IMenuItem {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  toName: string;
  imgSrc: string;
  btnNameKey?: string;
}

export class MenuItem implements IMenuItem {
  constructor(
    public titleKey: string,
    public subtitleKey: string,
    public descriptionKey: string,
    public toName: string,
    public imgSrc: string,
    public btnNameKey?: string,
  ) {}
}
