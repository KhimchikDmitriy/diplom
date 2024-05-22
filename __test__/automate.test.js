const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

test("should", async () => {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get("https://dnd.su/");
    const login = driver.findElement(
      By.css(
        "#aside > nav > ul > li:nth-child(7) > ul > li.item_level_2.form-auth > form > div > div:nth-child(1) > div > div > input"
      )
    );
    await login.sendKeys("dimahima");
    const pass = driver.findElement(
      By.css(
        "div.col-24:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)"
      )
    );
    await pass.sendKeys("2486159753");
    const signIn = driver.findElement(By.css("input.btn"));
    await signIn.click();
    await driver.wait(
      until.elementLocated(By.css(".profile__avatar-img")),
      20000
    );
    expect(await driver.getTitle()).toContain("Онлайн-справочник D&D 5");
    const profile = driver.findElement(By.css(".profile__avatar-img"));
    await profile.click();
  } finally {
    await driver.close();
  }
}, 50000);
