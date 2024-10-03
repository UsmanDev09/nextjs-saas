"use client"
import { getSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const StripePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const session = await getSession();
      if (!session) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to make a payment.",
          variant: "destructive",
        });
        return;
      }
  
      console.log("Session", session); 
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
            }
          ],
          // user:session.user,
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      window.location.href = result.url;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An error occurred during checkout.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Button onClick={onSubmit} disabled={isLoading}>
      {isLoading ? "Processing..." : "Test Stripe"}
    </Button>
  );
}

export default StripePayment;