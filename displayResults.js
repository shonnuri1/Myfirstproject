function displayResults(cars) {
    const results = document.getElementById('searchResults');
    results.innerHTML = ''; // Очистка предыдущих результатов
    if (cars.length > 0) {
      const list = document.createElement('ul');
      cars.forEach(car => {
        const item = document.createElement('li');
        item.textContent = `Brand: ${car.Brand}, Price: ${car.Price}, Description: ${car.Description}`;
        list.appendChild(item);
      });
      results.appendChild(list);
    } else {
      results.textContent = 'No cars found.';
    }
  }
  