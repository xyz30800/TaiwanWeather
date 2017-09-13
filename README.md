# TaiwanWeather

這是我使用 Webpack + Reactjs + React-router 所寫出來的靜態網站，
實際撰寫程式碼來練習與學習 Reactjs 及 ES6，是最棒的方法。

TaiwanWeather 供使用者查詢台灣各地的天氣狀況 (溫度、濕度及雨量)，
也可查詢過去幾天各鄉鎮的天氣狀況趨勢圖。

* 頁面切換使用 React-router，讓靜態網頁有更多資料呈現。
* 過去幾天的天氣資訊使用 recharts 來呈現多筆資料變化的視覺圖。
* TaiwanWeather 的 Css 是透過撰寫 Scss 編譯而成，是使用 sass-loader 幫助我寫 scss。
* TaiwanWeather 有加入 RWD 設計，可以讓各個螢幕解析度去瀏覽。
* 有使用 HTML5 的 Geolocation，定位出使用者的位置。
* 自己手動刻出 AutoComplete，使用者輸入鄉鎮相關字，及會跳出與關鍵字相關的鄉鎮。

TaiwanWeather 資料來源: https://works.ioa.tw/weather/api/doc/index.html 。

感謝 OA Wu 提供天氣的 API 讓我可以練習資料串接。

切版經驗也是由 OA Wu 的 Live Coding，讓我學習到不少的技巧與觀念。
