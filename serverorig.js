const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Подключение к базе данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty12345!',
  database: 'carsforwebsite'
});

app.use(express.json()); // Для парсинга JSON-тел запросов

// Маршрут для поиска
app.get('/search', (req, res) => {
  const { query, year, minPrice, maxPrice } = req.query;
  let sql = 'SELECT * FROM Cars1 WHERE Brand LIKE ? OR Description LIKE ?';
  let params = [`%${query}%`, `%${query}%`];

  if (year) {
    sql += ' AND Year = ?';
    params.push(year);
  }

  if (minPrice) {
    sql += ' AND Price >= ?';
    params.push(minPrice);
  }

  if (maxPrice) {
    sql += ' AND Price <= ?';
    params.push(maxPrice);
  }

  connection.query(sql, params, (error, results) => {
    if (error) return res.status(500).send('Ошибка сервера');
    res.json(results); // Отправляем результаты поиска
  });
});



// Маршрут для регистрации
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  // Проверка формата электронной почты
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Неверный формат электронной почты.');
  }

  // Проверка уникальности пользователя
  connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (error, results) => {
    if (error) {
      return res.status(500).send('Ошибка сервера при проверке пользователя');
    }
    if (results.length > 0) {
      return res.status(400).send('Пользователь с таким именем или электронной почтой уже существует.');
    }

    // Хеширование пароля и добавление пользователя в базу данных
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (error, results) => {
      if (error) {
        return res.status(500).send('Ошибка при регистрации пользователя');
      }
      res.send('Пользователь успешно зарегистрирован');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
