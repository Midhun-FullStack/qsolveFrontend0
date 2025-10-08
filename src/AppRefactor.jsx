import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Import layouts
import PublicLayout from './layouts/PublicLayout';
import MainLayout from './layouts/MainLayout';

// Import hooks
import { useAuth } from './hooks/useAuth';
import { useData } from './hooks/useData';

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
  const {
    user,
    isAuthenticated,
    loading: authLoading,
    login,
    register,
    logout
  } = useAuth();

  const { subjects, bundles, questionBanks, fetchQuestionBanksBySubject } = useData(isAuthenticated);

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
              <Route path="/home" element={<HomePage subjects={subjects} bundles={bundles} user={user} />} />
              <Route path="/subject/:subjectId" element={<SubjectPage questionBanks={questionBanks} fetchQuestionBanksBySubject={fetchQuestionBanksBySubject} />} />
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