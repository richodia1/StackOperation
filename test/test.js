const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');
var driver;

let container, prev, next, indicators, slide;

const options = new chrome.Options();
options.addArguments(
    'headless'
);

describe('Stack operation test', function() {
    this.timeout(100000);

    before(function(done) {
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        driver.get('http://localhost:8000')
            .then(() => {
                done();
            });
    });

    after(function() {
        driver.quit();
    })

    beforeEach(async function() {
        driver.navigate().refresh();
        push = await driver.findElement(By.className("push-btn"));
        // pop = await driver.findElement(By.className("pop-btn"));
        peek = await driver.findElement(By.className("peek-btn"));
        empty = await driver.findElement(By.className("empty-btn"));
        // swap = await driver.findElement(By.className("swap-btn"));
        input = await driver.findElement(By.id("inputElem"));
        item1 = await driver.findElement(By.id("1"));
        item2 = await driver.findElement(By.id("2"));
        item3 = await driver.findElement(By.id("3"));
        item4 = await driver.findElement(By.id("4"));
        item5 = await driver.findElement(By.id("5"));
    })


    // it('should test load the page', async function() {
    //     let page = await driver.getPageSource();
    //     driver.takeScreenshot().then(
    //         function(image, err) {
    //             require('fs').writeFile('initial-view.png', image, 'base64', function(err) {});
    //         }
    //     );
    // });

    it('Clicking on the push button should push the item to the bottom of the stack board', async function() {
        input.sendKeys("item1");
        push.click();
        let item1Text = await item1.getAttribute('innerText');
        expect(item1Text).to.equal('item1');
        driver.takeScreenshot().then(
            function(image, err) {
                require('fs').writeFile('initial-view.png', image, 'base64', function(err) {});
            }
        );
    });

    it('Without any input clicking on push button should show alert “Please input a value”', async function() {
        input.sendKeys("");
        push.click();
        let alertText = await driver.switchTo().alert().getText();
        await driver.switchTo().alert().dismiss();
        expect(alertText).to.equal('Please enter a value!')
    });

    it('peek button click should show an alert message “operation not allowed” if the stack board is empty.', async function() {
        peek.click();
        let alertText = await driver.switchTo().alert().getText();
        await driver.switchTo().alert().dismiss();
        expect(alertText).to.equal('Operation not allowed!')
    });

    it('Clicking on the “empty” button should show alert whether the stack is empty or not.', async function() {
        empty.click();
        let alertText = await driver.switchTo().alert().getText();
        await driver.switchTo().alert().dismiss();
        expect(alertText).to.equal('Yes, Stack is empty')

        input.sendKeys("item1");
        push.click();
        empty.click();
        let alertText1 = await driver.switchTo().alert().getText();
        await driver.switchTo().alert().dismiss();
        expect(alertText1).to.equal('No, Stack is not empty')
    });

    it('Clicking on the peek button should return the item on the top of the stack, without removing it.', async function() {
        input.sendKeys("item1");
        push.click();
        input.sendKeys("item2");
        push.click();
        peek.click();
        let alertText1 = await driver.switchTo().alert().getText();
        await driver.switchTo().alert().dismiss();
        expect(alertText1).to.equal('Top Value is: item2')
    });

    it('While pushing an item if stack board is full should show the alert message “Stack was already full!” and there is no change in the existing stack.', async function() {
        input.sendKeys("item1");
        push.click();
        input.sendKeys("item2");
        push.click();
        input.sendKeys("item3");
        push.click();
        input.sendKeys("item4");
        push.click();
        input.sendKeys("item5");
        push.click();
        input.sendKeys("item6");
        push.click();

        let alertText1 = await driver.switchTo().alert().getText();
        await driver.switchTo().alert().dismiss();
        expect(alertText1).to.equal('Stack was already full!')
        driver.takeScreenshot().then(
            function(image, err) {
                require('fs').writeFile('stack_full.png', image, 'base64', function(err) {});
            }
        );
    });


});