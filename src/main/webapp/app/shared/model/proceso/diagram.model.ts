import type { EdgeChangeType } from '../enumerations/edge-change-type.model';
import type { LineType } from '../enumerations/line-type.model';
import type { NodeChangeType } from '../enumerations/node-change-type.model';
import type { TipoAccion } from '../enumerations/tipo-accion.model';

export interface IDiagram {
  x?: number | null;
  y?: number | null;
  sourceId?: string | null;
  targetId?: string | null;
  type?: string | null;
}

export class Diagram implements IDiagram {
  constructor(
    public x?: number | null,
    public y?: number | null,
    public sourceId?: string | null,
    public targetId?: string | null,
    public type?: string | null,
  ) {}
}

export class NodeChange extends Diagram {
  constructor(
    public id?: string | null,
    public type?: NodeChangeType | null,
    public x?: number | null,
    public y?: number | null,
    public sourceId?: string | null,
    public targetId?: string | null,
    public action?: TipoAccion | null,
    public edgeChange?: EdgeChange | null,
  ) {
    super(x, y, sourceId, targetId);
  }
}

export class EdgeChange extends Diagram {
  constructor(
    public id?: string | null,
    public type?: EdgeChangeType | null,
    public lineType?: LineType | null, //bezier,step,smoothstep,straight
    public x?: number | null,
    public y?: number | null,
    public sourceId?: string | null,
    public targetId?: string | null,
    public action?: TipoAccion | null,
    public sourceHandle?: string | null,
    public targetHandle?: string | null,
  ) {
    super(x, y, sourceId, targetId);
  }
}
