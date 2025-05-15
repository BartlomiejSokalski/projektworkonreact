import { useState } from 'react';
import { useCart } from '../CartContext';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // np. "29,99 zł"
  category: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Karma dla psa', description: 'Pyszna karma.', price: '29,99 zł', category: 'Karma' },
  { id: 2, name: 'Obroża LED', description: 'Świecąca obroża.', price: '49,99 zł', category: 'Akcesoria' },
  { id: 3, name: 'Zabawka dla kota', description: 'Wędka z piórkiem.', price: '19,99 zł', category: 'Zabawki' },
  { id: 4, name: 'Transporter', description: 'Dla zwierząt.', price: '99,99 zł', category: 'Akcesoria' },
  { id: 5, name: 'Smycz automatyczna', description: 'Smycz 5m.', price: '39,99 zł', category: 'Akcesoria' },
  { id: 6, name: 'Kocyk dla psa', description: 'Miękki kocyk.', price: '24,99 zł', category: 'Akcesoria' },
  { id: 7, name: 'Karma premium', description: 'Dla wybrednych.', price: '119,99 zł', category: 'Karma' },
  { id: 8, name: 'Miska ceramiczna', description: 'Łatwa w czyszczeniu.', price: '34,99 zł', category: 'Akcesoria' },
  { id: 9, name: 'Piłka dla psa', description: 'Interaktywna.', price: '14,99 zł', category: 'Zabawki' },
  { id: 10, name: 'Tunel dla kota', description: 'Zabawka rozwijająca.', price: '59,99 zł', category: 'Zabawki' },
];

const CATEGORIES = ['Wszystkie', 'Karma', 'Akcesoria', 'Zabawki'];

function Products() {
  const [filter, setFilter] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [category, setCategory] = useState<string>('Wszystkie');
  const { addToCart } = useCart();

  const handleAdd = (product: Product): void => {
    addToCart(product);
    alert(`✅ Produkt "${product.name}" został dodany do koszyka!`);
  };

  let filteredProducts: Product[] = PRODUCTS.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(filter.toLowerCase());
    const priceNumber = parseFloat(product.price.replace(',', '.'));

    const priceMatch =
      (!minPrice || priceNumber >= parseFloat(minPrice)) &&
      (!maxPrice || priceNumber <= parseFloat(maxPrice));

    const categoryMatch = category === 'Wszystkie' || product.category === category;

    return nameMatch && priceMatch && categoryMatch;
  });

  if (sortOption === 'name-asc') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-desc') {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === 'price-asc') {
    filteredProducts.sort(
      (a, b) => parseFloat(a.price.replace(',', '.')) - parseFloat(b.price.replace(',', '.'))
    );
  } else if (sortOption === 'price-desc') {
    filteredProducts.sort(
      (a, b) => parseFloat(b.price.replace(',', '.')) - parseFloat(a.price.replace(',', '.'))
    );
  }

  return (
    <div className="page">
      <h1>Produkty</h1>

      <input
        type="text"
        placeholder="Szukaj produktu..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="search"
      />

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sortuj według...</option>
          <option value="name-asc">Nazwa (A-Z)</option>
          <option value="name-desc">Nazwa (Z-A)</option>
          <option value="price-asc">Cena rosnąco</option>
          <option value="price-desc">Cena malejąco</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Cena od"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cena do"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p>❌ Brak produktów spełniających kryteria wyszukiwania.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>{product.price}</strong>
              <p>Kategoria: {product.category}</p>
              <button onClick={() => handleAdd(product)} style={{ marginTop: '10px' }}>
                ➕ Dodaj do koszyka
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
