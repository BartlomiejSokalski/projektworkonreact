import { useCart } from '../CartContext';

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const numeric = parseFloat(item.price.replace(',', '.'));
    return sum + numeric;
  }, 0).toFixed(2);

  return (
    <div className="page">
      <h1>Twój koszyk</h1>

      {cart.length === 0 ? (
        <p>Koszyk jest pusty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <strong>{item.name}</strong> – {item.price}
                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '10px' }}>
                  🗑 Usuń
                </button>
              </li>
            ))}
          </ul>

          <h3>Łącznie: {total} zł</h3>

          <button onClick={clearCart}>🧹 Wyczyść koszyk</button>
        </>
      )}
    </div>
  );
}

export default Cart;
