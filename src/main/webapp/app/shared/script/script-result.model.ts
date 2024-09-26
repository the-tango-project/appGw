export interface IScriptResult {
  isValid: boolean;
  data: any;
  showResult: boolean;
  showResultAsObject: boolean;
}

export class ScriptResult implements IScriptResult {
  constructor(
    public isValid: boolean,
    public data: any,
    public showResult: boolean,
    public showResultAsObject: boolean,
  ) {}
}
