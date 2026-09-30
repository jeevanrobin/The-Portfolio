import { useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

export default function CaseStudyArchitecture({
  activeNode,
  nodes,
  links,
  title,
  description,
  headerLabel = "Architecture map",
  headerMeta = "Conceptual map",
  disclosure,
}) {
  const reducedMotion = useReducedMotion();
  const [focusedNode, setFocusedNode] = useState(null);
  const selected = focusedNode || activeNode;
  const nodeById = Object.fromEntries(nodes.map(node => [node.id, node]));

  return (
    <div className={`case-architecture${reducedMotion ? " is-static" : ""}`}>
      <div className="case-architecture-header">
        <span>{headerLabel}</span>
        <span>{headerMeta}</span>
      </div>
      <svg className="case-architecture-svg" viewBox="0 0 100 100" role="img" aria-labelledby="architecture-title architecture-description">
        <title id="architecture-title">{title}</title>
        <desc id="architecture-description">{description}</desc>
        {links.map(([from, to]) => {
          const start = nodeById[from];
          const end = nodeById[to];
          const highlighted = selected === from || selected === to;
          return <line key={`${from}-${to}`} className={highlighted ? "is-highlighted" : ""} x1={start.x} y1={start.y} x2={end.x} y2={end.y} />;
        })}
        {nodes.map(node => (
          <g key={node.id} className={`case-architecture-node${selected === node.id ? " is-selected" : ""}`}>
            <circle cx={node.x} cy={node.y} r="2.2" />
            <text x={node.x} y={node.y - 5} textAnchor="middle">{node.label}</text>
          </g>
        ))}
      </svg>
      <div className="case-architecture-controls" aria-label="Architecture elements">
        {nodes.map(node => (
          <button
            type="button"
            key={node.id}
            className={selected === node.id ? "is-selected" : ""}
            onFocus={() => setFocusedNode(node.id)}
            onBlur={() => setFocusedNode(null)}
            onMouseEnter={() => setFocusedNode(node.id)}
            onMouseLeave={() => setFocusedNode(null)}
          >
            {node.label}
          </button>
        ))}
      </div>
      {disclosure && <p className="case-study-disclosure architecture-disclosure">{disclosure}</p>}
    </div>
  );
}
