const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

test("should", async () => {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get("http://localhost:80/");
    await driver.executeScript("window.scrollBy(0, 1300);");
    await driver.sleep(500);
    const vk = driver.findElement(By.css("button.btn:nth-child(3)"));
    await vk.click();
    await driver.sleep(500);
    const vkClose = driver.findElement(
      By.css(
        "#vk > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2)"
      )
    );
    await vkClose.click();
    await driver.executeScript("window.scrollBy(0, -1300);");
    await driver.sleep(500);
    const oursWorks = driver.findElement(
      By.xpath("//html//body//nav//div//div//ul//li[1]//a")
    );
    await oursWorks.click();
    await driver.sleep(500);
    const feedback = driver.findElement(
      By.xpath("//*[@id='navbarNav']//ul//li[2]//button")
    );
    await feedback.click();
    await driver.wait(
      until.elementLocated(By.xpath("//*[@id='navbarNav']//ul//li[2]//button")),
      20000
    );
    await driver.sleep(500);
    const feedbackName = driver.findElement(By.css("#name"));
    await feedbackName.sendKeys("name");
    await driver.sleep(500);
    const feedbackEmail = driver.findElement(By.css("#email"));
    await feedbackEmail.sendKeys("email@email.email");
    await driver.sleep(500);
    const feedbackMessage = driver.findElement(By.css("#message"));
    await feedbackMessage.sendKeys("message");
    await driver.sleep(500);
    const feedbackClose = driver.findElement(
      By.xpath("//html//body//div[1]//div[4]//div//div//div[1]//button")
    );
    await feedbackClose.click();
    await driver.wait(
      until.elementLocated(
        By.css("li.nav-item:nth-child(3) > button:nth-child(1)")
      ),
      20000
    );
    await driver.sleep(500);
    const login = driver.findElement(
      By.css("li.nav-item:nth-child(3) > button:nth-child(1)")
    );
    await login.click();
    const loginEmail = driver.findElement(
      By.css(
        "#login > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)"
      )
    );
    await loginEmail.sendKeys("name@name.name");
    const loginPassword = driver.findElement(
      By.css(
        "#login > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > input:nth-child(1)"
      )
    );
    await loginPassword.sendKeys("name@name.name");
    const register = driver.findElement(
      By.css(
        "#login > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1)"
      )
    );
    await register.click();
    await driver.wait(until.elementLocated(By.css("#floatingTextarea")), 20000);
    await driver.sleep(500);
    const registerName = driver.findElement(By.css("#floatingTextarea"));
    await registerName.sendKeys("name");
    const registerEmail = driver.findElement(
      By.css(
        "#registerForm > div:nth-child(2) > div:nth-child(1) > input:nth-child(1)"
      )
    );
    await registerEmail.sendKeys("email@email.email");
    const registerPass = driver.findElement(
      By.css(
        "#registerForm > div:nth-child(3) > div:nth-child(1) > input:nth-child(1)"
      )
    );
    await registerPass.sendKeys("2486159753");
    const back = driver.findElement(
      By.css("#registerForm > div:nth-child(5) > button:nth-child(1)")
    );
    await back.click();
    const logIn = driver.findElement(
      By.css(
        "#login > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(1)"
      )
    );
    await logIn.click();
    await driver.wait(
      until.elementLocated(By.css("li.nav-item:nth-child(3) > a:nth-child(1)")),
      20000
    );
    const chat = driver.findElement(
      By.css("li.nav-item:nth-child(3) > a:nth-child(1)")
    );
    await chat.click();
    await driver.wait(until.elementLocated(By.css("#body")), 20000);
    const messageChat = driver.findElement(By.css("#body"));
    await messageChat.sendKeys("проверочный текст");
    await driver.sleep(500);
    const messageChatSend = driver.findElement(
      By.css(".messGo > button:nth-child(2)")
    );
    await messageChatSend.click();
    const messageChatDelete = driver.findElement(
      By.css("div.message:nth-child(5) > p:nth-child(1) > a:nth-child(1)")
    );
    await messageChatDelete.click();
    const logout = driver.findElement(
      By.css("li.nav-item:nth-child(4) > a:nth-child(1)")
    );
    await logout.click();
    await driver.wait(
      until.elementLocated(
        By.css("li.nav-item:nth-child(3) > button:nth-child(1)")
      ),
      20000
    );
    await driver.sleep(500);
    const loginAdmin = driver.findElement(
      By.css("li.nav-item:nth-child(3) > button:nth-child(1)")
    );
    await loginAdmin.click();
    const loginEmailAdmin = driver.findElement(
      By.css(
        "#login > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)"
      )
    );
    await loginEmailAdmin.sendKeys("admin@ad.net");
    const loginPasswordAdmin = driver.findElement(
      By.css(
        "#login > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > input:nth-child(1)"
      )
    );
    await loginPasswordAdmin.sendKeys("admin@ad.net");
    const logInAdmin = driver.findElement(
      By.css(
        "#login > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(1)"
      )
    );
    await logInAdmin.click();
    const chatAdmin = driver.findElement(
      By.css("li.nav-item:nth-child(3) > a:nth-child(1)")
    );
    await chatAdmin.click();
    const selectUser = driver.findElement(
      By.css("body > form:nth-child(5) > select:nth-child(1)")
    );
    await selectUser.click();
    await driver.sleep(500);
    const user1 = driver.findElement(
      By.css(
        "body > form:nth-child(5) > select:nth-child(1) > option:nth-child(5)"
      )
    );
    await user1.click();
    await driver.sleep(500);
    const user1Select = driver.findElement(By.css("input.btn"));
    await user1Select.click();
    const selectUser2 = driver.findElement(
      By.css("body > form:nth-child(5) > select:nth-child(1)")
    );
    await selectUser2.click();
    await driver.sleep(500);
    const user2 = driver.findElement(
      By.css(
        "body > form:nth-child(5) > select:nth-child(1) > option:nth-child(7)"
      )
    );
    await user2.click();
    const user2Select = driver.findElement(By.css("input.btn"));
    await user2Select.click();
    await driver.sleep(500);
    const ourWork = driver.findElement(
      By.css("li.nav-item:nth-child(1) > a:nth-child(1)")
    );
    await ourWork.click();
    const createWork = driver.findElement(
      By.css(
        "div.container > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > button:nth-child(1)"
      )
    );
    await createWork.click();
    const createWorkName = driver.findElement(By.css("#body"));
    await createWorkName.sendKeys("Тестовое название");
    const close = driver.findElement(
      By.css(
        "#createPost > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2)"
      )
    );
    await close.click();
    await driver.sleep(500);
    const logoutAdmin = driver.findElement(
      By.css("li.nav-item:nth-child(4) > a:nth-child(1)")
    );
    await logoutAdmin.click();
  } finally {
  }
}, 300000);
