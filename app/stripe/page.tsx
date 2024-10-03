'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Product 1', price: 10.99, quantity: 1 },
    { id: '2', name: 'Product 2', price: 15.99, quantity: 1 },
    { id: '3', name: 'Product 3', price: 7.99, quantity: 1 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: Math.max(0, newQuantity) } : product
    ));
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: products.filter(p => p.quantity > 0),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      {products.map((product) => (
        <div key={product.id} className="flex items-center justify-between mb-4 p-4 bg-gray-100 rounded">
          <div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center">
            <button 
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
            >
              -
            </button>
            <span className="mx-2">{product.quantity}</span>
            <button 
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 text-xl font-bold">
        Total: ${totalAmount.toFixed(2)}
      </div>

      {error && (
        <div className="mt-4 text-red-500">{error}</div>
      )}

      <button
        className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleCheckout}
        disabled={isLoading || totalAmount === 0}
      >
        {isLoading ? 'Processing...' : 'Proceed to Checkout'}
      </button>
    </div>
  );
}