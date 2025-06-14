import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CondicionPago: ResolverTypeWrapper<CondicionPago>;
  CondicionPagoInput: CondicionPagoInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Producto: ResolverTypeWrapper<Producto>;
  ProductoInput: ProductoInput;
  Proveedor: ResolverTypeWrapper<Proveedor>;
  ProveedorInput: ProveedorInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CondicionPago: CondicionPago;
  CondicionPagoInput: CondicionPagoInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Producto: Producto;
  ProductoInput: ProductoInput;
  Proveedor: Proveedor;
  ProveedorInput: ProveedorInput;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
};

export type CondicionPagoResolvers<ContextType = any, ParentType extends ResolversParentTypes['CondicionPago'] = ResolversParentTypes['CondicionPago']> = {
  diasCredito?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fechaFin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fechaInicio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idCondicionPago?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  idUsuario?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  nota?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  actualizarCondicionPago?: Resolver<Maybe<ResolversTypes['CondicionPago']>, ParentType, ContextType, RequireFields<MutationActualizarCondicionPagoArgs, 'idCondicionPago'>>;
  actualizarProducto?: Resolver<Maybe<ResolversTypes['Producto']>, ParentType, ContextType, RequireFields<MutationActualizarProductoArgs, 'idProducto'>>;
  agregarProducto?: Resolver<Maybe<ResolversTypes['Producto']>, ParentType, ContextType, RequireFields<MutationAgregarProductoArgs, 'codigo' | 'idProveedor' | 'nombre' | 'precio'>>;
  crearCondicionPago?: Resolver<Maybe<ResolversTypes['CondicionPago']>, ParentType, ContextType, RequireFields<MutationCrearCondicionPagoArgs, 'input'>>;
  crearCondicionPagoParaProveedor?: Resolver<Maybe<ResolversTypes['CondicionPago']>, ParentType, ContextType, RequireFields<MutationCrearCondicionPagoParaProveedorArgs, 'idProveedor' | 'input'>>;
  createProveedor?: Resolver<Maybe<ResolversTypes['Proveedor']>, ParentType, ContextType, RequireFields<MutationCreateProveedorArgs, 'input'>>;
  deleteProveedor?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteProveedorArgs, 'id'>>;
  eliminarCondicionPago?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationEliminarCondicionPagoArgs, 'idCondicionPago'>>;
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  registerUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'email' | 'nombre' | 'password'>>;
  updateProveedor?: Resolver<Maybe<ResolversTypes['Proveedor']>, ParentType, ContextType, RequireFields<MutationUpdateProveedorArgs, 'id'>>;
};

export type ProductoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Producto'] = ResolversParentTypes['Producto']> = {
  codigo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  descripcion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  idProducto?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nombre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  precio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProveedorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Proveedor'] = ResolversParentTypes['Proveedor']> = {
  activo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  condicionesPago?: Resolver<Maybe<Array<Maybe<ResolversTypes['CondicionPago']>>>, ParentType, ContextType>;
  direccion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fechaRegistro?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idProveedor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  idUsuarioCreador?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  nit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nombre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Producto']>>>, ParentType, ContextType>;
  telefono?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getProveedorById?: Resolver<Maybe<ResolversTypes['Proveedor']>, ParentType, ContextType, RequireFields<QueryGetProveedorByIdArgs, 'id'>>;
  getProveedores?: Resolver<Maybe<Array<Maybe<ResolversTypes['Proveedor']>>>, ParentType, ContextType>;
  getUserByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByEmailArgs, 'email'>>;
  listarProductosPorProveedor?: Resolver<Maybe<Array<Maybe<ResolversTypes['Producto']>>>, ParentType, ContextType, RequireFields<QueryListarProductosPorProveedorArgs, 'idProveedor'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  activo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fechaCreacion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  nombre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CondicionPago?: CondicionPagoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Producto?: ProductoResolvers<ContextType>;
  Proveedor?: ProveedorResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


export type AddProductMutationVariables = Exact<{
  codigo: Scalars['String']['input'];
  descripcion?: InputMaybe<Scalars['String']['input']>;
  idProveedor: Scalars['ID']['input'];
  nombre: Scalars['String']['input'];
  precio: Scalars['Float']['input'];
}>;


export type AddProductMutation = { __typename?: 'Mutation', agregarProducto?: { __typename?: 'Producto', codigo: string } | null };

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

export type UpdateSupplierGeneralInfoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  nit?: InputMaybe<Scalars['String']['input']>;
  nombre?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateSupplierGeneralInfoMutation = { __typename?: 'Mutation', updateProveedor?: { __typename?: 'Proveedor', idProveedor: string } | null };

export type UpdateSupplierContactMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  telefono?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  direccion?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateSupplierContactMutation = { __typename?: 'Mutation', updateProveedor?: { __typename?: 'Proveedor', idProveedor: string } | null };

export type NewPaymentConditionMutationVariables = Exact<{
  idProveedor: Scalars['ID']['input'];
  input: CondicionPagoInput;
}>;


export type NewPaymentConditionMutation = { __typename?: 'Mutation', crearCondicionPagoParaProveedor?: { __typename?: 'CondicionPago', idCondicionPago: string } | null };

export type UpdatePaymentConditionMutationVariables = Exact<{
  diasCredito?: InputMaybe<Scalars['Int']['input']>;
  fechaFin?: InputMaybe<Scalars['String']['input']>;
  fechaInicio?: InputMaybe<Scalars['String']['input']>;
  idCondicionPago: Scalars['ID']['input'];
  nota?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdatePaymentConditionMutation = { __typename?: 'Mutation', actualizarCondicionPago?: { __typename?: 'CondicionPago', diasCredito?: number | null } | null };

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

export type GetProductsBySupplierIdQueryVariables = Exact<{
  idProveedor: Scalars['ID']['input'];
}>;


export type GetProductsBySupplierIdQuery = { __typename?: 'Query', listarProductosPorProveedor?: Array<{ __typename?: 'Producto', codigo: string, descripcion: string, idProducto: string, precio: number, nombre: string } | null> | null };

export type GetSuppliersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSuppliersQuery = { __typename?: 'Query', getProveedores?: Array<{ __typename?: 'Proveedor', activo?: boolean | null, nombre?: string | null, email?: string | null, idProveedor: string, condicionesPago?: Array<{ __typename?: 'CondicionPago', diasCredito?: number | null } | null> | null } | null> | null };

export type GetSupplierByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSupplierByIdQuery = { __typename?: 'Query', getProveedorById?: { __typename?: 'Proveedor', nombre?: string | null, nit?: string | null, telefono?: string | null, idUsuarioCreador?: string | null, direccion?: string | null, email?: string | null, condicionesPago?: Array<{ __typename?: 'CondicionPago', idCondicionPago: string, diasCredito?: number | null, fechaInicio?: string | null, fechaFin?: string | null, nota?: string | null } | null> | null, productos?: Array<{ __typename?: 'Producto', codigo: string, descripcion: string, idProducto: string, nombre: string, precio: number } | null> | null } | null };

export type GetUserIdQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserIdQuery = { __typename?: 'Query', getUserByEmail?: { __typename?: 'User', id?: string | null } | null };


export const AddProductDocument = gql`
    mutation AddProduct($codigo: String!, $descripcion: String, $idProveedor: ID!, $nombre: String!, $precio: Float!) {
  agregarProducto(
    codigo: $codigo
    idProveedor: $idProveedor
    nombre: $nombre
    precio: $precio
    descripcion: $descripcion
  ) {
    codigo
  }
}
    `;
export type AddProductMutationFn = Apollo.MutationFunction<AddProductMutation, AddProductMutationVariables>;

/**
 * __useAddProductMutation__
 *
 * To run a mutation, you first call `useAddProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductMutation, { data, loading, error }] = useAddProductMutation({
 *   variables: {
 *      codigo: // value for 'codigo'
 *      descripcion: // value for 'descripcion'
 *      idProveedor: // value for 'idProveedor'
 *      nombre: // value for 'nombre'
 *      precio: // value for 'precio'
 *   },
 * });
 */
export function useAddProductMutation(baseOptions?: Apollo.MutationHookOptions<AddProductMutation, AddProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductMutation, AddProductMutationVariables>(AddProductDocument, options);
      }
export type AddProductMutationHookResult = ReturnType<typeof useAddProductMutation>;
export type AddProductMutationResult = Apollo.MutationResult<AddProductMutation>;
export type AddProductMutationOptions = Apollo.BaseMutationOptions<AddProductMutation, AddProductMutationVariables>;
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
export const UpdateSupplierGeneralInfoDocument = gql`
    mutation UpdateSupplierGeneralInfo($id: ID!, $nit: String, $nombre: String, $telefono: String) {
  updateProveedor(id: $id, nit: $nit, nombre: $nombre, telefono: $telefono) {
    idProveedor
  }
}
    `;
export type UpdateSupplierGeneralInfoMutationFn = Apollo.MutationFunction<UpdateSupplierGeneralInfoMutation, UpdateSupplierGeneralInfoMutationVariables>;

/**
 * __useUpdateSupplierGeneralInfoMutation__
 *
 * To run a mutation, you first call `useUpdateSupplierGeneralInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSupplierGeneralInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSupplierGeneralInfoMutation, { data, loading, error }] = useUpdateSupplierGeneralInfoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      nit: // value for 'nit'
 *      nombre: // value for 'nombre'
 *      telefono: // value for 'telefono'
 *   },
 * });
 */
export function useUpdateSupplierGeneralInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSupplierGeneralInfoMutation, UpdateSupplierGeneralInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSupplierGeneralInfoMutation, UpdateSupplierGeneralInfoMutationVariables>(UpdateSupplierGeneralInfoDocument, options);
      }
export type UpdateSupplierGeneralInfoMutationHookResult = ReturnType<typeof useUpdateSupplierGeneralInfoMutation>;
export type UpdateSupplierGeneralInfoMutationResult = Apollo.MutationResult<UpdateSupplierGeneralInfoMutation>;
export type UpdateSupplierGeneralInfoMutationOptions = Apollo.BaseMutationOptions<UpdateSupplierGeneralInfoMutation, UpdateSupplierGeneralInfoMutationVariables>;
export const UpdateSupplierContactDocument = gql`
    mutation UpdateSupplierContact($id: ID!, $telefono: String, $email: String, $direccion: String) {
  updateProveedor(
    id: $id
    telefono: $telefono
    email: $email
    direccion: $direccion
  ) {
    idProveedor
  }
}
    `;
export type UpdateSupplierContactMutationFn = Apollo.MutationFunction<UpdateSupplierContactMutation, UpdateSupplierContactMutationVariables>;

/**
 * __useUpdateSupplierContactMutation__
 *
 * To run a mutation, you first call `useUpdateSupplierContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSupplierContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSupplierContactMutation, { data, loading, error }] = useUpdateSupplierContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *      telefono: // value for 'telefono'
 *      email: // value for 'email'
 *      direccion: // value for 'direccion'
 *   },
 * });
 */
export function useUpdateSupplierContactMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSupplierContactMutation, UpdateSupplierContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSupplierContactMutation, UpdateSupplierContactMutationVariables>(UpdateSupplierContactDocument, options);
      }
export type UpdateSupplierContactMutationHookResult = ReturnType<typeof useUpdateSupplierContactMutation>;
export type UpdateSupplierContactMutationResult = Apollo.MutationResult<UpdateSupplierContactMutation>;
export type UpdateSupplierContactMutationOptions = Apollo.BaseMutationOptions<UpdateSupplierContactMutation, UpdateSupplierContactMutationVariables>;
export const NewPaymentConditionDocument = gql`
    mutation NewPaymentCondition($idProveedor: ID!, $input: CondicionPagoInput!) {
  crearCondicionPagoParaProveedor(input: $input, idProveedor: $idProveedor) {
    idCondicionPago
  }
}
    `;
export type NewPaymentConditionMutationFn = Apollo.MutationFunction<NewPaymentConditionMutation, NewPaymentConditionMutationVariables>;

/**
 * __useNewPaymentConditionMutation__
 *
 * To run a mutation, you first call `useNewPaymentConditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPaymentConditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPaymentConditionMutation, { data, loading, error }] = useNewPaymentConditionMutation({
 *   variables: {
 *      idProveedor: // value for 'idProveedor'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewPaymentConditionMutation(baseOptions?: Apollo.MutationHookOptions<NewPaymentConditionMutation, NewPaymentConditionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewPaymentConditionMutation, NewPaymentConditionMutationVariables>(NewPaymentConditionDocument, options);
      }
export type NewPaymentConditionMutationHookResult = ReturnType<typeof useNewPaymentConditionMutation>;
export type NewPaymentConditionMutationResult = Apollo.MutationResult<NewPaymentConditionMutation>;
export type NewPaymentConditionMutationOptions = Apollo.BaseMutationOptions<NewPaymentConditionMutation, NewPaymentConditionMutationVariables>;
export const UpdatePaymentConditionDocument = gql`
    mutation UpdatePaymentCondition($diasCredito: Int, $fechaFin: String, $fechaInicio: String, $idCondicionPago: ID!, $nota: String) {
  actualizarCondicionPago(
    idCondicionPago: $idCondicionPago
    diasCredito: $diasCredito
    fechaFin: $fechaFin
    fechaInicio: $fechaInicio
    nota: $nota
  ) {
    diasCredito
  }
}
    `;
export type UpdatePaymentConditionMutationFn = Apollo.MutationFunction<UpdatePaymentConditionMutation, UpdatePaymentConditionMutationVariables>;

/**
 * __useUpdatePaymentConditionMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentConditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentConditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentConditionMutation, { data, loading, error }] = useUpdatePaymentConditionMutation({
 *   variables: {
 *      diasCredito: // value for 'diasCredito'
 *      fechaFin: // value for 'fechaFin'
 *      fechaInicio: // value for 'fechaInicio'
 *      idCondicionPago: // value for 'idCondicionPago'
 *      nota: // value for 'nota'
 *   },
 * });
 */
export function useUpdatePaymentConditionMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentConditionMutation, UpdatePaymentConditionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaymentConditionMutation, UpdatePaymentConditionMutationVariables>(UpdatePaymentConditionDocument, options);
      }
export type UpdatePaymentConditionMutationHookResult = ReturnType<typeof useUpdatePaymentConditionMutation>;
export type UpdatePaymentConditionMutationResult = Apollo.MutationResult<UpdatePaymentConditionMutation>;
export type UpdatePaymentConditionMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentConditionMutation, UpdatePaymentConditionMutationVariables>;
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
export const GetProductsBySupplierIdDocument = gql`
    query GetProductsBySupplierId($idProveedor: ID!) {
  listarProductosPorProveedor(idProveedor: $idProveedor) {
    codigo
    descripcion
    idProducto
    precio
    nombre
  }
}
    `;

/**
 * __useGetProductsBySupplierIdQuery__
 *
 * To run a query within a React component, call `useGetProductsBySupplierIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsBySupplierIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsBySupplierIdQuery({
 *   variables: {
 *      idProveedor: // value for 'idProveedor'
 *   },
 * });
 */
export function useGetProductsBySupplierIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductsBySupplierIdQuery, GetProductsBySupplierIdQueryVariables> & ({ variables: GetProductsBySupplierIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsBySupplierIdQuery, GetProductsBySupplierIdQueryVariables>(GetProductsBySupplierIdDocument, options);
      }
export function useGetProductsBySupplierIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsBySupplierIdQuery, GetProductsBySupplierIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsBySupplierIdQuery, GetProductsBySupplierIdQueryVariables>(GetProductsBySupplierIdDocument, options);
        }
export function useGetProductsBySupplierIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductsBySupplierIdQuery, GetProductsBySupplierIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsBySupplierIdQuery, GetProductsBySupplierIdQueryVariables>(GetProductsBySupplierIdDocument, options);
        }
export type GetProductsBySupplierIdQueryHookResult = ReturnType<typeof useGetProductsBySupplierIdQuery>;
export type GetProductsBySupplierIdLazyQueryHookResult = ReturnType<typeof useGetProductsBySupplierIdLazyQuery>;
export type GetProductsBySupplierIdSuspenseQueryHookResult = ReturnType<typeof useGetProductsBySupplierIdSuspenseQuery>;
export type GetProductsBySupplierIdQueryResult = Apollo.QueryResult<GetProductsBySupplierIdQuery, GetProductsBySupplierIdQueryVariables>;
export const GetSuppliersDocument = gql`
    query GetSuppliers {
  getProveedores {
    activo
    nombre
    email
    condicionesPago {
      diasCredito
    }
    idProveedor
  }
}
    `;

/**
 * __useGetSuppliersQuery__
 *
 * To run a query within a React component, call `useGetSuppliersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuppliersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuppliersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSuppliersQuery(baseOptions?: Apollo.QueryHookOptions<GetSuppliersQuery, GetSuppliersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuppliersQuery, GetSuppliersQueryVariables>(GetSuppliersDocument, options);
      }
export function useGetSuppliersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuppliersQuery, GetSuppliersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuppliersQuery, GetSuppliersQueryVariables>(GetSuppliersDocument, options);
        }
export function useGetSuppliersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSuppliersQuery, GetSuppliersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSuppliersQuery, GetSuppliersQueryVariables>(GetSuppliersDocument, options);
        }
export type GetSuppliersQueryHookResult = ReturnType<typeof useGetSuppliersQuery>;
export type GetSuppliersLazyQueryHookResult = ReturnType<typeof useGetSuppliersLazyQuery>;
export type GetSuppliersSuspenseQueryHookResult = ReturnType<typeof useGetSuppliersSuspenseQuery>;
export type GetSuppliersQueryResult = Apollo.QueryResult<GetSuppliersQuery, GetSuppliersQueryVariables>;
export const GetSupplierByIdDocument = gql`
    query GetSupplierById($id: ID!) {
  getProveedorById(id: $id) {
    nombre
    nit
    telefono
    idUsuarioCreador
    direccion
    email
    condicionesPago {
      idCondicionPago
      diasCredito
      fechaInicio
      fechaFin
      nota
    }
    productos {
      codigo
      descripcion
      idProducto
      nombre
      precio
    }
  }
}
    `;

/**
 * __useGetSupplierByIdQuery__
 *
 * To run a query within a React component, call `useGetSupplierByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSupplierByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSupplierByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSupplierByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSupplierByIdQuery, GetSupplierByIdQueryVariables> & ({ variables: GetSupplierByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>(GetSupplierByIdDocument, options);
      }
export function useGetSupplierByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>(GetSupplierByIdDocument, options);
        }
export function useGetSupplierByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>(GetSupplierByIdDocument, options);
        }
export type GetSupplierByIdQueryHookResult = ReturnType<typeof useGetSupplierByIdQuery>;
export type GetSupplierByIdLazyQueryHookResult = ReturnType<typeof useGetSupplierByIdLazyQuery>;
export type GetSupplierByIdSuspenseQueryHookResult = ReturnType<typeof useGetSupplierByIdSuspenseQuery>;
export type GetSupplierByIdQueryResult = Apollo.QueryResult<GetSupplierByIdQuery, GetSupplierByIdQueryVariables>;
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