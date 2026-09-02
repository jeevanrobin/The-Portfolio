import { useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

const DEFAULT_NODES = [
  { id: "terraform", label: "Terraform", x: 12, y: 50 },
  { id: "regions", label: "Multi-region infrastructure", x: 42, y: 28 },
  { id: "peering", label: "VPC peering", x: 42, y: 72 },
  { id: "armor", label: "Cloud Armor WAF", x: 76, y: 28 },
  { id: "failover", label: "Automated failover", x: 76, y: 72 },
];

const DEFAULT_LINKS = [
  ["terraform", "regions"],
  ["terraform", "peering"],
  ["regions", "armor"],
  ["peering", "failover"],
];

export default function CaseStudyArchitecture({
  activeNode = "regions",
  nodes = DEFAULT_NODES,
  links = DEFAULT_LINKS,
  title = "GCP Cloud Architecture conceptual map",
  description = "A documented relationship between Terraform, multi-region infrastructure, VPC peering, Cloud Armor WAF, and automated failover.",
  headerLabel = "Architecture map",
  headerMeta = "Documented scope",
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
