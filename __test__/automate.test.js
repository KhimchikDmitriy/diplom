const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

test("webTest", async () => {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get("http://localhost:80/");
    await driver.executeScript("window.scrollBy(0, 1300);");
    await driver.sleep(1000);
    const vk = driver.findElement(By.css("button.btn:nth-child(3)"));
    await vk.click();
    await driver.sleep(1000);
    const vkClose = driver.findElement(
      By.css(
        "#vk > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2)"
      )
    );
    await vkClose.click();
    await driver.executeScript("window.scrollBy(0, -1300);");
    await driver.sleep(1000);
    const oursWorks = driver.findElement(
      By.xpath("//html//body//nav//div//div//ul//li[1]//a")
    );
    await oursWorks.click();
    await driver.sleep(1000);
    const feedback = driver.findElement(
      By.xpath("//*[@id='navbarNav']//ul//li[2]//button")
    );
    await feedback.click();
    await driver.wait(
      until.elementLocated(By.xpath("//*[@id='navbarNav']//ul//li[2]//button")),
      20000
    );
    await driver.sleep(1000);
    const feedbackName = driver.findElement(By.css("#name"));
    await feedbackName.sendKeys("name");
    await driver.sleep(1000);
    const feedbackEmail = driver.findElement(By.css("#email"));
    await feedbackEmail.sendKeys("email@email.email");
    await driver.sleep(1000);
    const feedbackMessage = driver.findElement(By.css("#message"));
    await feedbackMessage.sendKeys("message");
    await driver.sleep(1000);
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
    await driver.sleep(1000);
    const login = driver.findElement(
      By.css("li.nav-item:nth-child(3) > button:nth-child(1)")
    );
    await login.click();
    await driver.sleep(1000);
    const register = driver.findElement(
      By.css(
        "#login > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1)"
      )
    );
    await register.click();
    await driver.wait(until.elementLocated(By.css("#floatingTextarea")), 20000);
    await driver.sleep(1000);
    const registerName = driver.findElement(By.css("#floatingTextarea"));
    await registerName.sendKeys("name");
    await driver.sleep(1000);
    const registerEmail = driver.findElement(
      By.css(
        "#registerForm > div:nth-child(2) > div:nth-child(1) > input:nth-child(1)"
      )
    );
    await registerEmail.sendKeys("email@email.email");
    await driver.sleep(1000);
    const registerPass = driver.findElement(
      By.css(
        "#registerForm > div:nth-child(3) > div:nth-child(1) > input:nth-child(1)"
      )
    );
    await registerPass.sendKeys("2486159753");
    await driver.sleep(1000);
    const logIn = driver.findElement(
      By.xpath("//*[@id='registerForm']/div[4]/div/button")
    );
    await logIn.click();
    await driver.wait(
      until.elementLocated(By.css("li.nav-item:nth-child(3) > a:nth-child(1)")),
      20000
    );
    await driver.sleep(1000);
    const chat = driver.findElement(
      By.css("li.nav-item:nth-child(3) > a:nth-child(1)")
    );
    await chat.click();
    await driver.wait(until.elementLocated(By.css("#body")), 20000);
    await driver.sleep(1000);
    const messageChat = driver.findElement(By.css("#body"));
    await messageChat.sendKeys("Здравствуйте");
    await driver.sleep(1000);
    const messageChatSend = driver.findElement(
      By.css(".messGo > button:nth-child(2)")
    );
    await messageChatSend.click();
    await driver.sleep(1000);
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
    await driver.sleep(1000);
    const loginAdmin = driver.findElement(
      By.css("li.nav-item:nth-child(3) > button:nth-child(1)")
    );
    await loginAdmin.click();
    await driver.sleep(1000);
    const loginEmailAdmin = driver.findElement(
      By.css(
        "#login > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)"
      )
    );
    await loginEmailAdmin.sendKeys("admin@ad.net");
    await driver.sleep(1000);
    const loginPasswordAdmin = driver.findElement(
      By.css(
        "#login > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > input:nth-child(1)"
      )
    );
    await loginPasswordAdmin.sendKeys("admin@ad.net");
    await driver.sleep(1000);
    const logInAdmin = driver.findElement(
      By.css(
        "#login > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(1)"
      )
    );
    await logInAdmin.click();
    await driver.sleep(1000);
    const chatAdmin = driver.findElement(
      By.css("li.nav-item:nth-child(3) > a:nth-child(1)")
    );
    await chatAdmin.click();
    await driver.sleep(1000);
    const selectUser = driver.findElement(
      By.css("body > form:nth-child(5) > select:nth-child(1)")
    );
    await selectUser.click();
    await driver.sleep(1000);
    const user1 = driver.findElement(
      By.css(
        "body > form:nth-child(5) > select:nth-child(1) > option:nth-child(5)"
      )
    );
    await user1.click();
    await driver.sleep(1000);
    const user1Select = driver.findElement(By.css("input.btn"));
    await user1Select.click();
    const selectUser2 = driver.findElement(
      By.css("body > form:nth-child(5) > select:nth-child(1)")
    );
    await selectUser2.click();
    await driver.sleep(1000);
    const user2 = driver.findElement(
      By.css(
        "body > form:nth-child(5) > select:nth-child(1) > option:nth-child(7)"
      )
    );
    await user2.click();
    const user2Select = driver.findElement(By.css("input.btn"));
    await user2Select.click();
    await driver.sleep(1000);
    const messageChatAdmin = driver.findElement(By.css("#body"));
    await messageChatAdmin.sendKeys("Здравствуйте");
    await driver.sleep(1000);
    const messageChatAdminSend = driver.findElement(
      By.css(".messGo > button:nth-child(2)")
    );
    await messageChatAdminSend.click();
    await driver.sleep(1000);
    const ourWork = driver.findElement(
      By.css("li.nav-item:nth-child(1) > a:nth-child(1)")
    );
    await ourWork.click();
    await driver.sleep(1000);
    const createWork = driver.findElement(
      By.css(
        "div.container > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > button:nth-child(1)"
      )
    );
    await createWork.click();
    await driver.sleep(1000);
    const createWorkName = driver.findElement(By.css("#body"));
    await createWorkName.sendKeys("Тестовое название");
    await driver.sleep(1000);
    const close = driver.findElement(
      By.css(
        "#createPost > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2)"
      )
    );
    await close.click();
    await driver.sleep(1000);
    const logoutAdmin = driver.findElement(
      By.css("li.nav-item:nth-child(4) > a:nth-child(1)")
    );
    await logoutAdmin.click();
  } finally {
    await driver.close();
  }
}, 300000);
