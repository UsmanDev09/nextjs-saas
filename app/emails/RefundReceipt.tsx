// app/emails/RefundReceipt.tsx
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Section,
  Heading,
} from '@react-email/components';

interface RefundReceiptProps {
  refundId: string;
  amount: number;
  paymentIntentId: string;
  reason: string;
  customerEmail: string;
  date: string;
}

export default function RefundReceipt({
  refundId,
  amount,
  paymentIntentId,
  reason,
  customerEmail,
  date,
}: RefundReceiptProps) {
  return (
    <Html>
      <Preview>Your Refund Receipt #{refundId}</Preview>
      <Body style={{ backgroundColor: '#f6f9fc', padding: '40px 0' }}>
        <Container
          style={{
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '8px',
          }}
        >
          <Heading style={{ textAlign: 'center', margin: '0 0 30px' }}>
            Refund Confirmation
          </Heading>

          <Section style={{ marginBottom: '20px' }}>
            <Text style={{ fontSize: '16px', margin: '0 0 10px' }}>
              Dear Customer,
            </Text>
            <Text style={{ fontSize: '16px', lineHeight: '24px' }}>
              Your refund has been successfully processed. Here are the details:
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
              <strong>Refund ID:</strong> {refundId}
            </Text>
            <Text style={{ margin: '0 0 10px' }}>
              <strong>Amount:</strong> ${(amount / 100).toFixed(2)}
            </Text>
            <Text style={{ margin: '0 0 10px' }}>
              <strong>Payment Intent ID:</strong> {paymentIntentId}
            </Text>
            <Text style={{ margin: '0 0 10px' }}>
              <strong>Reason:</strong> {reason}
            </Text>
            <Text style={{ margin: '0 0 10px' }}>
              <strong>Date:</strong> {date}
            </Text>
          </Section>

          <Text
            style={{ fontSize: '14px', color: '#666666', textAlign: 'center' }}
          >
            If you have any questions about this refund, please contact our
            support team.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
