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

function checkBalance() {
  console.log("solBalanceDom", solBalanceDom);
}

async function buySol() {
  // 先点击买
  const buyDom = findDomByText("Buy", "p", 0);
  // console.log("BuyDom", buyDom);
  buyDom && buyDom.click();
  await sleep(100);

  // 然后点击市价单
  const marketDom = findDomByText("Market", "p", 0);
  // console.log("marketDom", marketDom);
  marketDom && marketDom.click();
  await sleep(100);

  // 然后点击最大
  const maxDom = findDomByText("Max", "div", 0);
  // console.log("maxDom", maxDom);
  maxDom && maxDom.click();
  await sleep(100);

  // 买入
  const buyButtonDom = findDomByText("Buy", "button", 0);
  // console.log("buyButtonDom", buyButtonDom);
  buyButtonDom && buyButtonDom.click();
  await sleep(100);
}

async function sellSol() {
  const sellDom = findDomByText("Sell", "p", 0);
  // console.log("sellDom", sellDom);
  sellDom && sellDom.click();
  await sleep(100);

  // 然后点击市价单
  const marketDom = findDomByText("Market", "p", 0);
  // console.log("marketDom", marketDom);
  marketDom && marketDom.click();
  await sleep(100);

  // 然后点击最大
  const maxDom = findDomByText("Max", "div", 0);
  // console.log("maxDom", maxDom);
  maxDom && maxDom.click();
  await sleep(100);

  // 卖出;
  const sellButtonDom = findDomByText("Sell", "button", 0);
  // console.log("sellButtonDom", sellButtonDom);
  sellButtonDom && sellButtonDom.click();
  await sleep(100);
}

async function runWork() {
  count++;
  console.log(`开始第${count}次买SOL`);
  buySol();
  await sleep(2000);
  console.log(`开始第${count}次卖SOL`);
  sellSol();
  // const buyButtonDom = findDomByText("Buy", "button", 0);
  // console.log("buyButtonDom", buyButtonDom);
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
  // Your code here...
})();
