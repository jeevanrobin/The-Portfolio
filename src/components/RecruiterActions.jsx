const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/medida-jeevan-reddy-2673aa176/", external: true },
  { label: "GitHub", href: "https://github.com/jeevanrobin", external: true },
  { label: "Email", href: "mailto:medidajeevanreddy499@gmail.com" },
];

export default function RecruiterActions({ compact = false }) {
  return (
    <nav className={`recruiter-actions${compact ? " is-compact" : ""}`} aria-label="Professional links">
      {LINKS.map(link => (
        <a
          key={link.label}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
        >
          {link.label}{link.external ? <span aria-hidden="true"> ↗</span> : null}
          {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </a>
      ))}
    </nav>
  );
}
