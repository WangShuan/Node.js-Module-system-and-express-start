# Node.js-Module-system-and-express-start
  
 ### 模塊系統

#### 關於 exports 的深入剖析

 - 我們知道在每個模塊中有一個導出對象為 exports
 
 - 但其實 exports 是 module 對象中的其中一個成員
 
 - 只是 Node.js 為了讓代碼看起來更為簡潔 統一設置了一個變量叫 exports 並讓 exprots 等於 module.exports
 
 - 使得我們可以通過給 exprots 添加對象的同時也給 module.exports 添加對象
 
 - 可實際上 在文件中導出的並不是 exports 而是 module.exports
 
 - 所以我們如果要導出單個成員 沒辦法使用 exports = XXX 導出
 
    * 這裏的 exports = XXX 只是給 exports 重新賦值 讓它不再等於 module.exports 而已
 
 - 必須使用 module.exports = XXX 才能讓導出的對象直接變成 XXX 而不再是對象
 
 - 這樣可以讓我們不需要再通過 require 到的成員訪問其中的對象(就是不需要再 require 點來點去 可以直接使用)

#### 關於 require 的加載規則

- A. 所有文件默認會優先從緩存加載：

  * 假設你有 a b c 三文件 你在 a 中 require b 和 c
  
  * 在 b 中又 require c 那文件執行順序為
  
  * `a > a 中的 b > b 中的 c > b > a > 獲取 c 的 exprots`
  
  * 當執行完 b 並且回到 a 的時候就不會再次執行 c 的代碼 但會獲取 c 導出的對象
  
  * 因為在執行 b 時 c 就被執行過了 所以回到 a 時就不會再次執行裡面代碼了
  
- B. 第三方模塊加載過程為：

  * 到文件所屬目錄下找名為 node_modules 的資料夾
  
  * 到此資料夾下找 require 的包名的資料夾
  
  * 再到包名資料夾中找 package.json 文件
  
  * 再到 json 文件中找 main 屬性對應的 js 文件
  
  * 最後找到的那個 js 文件 即為最終引入這個第三方模塊所加載的對象
  
    - 假設在尋找的過程中有找不到的 默認就會直接加載目錄下的 index.js 文件
  
    - 如果連 index.js 文件都不存在 就會往目前所屬目錄的上一層目錄下重新按照此過程尋找
  
    - 再沒有就再往上一層目錄下找 直到磁盤根目錄也沒有 就會直接報錯

- C. 由於第二點的加載規則會不斷往外找 所以建議：
  
  * 在每個項目中 直接於項目的根目錄中安裝第三方模塊 不要在每個子目錄中安裝
  
  * 這樣才不會讓所有目錄下都充滿 node_modules 的資料夾 且造成重複安裝第三方模塊

### 關於 npm 及 package 文件

#### npm

- npm 全名為 node package manager

- 是 Node.js 專門用來下載第三方包的

- 安裝 Node 就等同於安裝了 npm 了

- 常用命令為：

  + 1. `npm init`: 創建 package.json 文件，若有加上`--yes` 就會跳過嚮導 快速生成此文件。
    * `npm i -y`
  + 2. `npm install`: 安裝所有 package.json 文件中 `dependencies` 屬性的項目。
    * `npm i`
  + 3. `npm install 包名`: 安裝包，若有加上 `--save` 就會同時更新 package.json 文件。
    * `npm i XXX -s`
  + 4. `npm uninstall 包名`: 刪除包，若有加上 `--save` 就會同時更新 package.json 文件。
    * `npm un XXX -s`
  + 5. `npm 命令 --help`: 查詢這個命令的使用幫助。

#### package.json

- package.json 文件可通過在終端機中輸入 `npm init` 手動生成

- 裡面可填寫你的項目名稱、項目描述、啟動項目的 js 文件、項目依賴的第三方包等等
  
  * 當你使用 `npm` 安裝第三方模塊時 加上 `--save`
  
  * 它就會自動產生 `dependencies` 屬性 保存你安裝的第三方模塊的包名及版本號
  
- 所以建議每個項目最好都有一個 package.json 文件 幫助我們保存項目依賴的訊息
  
  * 這樣做的目的是 當你誤刪了 node_modules 資料夾時

  * 可以通過在終端機中輸入 `npm install` 自動幫你安裝所有 `dependencies` 屬性中的項目

### Express

- Express 是一個第三方 Web 開發框架

- 因核心模塊 http 在開發方面有部分的不足 所以需要使用框架來加快我們開發項目

- 在 Express 中高度封裝了 node.js 中的 http 核心模塊 讓我們能更加專注在業務上而不是底層

- xpress 使用方式為：
  
  + 1. 建立項目資料夾
  
  + 2. 建立 package.json 文件

  + 3. 安裝 express

  + 4. 創建入口文件 app.js
  
  + 5. 打開 app.js 引入 express

  + 6. 定義一個變量 `var app = express()`
    
    * express() 方法就是核心模塊中的 http.createServer() 方法

  + 7. app.get('/',function(req,res){res.send('hello express!')})
  
    * app.get() 方法參數1 為 url 地址，參數2 為回調函數

    * express 中不再使用 res.write() 、 res.end() 而是直接使用 res.send()
    
    * express 已幫我們處理好中文亂碼的問題 響應中文時就不需要再設置請求頭了

    * express 也處理了沒有設置的 url 地址會直接返回 Cannot GET /XXX

    * 在 express 中要處理靜態資源的方式也很簡單 一樣創建一個 public 目錄 把需要的資源存放進去

    * 然後通過 `app.use('/public/', express.static('./public/'))` 公開靜態資源

    * 在 express 中 可以通過 req.query 獲取 get 請求的參數 且直接就是對象
