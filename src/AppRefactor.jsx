import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Import components
import SplashScreen from './components/SplashScreen';
import LandingPage from './components/LandingPage';
import AuthForm from './components/AuthForm';
import HomePage from './components/HomePage';
import SubjectPage from './components/SubjectPage';
import StudyMaterials from './components/StudyMaterials';
import PDFDownload from './components/PDFDownload';
import ApiTest from './components/ApiTest';
import ProfilePage from './components/ProfilePageRedesigned';
import AboutPage from './components/AboutPageRedesigned';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Import layouts
import PublicLayout from './layouts/PublicLayout';
import MainLayout from './layouts/MainLayout';

// Import Redux actions
import { initializeAuth, loginUser, registerUser, logoutUser } from './store/slices/authSlice';
import { fetchSubjects, fetchBundles, fetchQuestionBanks, fetchQuestionBanksBySubject } from './store/slices/dataSlice';

// Splash Screen with auto-redirect
const SplashScreenWrapper = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/landing');
    }, 2000); // 2 second splash screen
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return <SplashScreen />;
};

// Landing page with navigation handlers
const LandingPageWrapper = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => navigate('/register');
  const handleLogin = () => navigate('/login');
  
  return <LandingPage onGetStarted={handleGetStarted} onLogin={handleLogin} />;
};

function QSolveApp() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);
  const { subjects, bundles, questionBanks } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    // Always fetch bundles for homepage display
    dispatch(fetchBundles());
    
    if (isAuthenticated) {
      dispatch(fetchSubjects());
      dispatch(fetchQuestionBanks());
    }
  }, [isAuthenticated, dispatch]);

  const login = async (credentials) => {
    return dispatch(loginUser(credentials));
  };

  const register = async (userData) => {
    return dispatch(registerUser(userData));
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const fetchQuestionBanksBySubjectHandler = (subjectID) => {
    return dispatch(fetchQuestionBanksBySubject(subjectID));
  };

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<SplashScreenWrapper />} />
            <Route path="/landing" element={<LandingPageWrapper />} />
            <Route path="/login" element={<AuthForm formType="login" onSubmit={login} />} />
            <Route path="/register" element={<AuthForm formType="register" onSubmit={register} />} />
            <Route path="/forgot-password" element={<AuthForm formType="forgot-password" onSubmit={() => Promise.resolve({ success: false, error: 'Feature not implemented yet' })} />} />
          </Route>

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={authLoading} />}>
            <Route element={<MainLayout user={user} onLogout={logout} />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/subject/:subjectId" element={<SubjectPage questionBanks={questionBanks} fetchQuestionBanksBySubject={fetchQuestionBanksBySubjectHandler} />} />
              <Route path="/study-materials" element={<StudyMaterials user={user} />} />
              <Route path="/pdf-downloads" element={<PDFDownload />} />
              <Route path="/api-test" element={<ApiTest />} />
              <Route path="/profile" element={<ProfilePage user={user} />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default QSolveApp;