import { forwardRef } from "react";

const SpotlightProjectCard = forwardRef(function SpotlightProjectCard({ children, className = "", href, ...props }, forwardedRef) {
  const updateSpotlight = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  const Component = href ? "a" : "article";

  return (
    <Component
      ref={forwardedRef}
      {...props}
      href={href}
      className={`project-spotlight-card ${className}`}
      onPointerMove={updateSpotlight}
    >
      <div className="project-spotlight" aria-hidden="true" />
      {children}
    </Component>
  );
});

export default SpotlightProjectCard;
