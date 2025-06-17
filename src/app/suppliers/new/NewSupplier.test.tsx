// src/app/suppliers/new/NewSupplier.test.tsx
import * as React from 'react'; // Cambia esta línea
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NewSupplier from '@/app/suppliers/new/page';

// Mock de useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock de useSession
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: { id: 'user-123' },
    },
    status: 'authenticated',
  }),
}));

// Mock de mutation GraphQL
jest.mock('@/lib/graphql/codegen', () => ({
  useNewSupplierMutation: () => [
    jest.fn(),
    { 
      loading: false,
      data: null,
      error: null 
    }
  ],
}));

// Mock para componentes dinámicos de Next.js
jest.mock('@/components/suppliers/StepScreen', () => ({
  StepScreen: ({ children, show }: any) => show ? children : null
}));

describe('NewSupplier Component', () => {
  it('renderiza correctamente', () => {
    render(<NewSupplier />);
    expect(screen.getByText('Agregar proveedor')).toBeInTheDocument();
  });

  it('navega al siguiente paso', async () => {
    render(<NewSupplier />);
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /siguiente/i }));
    });
    
    expect(screen.getByText('Paso 2 – Productos Asociados')).toBeInTheDocument();
  });
});