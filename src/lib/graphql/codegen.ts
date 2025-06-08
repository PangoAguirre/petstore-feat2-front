import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CondicionPago = {
  __typename?: 'CondicionPago';
  /**  <-- este campo estaba faltando */
  diasCredito?: Maybe<Scalars['Int']['output']>;
  fechaFin?: Maybe<Scalars['String']['output']>;
  fechaInicio?: Maybe<Scalars['String']['output']>;
  idCondicionPago: Scalars['ID']['output'];
  idUsuario?: Maybe<Scalars['ID']['output']>;
  nota?: Maybe<Scalars['String']['output']>;
};

export type CondicionPagoInput = {
  diasCredito: Scalars['Int']['input'];
  fechaFin: Scalars['String']['input'];
  fechaInicio: Scalars['String']['input'];
  idUsuario: Scalars['ID']['input'];
  nota?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  actualizarCondicionPago?: Maybe<CondicionPago>;
  actualizarProducto?: Maybe<Producto>;
  agregarProducto?: Maybe<Producto>;
  crearCondicionPago?: Maybe<CondicionPago>;
  /** NUEVA MUTATION: Crear condiciÃ³n asociada a proveedor */
  crearCondicionPagoParaProveedor?: Maybe<CondicionPago>;
  createProveedor?: Maybe<Proveedor>;
  deleteProveedor?: Maybe<Scalars['Boolean']['output']>;
  eliminarCondicionPago?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<Scalars['String']['output']>;
  registerUser?: Maybe<User>;
  updateProveedor?: Maybe<Proveedor>;
};


export type MutationActualizarCondicionPagoArgs = {
  diasCredito?: InputMaybe<Scalars['Int']['input']>;
  fechaFin?: InputMaybe<Scalars['String']['input']>;
  fechaInicio?: InputMaybe<Scalars['String']['input']>;
  idCondicionPago: Scalars['ID']['input'];
  nota?: InputMaybe<Scalars['String']['input']>;
};


export type MutationActualizarProductoArgs = {
  codigo?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  idProducto: Scalars['ID']['input'];
  nombre?: InputMaybe<Scalars['String']['input']>;
  precio?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationAgregarProductoArgs = {
  codigo: Scalars['String']['input'];
  descripcion?: InputMaybe<Scalars['String']['input']>;
  idProveedor: Scalars['ID']['input'];
  nombre: Scalars['String']['input'];
  precio: Scalars['Float']['input'];
};


export type MutationCrearCondicionPagoArgs = {
  input: CondicionPagoInput;
};


export type MutationCrearCondicionPagoParaProveedorArgs = {
  idProveedor: Scalars['ID']['input'];
  input: CondicionPagoInput;
};


export type MutationCreateProveedorArgs = {
  input: ProveedorInput;
};


export type MutationDeleteProveedorArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEliminarCondicionPagoArgs = {
  idCondicionPago: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String']['input'];
  nombre: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateProveedorArgs = {
  activo?: InputMaybe<Scalars['Boolean']['input']>;
  direccion?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  nit?: InputMaybe<Scalars['String']['input']>;
  nombre?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type Producto = {
  __typename?: 'Producto';
  codigo: Scalars['String']['output'];
  descripcion: Scalars['String']['output'];
  idProducto: Scalars['ID']['output'];
  nombre: Scalars['String']['output'];
  precio: Scalars['Float']['output'];
};

export type ProductoInput = {
  codigo: Scalars['String']['input'];
  descripcion: Scalars['String']['input'];
  nombre: Scalars['String']['input'];
  precio: Scalars['Float']['input'];
};

export type Proveedor = {
  __typename?: 'Proveedor';
  activo?: Maybe<Scalars['Boolean']['output']>;
  condicionesPago?: Maybe<Array<Maybe<CondicionPago>>>;
  direccion?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fechaRegistro?: Maybe<Scalars['String']['output']>;
  idProveedor: Scalars['ID']['output'];
  idUsuarioCreador?: Maybe<Scalars['ID']['output']>;
  nit?: Maybe<Scalars['String']['output']>;
  /**  <-- este campo estaba faltando */
  nombre?: Maybe<Scalars['String']['output']>;
  productos?: Maybe<Array<Maybe<Producto>>>;
  telefono?: Maybe<Scalars['String']['output']>;
};

export type ProveedorInput = {
  condicionesPago?: InputMaybe<Array<CondicionPagoInput>>;
  direccion: Scalars['String']['input'];
  email: Scalars['String']['input'];
  idUsuarioCreador: Scalars['ID']['input'];
  nit: Scalars['String']['input'];
  nombre: Scalars['String']['input'];
  productos?: InputMaybe<Array<ProductoInput>>;
  telefono: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getProveedorById?: Maybe<Proveedor>;
  getProveedores?: Maybe<Array<Maybe<Proveedor>>>;
  getUserByEmail?: Maybe<User>;
  listarProductosPorProveedor?: Maybe<Array<Maybe<Producto>>>;
};


export type QueryGetProveedorByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryListarProductosPorProveedorArgs = {
  idProveedor: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  activo?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fechaCreacion?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  nombre?: Maybe<Scalars['String']['output']>;
};

export type NewSupplierMutationVariables = Exact<{
  direccion?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  idUsuarioCreador?: InputMaybe<Scalars['ID']['input']>;
  nit?: InputMaybe<Scalars['String']['input']>;
  nombre?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
  productos?: InputMaybe<Array<ProductoInput> | ProductoInput>;
  condicionesPago?: InputMaybe<Array<CondicionPagoInput> | CondicionPagoInput>;
}>;


export type NewSupplierMutation = { __typename?: 'Mutation', createProveedor?: { __typename?: 'Proveedor', idProveedor: string } | null };

export type SignUpMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  nombre?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type SignUpMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'User', email?: string | null } | null };

export type LoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: string | null };

export type GetUserIdQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserIdQuery = { __typename?: 'Query', getUserByEmail?: { __typename?: 'User', id?: string | null } | null };


export const NewSupplierDocument = gql`
    mutation NewSupplier($direccion: String = "", $email: String = "", $idUsuarioCreador: ID = "", $nit: String = "", $nombre: String = "", $telefono: String = "", $productos: [ProductoInput!] = {codigo: "", nombre: "", descripcion: "", precio: 1.5}, $condicionesPago: [CondicionPagoInput!] = {diasCredito: 10, fechaInicio: "", fechaFin: "", idUsuario: ""}) {
  createProveedor(
    input: {nombre: $nombre, nit: $nit, telefono: $telefono, idUsuarioCreador: $idUsuarioCreador, direccion: $direccion, email: $email, productos: $productos, condicionesPago: $condicionesPago}
  ) {
    idProveedor
  }
}
    `;
export type NewSupplierMutationFn = Apollo.MutationFunction<NewSupplierMutation, NewSupplierMutationVariables>;

/**
 * __useNewSupplierMutation__
 *
 * To run a mutation, you first call `useNewSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newSupplierMutation, { data, loading, error }] = useNewSupplierMutation({
 *   variables: {
 *      direccion: // value for 'direccion'
 *      email: // value for 'email'
 *      idUsuarioCreador: // value for 'idUsuarioCreador'
 *      nit: // value for 'nit'
 *      nombre: // value for 'nombre'
 *      telefono: // value for 'telefono'
 *      productos: // value for 'productos'
 *      condicionesPago: // value for 'condicionesPago'
 *   },
 * });
 */
export function useNewSupplierMutation(baseOptions?: Apollo.MutationHookOptions<NewSupplierMutation, NewSupplierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewSupplierMutation, NewSupplierMutationVariables>(NewSupplierDocument, options);
      }
export type NewSupplierMutationHookResult = ReturnType<typeof useNewSupplierMutation>;
export type NewSupplierMutationResult = Apollo.MutationResult<NewSupplierMutation>;
export type NewSupplierMutationOptions = Apollo.BaseMutationOptions<NewSupplierMutation, NewSupplierMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($email: String = "", $nombre: String = "", $password: String = "") {
  registerUser(email: $email, nombre: $nombre, password: $password) {
    email
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      nombre: // value for 'nombre'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String = "", $password: String = "") {
  login(email: $email, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetUserIdDocument = gql`
    query GetUserId($email: String!) {
  getUserByEmail(email: $email) {
    id
  }
}
    `;

/**
 * __useGetUserIdQuery__
 *
 * To run a query within a React component, call `useGetUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIdQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserIdQuery, GetUserIdQueryVariables> & ({ variables: GetUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserIdQuery, GetUserIdQueryVariables>(GetUserIdDocument, options);
      }
export function useGetUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserIdQuery, GetUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserIdQuery, GetUserIdQueryVariables>(GetUserIdDocument, options);
        }
export function useGetUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserIdQuery, GetUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserIdQuery, GetUserIdQueryVariables>(GetUserIdDocument, options);
        }
export type GetUserIdQueryHookResult = ReturnType<typeof useGetUserIdQuery>;
export type GetUserIdLazyQueryHookResult = ReturnType<typeof useGetUserIdLazyQuery>;
export type GetUserIdSuspenseQueryHookResult = ReturnType<typeof useGetUserIdSuspenseQuery>;
export type GetUserIdQueryResult = Apollo.QueryResult<GetUserIdQuery, GetUserIdQueryVariables>;