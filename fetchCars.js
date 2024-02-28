const mysql = require('mysql');

// Параметры подключения к базе данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty12345!',
  database: 'carsforwebsite' // Убедитесь, что здесь указано правильное имя вашей базы данных
});


// Подключение к базе данных
connection.connect(error => {
  if (error) {
    return console.error('Ошибка подключения: ' + error.message);
  }
  console.log('Подключено к базе данных MySQL');
});

// Запрос данных из таблицы Cars1
const query = 'SELECT * FROM Cars1';

connection.query(query, (error, results) => {
  if (error) {
    return console.error('Ошибка запроса: ' + error.message);
  }
  // Вывод результатов
  console.log('Данные из таблицы Cars1:');
  results.forEach(car => {
    console.log(`Марка: ${car.Brand}, Цена: ${car.Price}, Город: ${car.City}, Тип кузова: ${car.Body_Type}, Объем двигателя: ${car.Engine_Displacement}, Лошадиные силы: ${car.Horsepower}, Описание: ${car.Description}`);
  });
});

// Закрытие подключения
connection.end();
