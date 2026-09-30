import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const SLUGS = [
  "cloud-armor-load-balancing",
  "cicd-release-pipeline",
  "disaster-recovery-reliability",
  "infrastructure-as-code",
];

// Fail on any script error or failed same-origin request.
function trackProblems(page) {
  const problems = [];
  page.on("pageerror", error => problems.push(`pageerror: ${error.message}`));
  page.on("response", response => {
    if (response.url().startsWith("http://localhost") && response.status() >= 400) problems.push(`${response.status()} ${response.url()}`);
  });
  return problems;
}

test("home page renders and the resume is downloadable", async ({ page, request }) => {
  const problems = trackProblems(page);
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Jeevan");
  await expect(page.locator("a[href$='resume.pdf']").first()).toBeVisible();
  const pdf = await request.get("resume.pdf");
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect(problems).toEqual([]);
});

for (const slug of SLUGS) {
  test(`case study ${slug} loads directly and links onward`, async ({ page }) => {
    const problems = trackProblems(page);
    await page.goto(`case-studies/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page).toHaveTitle(/Jeevan Reddy/);
    const hrefs = await page.locator(".case-study-navigation a").evaluateAll(links => links.map(a => a.getAttribute("href")));
    expect(hrefs.every(href => href.startsWith("/The-Portfolio/"))).toBe(true);
    expect(problems).toEqual([]);
  });
}

test("GitHub Pages redirect query restores the real URL", async ({ page }) => {
  await page.goto("?/case-studies/cicd-release-pipeline");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("CI/CD");
  expect(new URL(page.url()).pathname).toBe("/The-Portfolio/case-studies/cicd-release-pipeline");
});

test("every project card links to an existing case study", async ({ page }) => {
  await page.goto("./");
  const hrefs = await page.locator("a.project-spotlight-card").evaluateAll(links => links.map(a => a.getAttribute("href")));
  expect(hrefs).toHaveLength(SLUGS.length);
  for (const href of hrefs) expect(SLUGS.some(slug => href.endsWith(slug))).toBe(true);
});

for (const viewport of [{ name: "desktop", width: 1280, height: 900 }, { name: "mobile", width: 390, height: 844 }]) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height }, contextOptions: { reducedMotion: "reduce" } });

    for (const path of ["./", ...SLUGS.map(slug => `case-studies/${slug}`)]) {
      test(`${path} has no serious accessibility violations`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState("load");
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
        const serious = results.violations.filter(v => ["serious", "critical"].includes(v.impact));
        expect(serious.map(v => `${v.id}: ${v.nodes.slice(0, 3).map(n => n.target.join(" ")).join(" | ")}`)).toEqual([]);
      });

      test(`${path} does not scroll horizontally`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState("load");
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(1);
      });
    }
  });
}

test.describe("smooth scrolling", () => {
  test("wheel scrolling is eased and nav clicks land on the section", async ({ page }) => {
    await page.goto("./");
    await expect(page.locator("html")).toHaveClass(/lenis/);
    await page.mouse.move(600, 400);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(150);
    const mid = await page.evaluate(() => window.scrollY);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(570); // still easing toward its target
    await page.getByRole("navigation").getByText("Skills", { exact: true }).first().click();
    await expect.poll(() => page.evaluate(() => Math.round(document.getElementById("skills").getBoundingClientRect().top)), { timeout: 5000 }).toBe(80);
  });

  test("case-study index links land on their section", async ({ page }) => {
    await page.goto("case-studies/cicd-release-pipeline");
    await page.locator(".case-study-index a").nth(3).click();
    await expect.poll(() => page.evaluate(() => Math.round(document.getElementById("cicd-release-pipeline-architecture").getBoundingClientRect().top)), { timeout: 5000 }).toBe(80);
  });

  test("hero parallax responds to scroll", async ({ page }) => {
    await page.goto("./");
    await page.evaluate(() => window.scrollTo(0, 400));
    await expect.poll(() => page.evaluate(() => document.querySelector(".hero-parallax-bg").style.transform)).toContain("120px");
  });

  test.describe("reduced motion", () => {
    test.use({ contextOptions: { reducedMotion: "reduce" } });

    test("uses native scrolling and no parallax", async ({ page }) => {
      await page.goto("./");
      await expect(page.locator("html")).not.toHaveClass(/lenis/);
      await page.getByRole("navigation").getByText("Skills", { exact: true }).first().click();
      await expect.poll(() => page.evaluate(() => Math.round(document.getElementById("skills").getBoundingClientRect().top))).toBe(80);
      expect(await page.evaluate(() => document.querySelector(".hero-parallax-bg").style.transform)).toBe("");
    });
  });
});
