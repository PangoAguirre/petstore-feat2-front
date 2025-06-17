// src/__tests__/ProductsCatalog.test.tsx

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
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

// 1) Mocked data shaped to GetProductsBySupplierIdQuery:
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
  // Query mock
  {
    request: {
      query: GetProductsBySupplierIdDocument,
      variables: { idProveedor: supplierId } as GetProductsBySupplierIdQueryVariables,
    },
    result: { data: initialProductsData },
  },
  // Mutation mock
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
    },
  },
];

describe("ProductsCatalog Component", () => {
  it("renders initial products and allows adding a new one", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductsCatalog supplierId={supplierId} />
      </MockedProvider>
    );

    // 1) Before query resolves, placeholder appears
    expect(screen.getByText("No hay productos asociados")).toBeInTheDocument();

    // 2) After query, initial product is shown
    await waitFor(() => {
      expect(screen.getByText("Prod A")).toBeInTheDocument();
    });

    // 3) Open "Agregar" dialog
    userEvent.click(screen.getByRole("button", { name: "Agregar" }));

    // 4) Fill out the form fields
    userEvent.type(screen.getByLabelText(/Código/i), "B2");
    userEvent.type(screen.getByLabelText(/Nombre/i), "Prod B");
    userEvent.type(screen.getByLabelText(/Precio/i), "20");

    // 5) Submit
    userEvent.click(screen.getByRole("button", { name: "Guardar" }));

    // 6) After mutation + refetch, new product appears
    await waitFor(() => {
      expect(screen.getByText("Prod B")).toBeInTheDocument();
    });
  });

  it("shows an error toast if the add-product mutation fails", async () => {
    const errorMocks = [
      mocks[0],
      {
        ...mocks[1],
        result: undefined,
        error: new Error("Network error"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <ProductsCatalog supplierId={supplierId} />
      </MockedProvider>
    );

    // Wait for initial data
    await waitFor(() => {
      expect(screen.getByText("Prod A")).toBeInTheDocument();
    });

    // Attempt to add again
    userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    userEvent.type(screen.getByLabelText(/Código/i), "B2");
    userEvent.type(screen.getByLabelText(/Nombre/i), "Prod B");
    userEvent.type(screen.getByLabelText(/Precio/i), "20");
    userEvent.click(screen.getByRole("button", { name: "Guardar" }));

    // Should display your onError toast message
    await waitFor(() => {
      expect(
        screen.getByText(/Error al guardar el producto/i)
      ).toBeInTheDocument();
    });
  });
});
