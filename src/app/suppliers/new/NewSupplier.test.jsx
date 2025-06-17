import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewSupplier from '@/app/your-path/NewSupplier';
import { useNewSupplierMutation } from '@/lib/graphql/codegen';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

jest.mock('@/lib/graphql/codegen');
jest.mock('next-auth/react');
jest.mock('next/navigation');
jest.mock('sonner');

jest.mock('@/lib/forms/suppliers', () => ({
  generalInfoFields: [
    { name: 'name', label: 'Name', type: 'text', rules: {} },
  ],
  contactInfoFields: [
    { name: 'email', label: 'Email', type: 'email', rules: {} },
  ],
  paymentConditionsFields: [
    { name: 'creditDays', label: 'Credit Days', type: 'number', rules: {} },
    { name: 'startDate', label: 'Start Date', type: 'date', rules: {} },
    { name: 'endDate', label: 'End Date', type: 'date', rules: {} },
    { name: 'grade', label: 'Grade', type: 'text', rules: {} },
  ],
}));

const mockPush = jest.fn();
const mockCreateSupplier = jest.fn();

(useRouter as jest.Mock).mockReturnValue({ push: mockPush });
(useSession as jest.Mock).mockReturnValue({ data: { user: { id: 'user-id' } } });
(useNewSupplierMutation as jest.Mock).mockReturnValue([
  mockCreateSupplier,
  { loading: false },
]);

describe('NewSupplier Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Step 1 content initially', () => {
    render(<NewSupplier />);
    expect(screen.getByText(/Agregar proveedor/i)).toBeInTheDocument();
    expect(screen.getByText(/Paso 1 - Datos Generales/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Siguiente/i })).toBeInTheDocument();
  });

  test('navigates through steps and submits form', async () => {
    render(<NewSupplier />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Test Supplier' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));

    expect(screen.getByText(/Paso 2 – Productos Asociados/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Agregar Producto/i }));

    fireEvent.change(screen.getByLabelText(/Code/i), {
      target: { value: 'P001' },
    });
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Product 1' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Description 1' },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: '100' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));

    expect(screen.getByText(/Resumen de Proveedor/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Finalizar/i }));

    await waitFor(() => {
      expect(mockCreateSupplier).toHaveBeenCalledTimes(1);
      expect(mockCreateSupplier).toHaveBeenCalledWith({
        variables: expect.objectContaining({ nombre: 'Test Supplier' }),
      });
    });
  });

  test('handles GraphQL error and shows toast', async () => {
    const errorHandler = jest.fn();
    (useNewSupplierMutation as jest.Mock).mockReturnValue([
      mockCreateSupplier,
      { loading: false },
    ]);
    // Simulate error scenario
    mockCreateSupplier.mockImplementation(({ onError }) => {
      onError({ graphQLErrors: [{ message: 'Test Error' }] });
    });

    render(<NewSupplier />);
    fireEvent.click(screen.getByRole('button', { name: /Finalizar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error', { description: 'Test Error' });
    });
  });
});
