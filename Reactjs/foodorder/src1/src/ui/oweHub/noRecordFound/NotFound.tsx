import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { useNavigate, Navigate } from 'react-router-dom';
import useAuth, { AuthData } from '../../../hooks/useAuth';

const NotFound = () => {
  const { authData, saveAuthData } = useAuth();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const change = authData?.isPasswordChangeRequired?.toString() === 'true';
  const navigate = useNavigate();
  return (
    <div>
      {isAuthenticated ? (
        <div
          style={{ minHeight: '100vh' }}
          className=" flex flex-column items-center justify-center "
        >
          <h2 className="h2 ">Page Not Found</h2>
          <button
            style={{ cursor: 'pointer' }}
            className="loginButton mx-auto block mt4"
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      ) : (
        !change && <Navigate to="/" />
      )}
    </div>
  );
};

export default NotFound;
