// src/__tests__/ProductsCatalog.test.tsx

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { FetchResult } from "@apollo/client";
import { ProductsCatalog } from "../components/products/ProductsCatalog";

import {
  GetProductsBySupplierIdDocument,
  AddProductDocument,
  GetProductsBySupplierIdQuery,
  GetProductsBySupplierIdQueryVariables,
  AddProductMutation,
  AddProductMutationVariables,
} from "@/lib/graphql/codegen";

const supplierId = "123";

const initialProductsData: GetProductsBySupplierIdQuery = {
  listarProductosPorProveedor: [
    {
      __typename: "Producto",
      codigo: "A1",
      descripcion: "Desc A",
      idProducto: "p1",
      precio: 10,
      nombre: "Prod A",
    },
  ],
};

const mocks = [
  {
    request: {
      query: GetProductsBySupplierIdDocument,
      variables: { idProveedor: supplierId } as GetProductsBySupplierIdQueryVariables,
    },
    result: { data: initialProductsData },
  },
  {
    request: {
      query: AddProductDocument,
      variables: {
        idProveedor: supplierId,
        codigo: "B2",
        nombre: "Prod B",
        precio: 20,
        descripcion: "Desc B",
      } as AddProductMutationVariables,
    },
    result: {
      data: {
        agregarProducto: {
          __typename: "Producto",
          codigo: "B2",
        },
      },
    } as unknown as FetchResult<AddProductMutation>,
  },
];

describe("ProductsCatalog Component", () => {
  it("renders initial products and allows adding a new one", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductsCatalog supplierId={supplierId} />
      </MockedProvider>
    );

    // Wait for the query to finish and initial item to appear:
    await waitFor(() => {
      expect(screen.getByText("Prod A")).toBeInTheDocument();
    });

    // Open the "Agregar" form:
    userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    
    // Wait for form to appear
    await waitFor(() => {
      expect(screen.getByText("Agregar Producto o Servicio")).toBeInTheDocument();
    });

    // Fill in the form using labels
    userEvent.type(screen.getByLabelText("Código"), "B2");
    userEvent.type(screen.getByLabelText("Nombre"), "Prod B");
    userEvent.type(screen.getByLabelText("Descripción"), "Desc B");
    userEvent.type(screen.getByLabelText("Precio"), "20");

    // Submit:
    userEvent.click(screen.getByRole("button", { name: "Agregar" }));

    // The new product should show up after mutation + refetch:
    await waitFor(() => {
      expect(screen.getByText("Prod B")).toBeInTheDocument();
    });
  });

  it("shows an error toast if the add-product mutation fails", async () => {
    const errorMocks = [
      mocks[0],
      {
        ...mocks[1],
        error: new Error("Network error"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <ProductsCatalog supplierId={supplierId} />
      </MockedProvider>
    );

    // Wait for initial product
    await waitFor(() => {
      expect(screen.getByText("Prod A")).toBeInTheDocument();
    });

    // Try to add again
    userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    
    // Wait for form to appear
    await waitFor(() => {
      expect(screen.getByText("Agregar Producto o Servicio")).toBeInTheDocument();
    });

    // Fill in the form using labels
    userEvent.type(screen.getByLabelText("Código"), "B2");
    userEvent.type(screen.getByLabelText("Nombre"), "Prod B");
    userEvent.type(screen.getByLabelText("Descripción"), "Desc B");
    userEvent.type(screen.getByLabelText("Precio"), "20");
    
    userEvent.click(screen.getByRole("button", { name: "Agregar" }));

    // Expect your error toast
    await waitFor(() => {
      expect(
        screen.getByText(/Error al guardar el producto/i)
      ).toBeInTheDocument();
    });
  });

  it("cancels the form when Cancel button is clicked", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductsCatalog supplierId={supplierId} />
      </MockedProvider>
    );

    // Wait for initial product
    await waitFor(() => {
      expect(screen.getByText("Prod A")).toBeInTheDocument();
    });

    // Open the "Agregar" form:
    userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    
    // Wait for form to appear
    await waitFor(() => {
      expect(screen.getByText("Agregar Producto o Servicio")).toBeInTheDocument();
    });

    // Click Cancel button
    userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

    // Form should disappear
    await waitFor(() => {
      expect(screen.queryByText("Agregar Producto o Servicio")).not.toBeInTheDocument();
    });
  });
});