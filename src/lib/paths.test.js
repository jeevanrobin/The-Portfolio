import { describe, expect, it } from "vitest";
import { caseStudyHref, matchCaseStudy, stripBase, withBase } from "./paths";

describe("paths", () => {
  it("prefixes the deploy base", () => {
    expect(withBase("/resume.pdf", "/The-Portfolio/")).toBe("/The-Portfolio/resume.pdf");
    expect(withBase("#works", "/")).toBe("/#works");
    expect(caseStudyHref("gcp-cloud-architecture", "/The-Portfolio/")).toBe("/The-Portfolio/case-studies/gcp-cloud-architecture");
  });

  it("strips the deploy base from pathnames", () => {
    expect(stripBase("/The-Portfolio/", "/The-Portfolio/")).toBe("/");
    expect(stripBase("/The-Portfolio", "/The-Portfolio/")).toBe("/");
    expect(stripBase("/The-Portfolio/case-studies/x/", "/The-Portfolio/")).toBe("/case-studies/x");
    expect(stripBase("/case-studies/x", "/")).toBe("/case-studies/x");
    expect(stripBase("/", "/")).toBe("/");
  });

  it("matches only known case-study routes", () => {
    expect(matchCaseStudy("/case-studies/cicd-pipeline-platform")).toBe("cicd-pipeline-platform");
    expect(matchCaseStudy("/case-studies/nope")).toBeNull();
    expect(matchCaseStudy("/")).toBeNull();
  });
});
