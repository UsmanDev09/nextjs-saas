import {
  Html,
  Body,
  Container,
  Text,
  Preview,
  Section,
  Heading,
} from '@react-email/components';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutReceiptProps {
  sessionId: string;
  amount: number;
  customerEmail: string;
  date: string;
  products: Product[];
}

export default function CheckoutReceipt({
  sessionId,
  amount,
  customerEmail,
  date,
  products,
}: CheckoutReceiptProps) {
  return (
    <Html>
      <Preview>Your Order Receipt #{sessionId}</Preview>
      <Body style={{ backgroundColor: '#f6f9fc', padding: '40px 0' }}>
        <Container
          style={{
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '8px',
          }}
        >
          <Heading style={{ textAlign: 'center', margin: '0 0 30px' }}>
            Order Confirmation
          </Heading>

          <Section style={{ marginBottom: '20px' }}>
            <Text style={{ fontSize: '16px', margin: '0 0 10px' }}>
              Dear Customer,
            </Text>
            <Text style={{ fontSize: '16px', lineHeight: '24px' }}>
              Thank you for your order! Here are your receipt details:
            </Text>
          </Section>

          <Section
            style={{
              backgroundColor: '#f9f9f9',
              padding: '20px',
              borderRadius: '4px',
              marginBottom: '20px',
            }}
          >
            <Text style={{ margin: '0 0 10px' }}>
              <strong>Order ID:</strong> {sessionId}
            </Text>
            <Text style={{ margin: '0 0 10px' }}>
              <strong>Total Amount:</strong> ${amount}
            </Text>
            <Text style={{ margin: '0 0 10px' }}>
              <strong>Email:</strong> {customerEmail}
            </Text>
            <Text style={{ margin: '0 0 10px' }}>
              <strong>Date:</strong> {date}
            </Text>
          </Section>

          <Section style={{ marginBottom: '20px' }}>
            <Heading style={{ fontSize: '18px', margin: '0 0 10px' }}>
              Products
            </Heading>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
                  <th style={{ textAlign: 'right', padding: '8px' }}>Price</th>
                  <th style={{ textAlign: 'right', padding: '8px' }}>
                    Quantity
                  </th>
                  <th style={{ textAlign: 'right', padding: '8px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: 'left', padding: '8px' }}>
                      {product.name}
                    </td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>
                      ${(product.price / 100).toFixed(2)}
                    </td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>
                      {product.quantity}
                    </td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>
                      ${((product.price * product.quantity) / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Text
            style={{ fontSize: '14px', color: '#666666', textAlign: 'center' }}
          >
            If you have any questions about your order, please contact our
            support team.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
