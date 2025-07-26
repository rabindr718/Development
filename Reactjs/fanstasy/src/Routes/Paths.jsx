/**
 * Created by Rabindra Kumar Sharma on 6/12/24
 * File Name: paths.jsx
 * Product Name: 
 * Project Name:
 * Path: /
 */

import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import IPL from '../Teams/Teams';

const Paths = () => {
  return (
    <Routes>
      <Route path={ROUTES.IPL} element={<IPL />} />

      {/* 
        ************************************************************
        ALL CHILD COMPONENTS HAVE BEEN MOVED TO POLICY COMPONENTS FOR NAVIGATION
        ************************************************************
      */}

      {/* Example of other routes you might add later:
      <Route path={ROUTES.SECTORPAGE_DISPLAYER} element={<SectorAdmin />} />
      <Route
        path={ROUTES.ADMIN}
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      */}
    </Routes>
  );
};

export default Paths;
