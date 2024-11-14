'use client';

import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

function StripePayment() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const session = await getSession();
      if (!session) {
        toast.error('You must be logged in to make a payment');
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            products: [
              {
                name: 'Product 1',
                price: 1999,
                quantity: 2,
              },
              {
                name: 'Product 2',
                price: 2999,
                quantity: 1,
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      const result = await response.json();
      window.location.href = result.url;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occured during checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button type="submit" onClick={onSubmit} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
      {isLoading ? 'Processing...' : 'Test Stripe'}
    </button>
  );
}

export default StripePayment;
