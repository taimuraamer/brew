import 'testcafe';
import { Signup } from './page-models/Signup';
const url = 'https://test.brewoptix.com/session/sign-up';
const dataSet = require('./data.json');
const sign = new Signup();

fixture('Signup').page(url) 

.beforeEach(async t => {

    t.fixtureCtx.randomEmail = `test+${Math.floor(Math.random() * 1000)}@gmail.com`; // generates random email 
})
dataSet.forEach(data => {
test('shoud be able to Signup with Retailer', async (t) => {
    await sign.maximizeWindow();
    await sign.selectUserType('retailer');
    await sign.fillUserInfo(data.name, t.fixtureCtx.randomEmail, data.password, data.company);
    await sign.clickSignup();
    await sign.verifySignup();

});

test('shoud be able to Signup with Distributor', async (t) => {
    await sign.maximizeWindow();
    await sign.selectUserType('distributor');
    await sign.fillUserInfo(data.name, t.fixtureCtx.randomEmail, data.password, data.company);
    await sign.clickSignup();
    await sign.verifySignup();
});

test('shoud be able to Signup with Supplier', async (t) => {
    await sign.maximizeWindow();
    await sign.selectUserType('supplier');
    await sign.fillUserInfo(data.name, t.fixtureCtx.randomEmail, data.password, data.company);
    await sign.fillPaymentDetails(
        data.address1,
        data.address2,
        data.city,
        data.state,
        data.postalCode,
        data.phone,
        data.cardNumber,
        data.expirey,
        data.CVC,
        data.zip,
    );
    await sign.clickSignup();
    await sign.verifySignup();
});

test('shoud NOT be able to Signup with Distributor Name Empty', async (t) => {
    await sign.maximizeWindow();
    await sign.selectUserType('distributor');
    await sign.fillHalfInfo(t.fixtureCtx.randomEmail, data.password, data.company);
    await sign.verifySignupBtnDisabled();
});

});
