import { describe, expect, it } from "vitest";
import { CASE_STUDIES, CASE_STUDY_ORDER } from "./caseStudies";
import { CASE_STUDY_SLUGS } from "../lib/paths";

describe("case studies", () => {
  it("keeps routes and content in sync", () => {
    expect([...CASE_STUDY_ORDER].sort()).toEqual([...CASE_STUDY_SLUGS].sort());
  });

  it("numbers studies by position", () => {
    CASE_STUDY_ORDER.forEach((slug, i) => {
      expect(CASE_STUDIES[slug].number).toBe(String(i + 1).padStart(2, "0"));
    });
  });

  it("has unique section keys and valid architecture links", () => {
    for (const study of Object.values(CASE_STUDIES)) {
      const keys = study.sections.map(section => section.key);
      expect(new Set(keys).size).toBe(keys.length);
      for (const section of study.sections.filter(s => s.type === "architecture")) {
        const ids = new Set(section.nodes.map(node => node.id));
        expect(ids.has(section.activeNode)).toBe(true);
        section.links.forEach(([a, b]) => { expect(ids.has(a) && ids.has(b)).toBe(true); });
      }
    }
  });
});
