import type { Lifecycle, LifecycleNode } from '@invariant-trail/engine';
import { useId } from 'react';

const NODE_W = 148;
const NODE_H = 54;
const PAD = 14;

interface Point {
  x: number;
  y: number;
}

const center = (n: LifecycleNode): Point => ({ x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 });

/** Where the line from the node's centre towards `target` leaves the node's rectangle. */
function border(node: LifecycleNode, target: Point): Point {
  const c = center(node);
  const dx = target.x - c.x;
  const dy = target.y - c.y;
  if (dx === 0 && dy === 0) return c;
  const scale = Math.min(
    dx === 0 ? Infinity : NODE_W / 2 / Math.abs(dx),
    dy === 0 ? Infinity : NODE_H / 2 / Math.abs(dy),
  );
  return { x: c.x + dx * scale, y: c.y + dy * scale };
}

interface Props {
  title: string;
  lifecycle: Lifecycle;
  /** Id of the node the stored data is currently in. */
  current: string;
}

export function LifecycleDiagram({ title, lifecycle, current }: Props) {
  const uid = useId();
  const markerId = `${uid}-arrow`;
  const byId = new Map(lifecycle.nodes.map((n) => [n.id, n]));
  const width = lifecycle.width + PAD * 2;
  const height = lifecycle.height + PAD * 2;

  return (
    <div className="diagram">
      <div
        className="diagram-scroll"
        role="region"
        aria-label={`${title} diagram, scrollable`}
        tabIndex={0}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${title} lifecycle. Currently: ${byId.get(current)?.label ?? current}. A table with the same information follows.`}
          className="diagram-svg"
        >
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10z" className="diagram-arrow" />
            </marker>
          </defs>
          <g transform={`translate(${PAD} ${PAD})`}>
            {lifecycle.edges.map((edge) => {
              const from = byId.get(edge.from);
              const to = byId.get(edge.to);
              if (!from || !to) return null;
              const a = border(from, center(to));
              const b = border(to, center(from));
              const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className="diagram-edge"
                    markerEnd={`url(#${markerId})`}
                  />
                  <text x={mid.x} y={mid.y - 6} textAnchor="middle" className="diagram-edge-label">
                    {edge.label}
                  </text>
                </g>
              );
            })}
            {lifecycle.nodes.map((node) => {
              const active = node.id === current;
              return (
                <g key={node.id} className={active ? 'diagram-node is-current' : 'diagram-node'}>
                  <rect x={node.x} y={node.y} width={NODE_W} height={NODE_H} rx="8" />
                  <text
                    x={node.x + NODE_W / 2}
                    y={node.y + (active ? 23 : 32)}
                    textAnchor="middle"
                    className="diagram-node-label"
                  >
                    {node.label}
                  </text>
                  {active ? (
                    <text
                      x={node.x + NODE_W / 2}
                      y={node.y + 42}
                      textAnchor="middle"
                      className="diagram-node-tag"
                    >
                      ● current
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <table className="diagram-table">
        <caption>Text version of the diagram</caption>
        <thead>
          <tr>
            <th scope="col">From</th>
            <th scope="col">Event</th>
            <th scope="col">To</th>
          </tr>
        </thead>
        <tbody>
          {lifecycle.edges.map((edge) => (
            <tr key={`${edge.from}-${edge.to}`}>
              <td>{byId.get(edge.from)?.label}</td>
              <td>{edge.label}</td>
              <td>{byId.get(edge.to)?.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="diagram-current">
        Stored data is currently in: <strong>{byId.get(current)?.label ?? current}</strong>
      </p>
    </div>
  );
}
