import { expect, test } from "@playwright/test";
import { APP_BASE, seedPlayerName } from "./test-helpers";

test.describe("Rock Paper Scissors", () => {
  test.beforeEach(async ({ page }) => {
    await seedPlayerName(page, "Kymani");
  });

  test("loads initial state", async ({ page }) => {
    await page.goto(`${APP_BASE}/rps`);

    await expect(
      page.getByRole("heading", { name: "Rock Paper Scissors" }),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: /rock/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /paper/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /scissors/i }),
    ).toBeVisible();

    await expect(page.locator("#score-player")).toHaveText("0");
    await expect(page.locator("#score-cpu")).toHaveText("0");
    await expect(page.locator("#score-ties")).toHaveText("0");
    await expect(page.getByText("No rounds played yet.")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "High Score" }),
    ).toBeVisible();
  });

  test("playing a round updates scoreboard and history", async ({ page }) => {
    await page.goto(`${APP_BASE}/rps`);

    await page.getByRole("button", { name: /rock/i }).click();

    const historyItems = page.locator("#history li:not(.history-empty)");
    await expect(historyItems).toHaveCount(1);

    const player = await page.locator("#score-player").textContent();
    const cpu = await page.locator("#score-cpu").textContent();
    const ties = await page.locator("#score-ties").textContent();
    expect(Number(player) + Number(cpu) + Number(ties)).toBe(1);
  });

  test("reset game clears scoreboard and history", async ({ page }) => {
    await page.goto(`${APP_BASE}/rps`);

    await page.getByRole("button", { name: /rock/i }).click();
    await page.getByRole("button", { name: /paper/i }).click();

    await expect(
      page.locator("#history li:not(.history-empty)"),
    ).toHaveCount(2);

    await page.getByRole("button", { name: "Reset Game" }).click();

    await expect(page.locator("#score-player")).toHaveText("0");
    await expect(page.locator("#score-cpu")).toHaveText("0");
    await expect(page.locator("#score-ties")).toHaveText("0");
    await expect(page.getByText("No rounds played yet.")).toBeVisible();
  });

  test("back navigation button returns to lobby", async ({ page }) => {
    await page.goto(`${APP_BASE}/rps`);

    await page
      .getByRole("button", { name: /back to lobby/i })
      .click();

    await expect(page).toHaveURL(new RegExp(`${APP_BASE}/?$`));
  });

  test("page loads cleanly with malformed localStorage data", async ({
    page,
  }) => {
    await page.goto(`${APP_BASE}/`);
    await page.evaluate(() => {
      localStorage.setItem("rpsSettings", "not-valid-json");
      localStorage.setItem("rpsHighScore", "{broken");
    });

    await page.goto(`${APP_BASE}/rps`);
    await expect(
      page.getByRole("heading", { name: "Rock Paper Scissors" }),
    ).toBeVisible();
  });
});
