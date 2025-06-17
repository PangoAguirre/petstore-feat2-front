// src/app/suppliers/new/NewSupplier.test.tsx
import * as React from 'react';
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

// Mock para react-hook-form
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    control: {},
    handleSubmit: (fn: any) => fn,
    formState: { errors: {}, isValid: true },
    getValues: () => ({
      name: 'Proveedor de prueba',
      nit: '1234567890',
      products: [],
    }),
    setValue: jest.fn(),
    watch: jest.fn(),
  }),
  useFieldArray: () => ({
    fields: [],
    append: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
  }),
}));

// Mock para componentes
jest.mock('@/components/suppliers/StepScreen', () => ({
  StepScreen: ({ children, show }: any) => show ? children : null
}));

jest.mock('@/components/common/PartialForm', () => ({
  PartialForm: ({ onAction }: any) => (
    <button onClick={onAction}>Siguiente</button>
  )
}));

jest.mock('@/components/common/Info', () => ({
  Info: ({ title }: any) => <h2>{title}</h2>
}));

describe('NewSupplier Component', () => {
  it('renderiza correctamente', () => {
    render(<NewSupplier />);
    expect(screen.getByText('Agregar proveedor')).toBeInTheDocument();
  });

  it('navega al siguiente paso', async () => {
    render(<NewSupplier />);
    
    await act(async () => {
      fireEvent.click(screen.getByText('Siguiente'));
    });
    
    expect(screen.getByText('Paso 2 – Productos Asociados')).toBeInTheDocument();
  });
});