import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/Home'));
const FarmersPage = lazy(() => import('./pages/Farmers'));
const FarmerPage = lazy(() => import('./pages/Farmer'));
const FarmerFormPage = lazy(() => import('./pages/FarmerForm'));

const SuspenseRoute = ({ element }: { element: JSX.Element | null }) => (
  <Suspense>{element}</Suspense>
);

export default function RouteHandler() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<SuspenseRoute element={<HomePage />} />} />
        <Route path="produtores">
          <Route index element={<SuspenseRoute element={<FarmersPage />} />} />
          <Route path=":farmerId">
            <Route index element={<SuspenseRoute element={<FarmerPage />} />} />
            <Route
              path="editar"
              element={<SuspenseRoute element={<FarmerFormPage />} />}
            />
          </Route>
          <Route
            path="cadastrar"
            element={<SuspenseRoute element={<FarmerFormPage />} />}
          />
        </Route>
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
}
