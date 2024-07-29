const express = require('express'); // 引入 Express 框架
const cors = require('cors'); // 引入 CORS 中間件
const app = express(); // 創建一個 Express 應用
const port = 3000; // 定義伺服器運行的端口

// 中間件，用於解析 JSON 請求體
app.use(express.json());

// 中間件，用於處理跨域請求
app.use(cors());

// 模擬的資料庫
let users = [
  { id: 1, name: '小明' },
  { id: 2, name: '小華' }
];

// 讀取 (Read) - GET
// 獲取所有用戶
app.get('/api/users', (req, res) => {
  res.json(users);
});


// 獲取特定用戶 - GET
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('找不到該用戶');
  res.json(user);
});


// 創建 (Create) - POST
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});


// 更新 (Update) - PUT
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('找不到該用戶');
  
  user.name = req.body.name;
  res.json(user);
});

// 刪除 (Delete) - DELETE
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('找不到該用戶');
  
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});



app.listen(port, () => {
  console.log(`伺服器正在監聽 ${port} 端口`);
});