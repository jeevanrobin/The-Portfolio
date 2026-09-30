// Deploy-base aware URL helpers. Vite guarantees BASE_URL ends with "/".
export const BASE = import.meta.env.BASE_URL;

export const CASE_STUDY_SLUGS = [
  "gcp-cloud-architecture",
  "cicd-pipeline-platform",
  "kubernetes-orchestration",
  "infrastructure-as-code",
];

export function withBase(path = "", base = BASE) {
  return base + path.replace(/^\//, "");
}

export function caseStudyHref(slug, base = BASE) {
  return withBase(`case-studies/${slug}`, base);
}

// "/The-Portfolio/case-studies/x/" -> "/case-studies/x"
export function stripBase(pathname, base = BASE) {
  let path = pathname;
  const root = base.replace(/\/$/, "");
  if (root && (path === root || path.startsWith(`${root}/`))) path = path.slice(root.length);
  return path.replace(/\/+$/, "") || "/";
}

export function matchCaseStudy(route) {
  const match = /^\/case-studies\/([^/]+)$/.exec(route);
  return match && CASE_STUDY_SLUGS.includes(match[1]) ? match[1] : null;
}
