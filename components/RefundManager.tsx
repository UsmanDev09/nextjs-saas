'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import * as yup from 'yup';

const schema = yup.object().shape({
  paymentIntentId: yup
    .string()
    .required('Payment Intent ID is required')
    .matches(/^pi_[a-zA-Z0-9]+$/, 'Invalid Payment Intent ID format'),
  amount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1, 'Amount must be greater than 0')
    .nullable(),
  reason: yup
    .string()
    .oneOf(
      ['requested_by_customer', 'duplicate', 'fraudulent'],
      'Please select a valid reason'
    )
    .required('Reason is required'),
  customerEmail: yup
    .string()
    .email('Invalid email address')
    .required('Customer email is required'),
});

function RefundManager() {
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('requested_by_customer');
  const [customerEmail, setCustomerEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleRefund = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    setErrors({});

    try {
      await schema.validate(
        {
          paymentIntentId,
          amount: amount ? parseInt(amount, 10) : undefined,
          reason,
          customerEmail,
        },
        { abortEarly: false }
      );

      const refundResponse = await fetch('/api/payments/refunds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId,
          amount: amount ? parseInt(amount, 10) : undefined,
          reason,
          customerEmail,
        }),
      });

      const refundData = await refundResponse.json();

      if (!refundResponse.ok) {
        throw new Error(refundData.error || 'Failed to process refund');
      }

      setStatus({
        type: 'success',
        message: `Refund processed successfully! Receipt sent to ${customerEmail}`,
      });

      setPaymentIntentId('');
      setAmount('');
      setCustomerEmail('');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        setStatus({
          type: 'error',
          message: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            Process Refund
          </h2>
        </div>

        <form onSubmit={handleRefund} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Intent ID
            </label>
            <input
              type="text"
              value={paymentIntentId}
              onChange={(e) => setPaymentIntentId(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.paymentIntentId ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="pi_xxxxxxxxxxxxx"
              required
            />
            {errors.paymentIntentId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.paymentIntentId}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Email
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.customerEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="customer@example.com"
              required
            />
            {errors.customerEmail && (
              <p className="mt-1 text-sm text-red-600">
                {errors.customerEmail}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (in cents - optional)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Leave blank for full refund"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.reason ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="requested_by_customer">
                Requested by customer
              </option>
              <option value="duplicate">Duplicate</option>
              <option value="fraudulent">Fraudulent</option>
            </select>
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold transition duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {loading ? 'Processing...' : 'Process Refund'}
          </button>
        </form>

        {status.type && (
          <Alert
            className={`mt-6 ${
              status.type === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {status.type === 'success' ? 'Success' : 'Error'}
            </AlertTitle>
            <AlertDescription>{status.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default RefundManager;
