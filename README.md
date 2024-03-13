## README

#####  在backpack人工刷交易量的油猴脚本
- 安装 tampermonkey 浏览器插件https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
- 第二步，打开插件，创建新的脚本
- 在创建页面，把脚本完全粘贴进去，默认的模版不要，然后保存。

``` typescript
// ==UserScript==
// @name         刷backpack 交易量
// @namespace    http://tampermonkey.net/
// @version      2024-03-08
// @description  try to take over the world!
// @author       BerryBai
// @match        https://backpack.exchange/trade/SOL_USDC
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

let count = 0;

function getWaitSeconds() {
  // 随机生成500到3000的数字
  return Math.floor(Math.random() * 1000 + 100);
}

function getSwitchSeconds() {
  // 随机生成500到3000的数字
  return Math.floor(Math.random() * 2500 + 500);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function findDomByText(text, tag, no) {
  const matches = [];
  for (const div of document.querySelectorAll(tag)) {
    if (div.textContent === text) {
      matches.push(div);
    }
  }
  return matches[no] ?? matches[0];
}

async function buySol() {
  // 先点击买
  const buyDom = findDomByText("Buy", "p", 0);
  // console.log("BuyDom", buyDom);
  buyDom && buyDom.click();
  await sleep(getWaitSeconds());

  // 然后点击市价单
  const marketDom = findDomByText("Market", "p", 0);
  // console.log("marketDom", marketDom);
  marketDom && marketDom.click();
  await sleep(getWaitSeconds());

  // 然后点击最大
  const maxDom = findDomByText("Max", "div", 0);
  // console.log("maxDom", maxDom);
  maxDom && maxDom.click();
  await sleep(getWaitSeconds());

  // 买入
  const buyButtonDom = findDomByText("Buy", "button", 0);
  // console.log("buyButtonDom", buyButtonDom);
  buyButtonDom && buyButtonDom.click();
}

async function sellSol() {
  const sellDom = findDomByText("Sell", "p", 0);
  // console.log("sellDom", sellDom);
  sellDom && sellDom.click();
  await sleep(getWaitSeconds());

  // 然后点击市价单
  const marketDom = findDomByText("Market", "p", 0);
  // console.log("marketDom", marketDom);
  marketDom && marketDom.click();
  await sleep(getWaitSeconds());

  // 然后点击最大
  const maxDom = findDomByText("Max", "div", 0);
  // console.log("maxDom", maxDom);
  maxDom && maxDom.click();
  await sleep(getWaitSeconds());

  // 卖出;
  const sellButtonDom = findDomByText("Sell", "button", 0);
  // console.log("sellButtonDom", sellButtonDom);
  sellButtonDom && sellButtonDom.click();
}

async function runWork() {
  count++;
  console.log(`开始第${count}次买SOL`);
  await sleep(getSwitchSeconds());
  await buySol();
  await sleep(getSwitchSeconds());
  console.log(`开始第${count}次卖SOL`);
  await sellSol();
}

function runTimer() {
  (function inner() {
    let t = setTimeout(async () => {
      await runWork();
      clearTimeout(t);
      inner();
    }, 2000);
  })();
}

(function () {
  "use strict";
  runTimer();
})();
```

- 脚本匹配的有网址，进入backpack的 SOL/USDC交易对会自动运行，也可以自己打开开关，打开要重置。
- 不想刷了，就点关闭，或者禁用
- 理论上这个脚本适用所有的交易对，只要把脚本中的match这一行改成 交易对对应的URL，
  - PYTH的URL：https://backpack.exchange/trade/PYTH_USDC
  - RNDR：https://backpack.exchange/trade/RENDER_USDC
  - 建议就用SOL/USDC，深度最好，滑点最小
