const { chromium } = require('playwright');
const fs = require('fs');

// IIFE
(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 100 });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://bmi-dashboard.netlify.app/");

    await page.focus('//input[@placeholder="Pounds..."]');
    await page.click('//input[@placeholder="Pounds..."]');
    await page.fill('//input[@placeholder="Pounds..."]', '178');

    await page.focus('//input[@placeholder="Inches..."]');
    await page.click('//input[@placeholder="Inches..."]');
    await page.fill('//input[@placeholder="Inches..."]', '69');

    const calcButton = await page.$('//button[text()="Calculate"]');
    calcButton.click();

    await new Promise(r => setTimeout(r, 2000));

    page.mainFrame()
        .waitForSelector('//div[@id="bmi"]//b')
        .then(() => console.log("BMI selector was found"))
        .catch((e) => console.log("BMI selector was not found."));

    const result = await page.$$('//div[@class="indexcol"]');
    var values = [];
    for (const res of result) {
        const label = await page.evaluate(el => el.innerText, res);
        values.push(label);

    }

    // Array Destructuring
    const [bmi, calIntake, calBurn, comments] = values;

    console.log(bmi, calIntake, calBurn, comments);

    // String Interpolation
    fs.writeFile('report.txt', `BMI Report\n\nYour BMI is ${bmi}., 
                \nCalorie Intake is supposed to be ${calIntake}.
                \nCalorie Burn is supposed to be ${calBurn}.
                \n${comments}`, function (err) {
        if (err) return console.error(err);
        console.log("Added the results to the report.");
    }
    );
    await browser.close();
})();