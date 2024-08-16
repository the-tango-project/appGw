import * as personaUtils from '@/shared/util/format-util';
import * as dateUtils from '@/shared/date/date-utils';

export default class ScriptService {
  static CM_OPTIONS = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    foldGutter: true,
    styleSelectedText: true,
    mode: 'text/javascript',
    matchBrackets: true,
    showCursorWhenSelecting: true,
    theme: 'base16-light',
    extraKeys: { 'Ctrl-Space': 'autocomplete' },
    hintOptions: {
      completeSingle: false,
    },
  };

  static HTML_OPTIONS = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    foldGutter: true,
    styleSelectedText: true,
    mode: 'text/html',
    matchBrackets: true,
    showCursorWhenSelecting: true,
    theme: 'base16-light',
    extraKeys: { 'Ctrl-Space': 'autocomplete' },
    hintOptions: {
      completeSingle: false,
    },
  };
  static VUEJS_OPTIONS = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    foldGutter: true,
    styleSelectedText: true,
    mode: 'text/x-vue',
    matchBrackets: true,
    showCursorWhenSelecting: true,
    theme: 'base16-light',
    extraKeys: { 'Ctrl-Space': 'autocomplete' },
    hintOptions: {
      completeSingle: false,
    },
  };

  public runFunction(expression, context) {
    context.format = this.configDefaultFormats();
    const result = { isValid: true, data: {}, showResult: true, showResultAsObject: false };
    try {
      result.data = new Function(...Object.keys(context), expression).bind(this)(...Object.values(context));
      result.showResult = typeof result.data !== 'boolean';
      result.showResultAsObject = typeof result.data === 'object';
    } catch (error) {
      result.isValid = false;
      result.data = error;
    }
    return result;
  }

  private configDefaultFormats() {
    return {
      date: dateUtils,
      person: personaUtils,
    };
  }

  public onCmReady(codemirror) {
    setTimeout(function () {
      codemirror.refresh();
    }, 10);
  }
}
