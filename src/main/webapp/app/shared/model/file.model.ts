export interface IFile {
  contentType?: string | null;
  nombre?: string | null;
  title?: string | null;
  size?: number | null;
  uri?: string | null;
}

export class File implements IFile {
  constructor(
    public contentType?: string | null,
    public nombre?: string | null,
    public title?: string | null,
    public size?: number | null,
    public uri?: string | null,
  ) {
    this.contentType = this.contentType ? this.contentType : '';
    this.nombre = this.nombre ? this.nombre : '';
    this.title = this.title ? this.title : '';
    this.size = this.size ? this.size : null;
    this.uri = this.uri ? this.uri : null;
  }
}
