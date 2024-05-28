/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as ProfileImport } from './routes/profile';
import { Route as ItemsImport } from './routes/items';
import { Route as InvoicesImport } from './routes/invoices';
import { Route as ClientsImport } from './routes/clients';
import { Route as IndexImport } from './routes/index';

// Create/Update Routes

const ProfileRoute = ProfileImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any);

const ItemsRoute = ItemsImport.update({
  path: '/items',
  getParentRoute: () => rootRoute,
} as any);

const InvoicesRoute = InvoicesImport.update({
  path: '/invoices',
  getParentRoute: () => rootRoute,
} as any);

const ClientsRoute = ClientsImport.update({
  path: '/clients',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/clients': {
      id: '/clients';
      path: '/clients';
      fullPath: '/clients';
      preLoaderRoute: typeof ClientsImport;
      parentRoute: typeof rootRoute;
    };
    '/invoices': {
      id: '/invoices';
      path: '/invoices';
      fullPath: '/invoices';
      preLoaderRoute: typeof InvoicesImport;
      parentRoute: typeof rootRoute;
    };
    '/items': {
      id: '/items';
      path: '/items';
      fullPath: '/items';
      preLoaderRoute: typeof ItemsImport;
      parentRoute: typeof rootRoute;
    };
    '/profile': {
      id: '/profile';
      path: '/profile';
      fullPath: '/profile';
      preLoaderRoute: typeof ProfileImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  ClientsRoute,
  InvoicesRoute,
  ItemsRoute,
  ProfileRoute,
});

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/clients",
        "/invoices",
        "/items",
        "/profile"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/clients": {
      "filePath": "clients.tsx"
    },
    "/invoices": {
      "filePath": "invoices.tsx"
    },
    "/items": {
      "filePath": "items.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
