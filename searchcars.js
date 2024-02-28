function searchCars() {
    const query = document.getElementById('searchQuery').value;
    const year = document.getElementById('searchYear').value; // Добавьте соответствующий элемент в ваш HTML
    const minPrice = document.getElementById('minPrice').value; // Добавьте соответствующий элемент в ваш HTML
    const maxPrice = document.getElementById('maxPrice').value; // Добавьте соответствующий элемент в ваш HTML

    const url = `http://localhost:3000/search?query=${encodeURIComponent(query)}&year=${year}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('searchResults');
            resultsContainer.innerHTML = ''; // Очистка предыдущих результатов
            if (data.length > 0) {
                data.forEach(car => {
                    const carElement = document.createElement('div');
                    carElement.innerHTML = `
                        <p>Brand: ${car.Brand}, Price: ${car.Price}, Year: ${car.Year}, Description: ${car.Description}</p>
                    `;
                    resultsContainer.appendChild(carElement);
                });
            } else {
                resultsContainer.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => console.error('Error fetching the search results:', error));
}
