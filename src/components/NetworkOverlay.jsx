/* Faint SVG network topology — DevOps/cloud themed, zero JS overhead */
export default function NetworkOverlay() {
  /* Node positions as % of viewport */
  const nodes = [
    { x:8,  y:15, label:"GCP"        },
    { x:22, y:35, label:"K8s"        },
    { x:40, y:12, label:"Terraform"  },
    { x:58, y:28, label:"Jenkins"    },
    { x:75, y:10, label:"Docker"     },
    { x:90, y:30, label:"Ansible"    },
    { x:15, y:60, label:"IAM"        },
    { x:35, y:70, label:"VPC"        },
    { x:55, y:58, label:"GKE"        },
    { x:72, y:72, label:"Grafana"    },
    { x:88, y:55, label:"Prometheus" },
    { x:28, y:88, label:"Git"        },
    { x:62, y:85, label:"Maven"      },
    { x:82, y:88, label:"SRE"        },
  ];

  /* Connections (index pairs) */
  const edges = [
    [0,1],[0,2],[1,3],[2,3],[3,4],[4,5],
    [1,6],[6,7],[7,8],[8,9],[9,10],
    [5,10],[3,8],[2,7],[6,11],[11,12],[12,13],[10,13],
    [0,8],[4,9],[7,11],
  ];

  return (
    <div aria-hidden="true" style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
      <svg width="100%" height="100%" style={{ opacity:0.045 }} preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map(([a, b], i) => (
          <line key={i}
            x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
            x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
            stroke="#89AACC" strokeWidth="0.5"
            style={{
              animation:`edgePulse ${4 + (i % 4)}s ease-in-out infinite alternate`,
              animationDelay:`${(i * 0.3) % 3}s`
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={`${n.x}%`} cy={`${n.y}%`} r="2.5"
              fill="none" stroke="#89AACC" strokeWidth="0.75"
              style={{
                animation:`nodePulse ${3 + (i % 3)}s ease-in-out infinite alternate`,
                animationDelay:`${(i * 0.4) % 2}s`
              }}
            />
            <circle cx={`${n.x}%`} cy={`${n.y}%`} r="1"
              fill="#89AACC"
              style={{ animation:`nodePulse ${3 + (i % 3)}s ease-in-out infinite alternate`, animationDelay:`${(i * 0.4) % 2}s` }}
            />
          </g>
        ))}
      </svg>

      <style>{`
        @keyframes edgePulse { 0%{opacity:0.3} 100%{opacity:1} }
        @keyframes nodePulse { 0%{opacity:0.4;r:1.5} 100%{opacity:1;r:3} }
      `}</style>
    </div>
  );
}
