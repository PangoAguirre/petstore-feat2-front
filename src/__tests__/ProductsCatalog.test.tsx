// src/__tests__/ProductsCatalog.test.tsx

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { ProductsCatalog } from "../components/products/ProductsCatalog";

import {
  GetProductsBySupplierIdDocument,
  AddProductDocument,
  // QueryListProductsBySupplierArgs, // Removed as it is not exported
  AddProductMutation,
} from "@/lib/graphql/codegen";

const supplierId = "123";

// 1) Initial mocked data for the query
const initialProductsData: {
  listProductsBySupplier: Array<{
    codigo: string;
    nombre: string;
    descripcion: string;
    precio: number;
    __typename: "Product";
  }>;
} = {
  listProductsBySupplier: [
    {
      codigo: "A1",
      nombre: "Product A",
      descripcion: "Description A",
      precio: 10,
      __typename: "Product",
    },
  ],
};

// 2) GraphQL mocks array
const mocks = [
  {
    request: {
      query: GetProductsBySupplierIdDocument,
      variables: { supplierId },
    },
    result: { data: initialProductsData },
  },
  {
    request: {
      query: AddProductDocument,
      variables: {
        supplierId,
        codigo: "B2",
        nombre: "Product B",
        precio: 20,
        descripcion: "Description B",
      },
    },
    result: {
      data: {
        addProduct: {
          codigo: "B2",
          __typename: "Product",
        },
      },
    },
  },
];

describe("ProductsCatalog Component", () => {
  it("shows a spinner, then renders initial products and allows adding a new one", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductsCatalog supplierId={supplierId} />
      </MockedProvider>
    );

    // 1) Spinner should be visible while loading
    expect(screen.getByRole("status")).toBeInTheDocument();

    // 2) After query resolves, Product A appears
    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });

    // 3) Open "Add" dialog and fill in a new product
    userEvent.click(screen.getByRole("button", { name: "Add" }));
    userEvent.type(screen.getByLabelText(/Code/i), "B2");
    userEvent.type(screen.getByLabelText(/Name/i), "Product B");
    userEvent.type(screen.getByLabelText(/Price/i), "20");
    userEvent.click(screen.getByRole("button", { name: "Save" }));

    // 4) After mutation + refetch, Product B appears
    await waitFor(() => {
      expect(screen.getByText("Product B")).toBeInTheDocument();
    });
  });

  it("displays an error toast if the add-product mutation fails", async () => {
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

    // Wait for initial data
    await waitFor(() => screen.getByText("Product A"));

    // Try to add B2
    userEvent.click(screen.getByRole("button", { name: "Add" }));
    userEvent.type(screen.getByLabelText(/Code/i), "B2");
    userEvent.type(screen.getByLabelText(/Name/i), "Product B");
    userEvent.type(screen.getByLabelText(/Price/i), "20");
    userEvent.click(screen.getByRole("button", { name: "Save" }));

    // Should show your error toast
    await waitFor(() => {
      expect(
        screen.getByText(/Error saving the product/i)
      ).toBeInTheDocument();
    });
  });
});
