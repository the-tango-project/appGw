export interface IDemoInfiniteScroll {
  id?: string;
  name?: string;
}

export class DemoInfiniteScroll implements IDemoInfiniteScroll {
  constructor(
    public id?: string,
    public name?: string,
  ) {}
}
