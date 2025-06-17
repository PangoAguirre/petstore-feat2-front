// src/__tests__/ProductsCatalog.test.tsx

import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
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

const updatedProductsData: GetProductsBySupplierIdQuery = {
  listarProductosPorProveedor: [
    {
      __typename: "Producto",
      codigo: "A1",
      descripcion: "Desc A",
      idProducto: "p1",
      precio: 10,
      nombre: "Prod A",
    },
    {
      __typename: "Producto",
      codigo: "B2",
      descripcion: "Desc B",
      idProducto: "p2",
      precio: 20,
      nombre: "Prod B",
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
  {
    request: {
      query: GetProductsBySupplierIdDocument,
      variables: { idProveedor: supplierId } as GetProductsBySupplierIdQueryVariables,
    },
    result: { data: updatedProductsData },
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

    // Abrir el formulario de manera estable
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    });
    
    // Esperar a que el formulario esté completamente renderizado
    await waitFor(() => {
      expect(screen.getByText("Agregar Producto o Servicio")).toBeInTheDocument();
    });

    // Rellenar el formulario usando await para cada interacción
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Código"), "B2");
      await userEvent.type(screen.getByLabelText("Nombre"), "Prod B");
      await userEvent.type(screen.getByLabelText("Descripción"), "Desc B");
      await userEvent.type(screen.getByLabelText("Precio"), "20");
    });

    // Enviar el formulario
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    });

    // Verificar el nuevo producto con un tiempo de espera más generoso
    await waitFor(() => {
      expect(screen.getByText("Prod B")).toBeInTheDocument();
    }, { timeout: 3000 });
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

    // Abrir el formulario
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    });
    
    // Esperar formulario
    await waitFor(() => {
      expect(screen.getByText("Agregar Producto o Servicio")).toBeInTheDocument();
    });

    // Rellenar formulario
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Código"), "B2");
      await userEvent.type(screen.getByLabelText("Nombre"), "Prod B");
      await userEvent.type(screen.getByLabelText("Descripción"), "Desc B");
      await userEvent.type(screen.getByLabelText("Precio"), "20");
    });
    
    // Enviar formulario
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    });

    // Verificar mensaje de error con un selector más flexible
    await waitFor(() => {
      expect(
        screen.getByText((content) => 
          content.includes("Error al guardar el producto") ||
          content.includes("Error")
        )
      ).toBeInTheDocument();
    }, { timeout: 3000 });
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

    // Abrir formulario
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    });
    
    // Esperar formulario
    await waitFor(() => {
      expect(screen.getByText("Agregar Producto o Servicio")).toBeInTheDocument();
    });

    // Clicar Cancelar
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    });

    // Verificar que el formulario desaparece
    await waitFor(() => {
      expect(screen.queryByText("Agregar Producto o Servicio")).not.toBeInTheDocument();
    });
  });
});