// components/Header.jsx - ИСПРАВЛЕННЫЙ
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthModal from './AuthModal';

const Header = ({ 
  user, 
  onLogin, 
  onLogout,
  authModalOpen, // Убираем useState отсюда
  setAuthModalOpen,
  onOpenAuthModal 
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // УБРАТЬ ЭТУ СТРОКУ: const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <header className="main-header">
        <div className="header-container">
          <div className="logo-container">
            <img src="img/img/logo.png" alt="Black Mesa" className="logo" />
            <span className="site-title">PERFECT MESA</span>
          </div>
          
          <nav className="main-nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              ГЛАВНАЯ
            </NavLink>
            
            <div 
              className="dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <NavLink 
                to="/achievements" 
                className={({ isActive }) => `nav-link dropdown-btn ${isActive ? 'active' : ''}`}
              >
                ДОСТИЖЕНИЯ 
              </NavLink>
              
              <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                <NavLink to="/achievements#easy" className="achievement-link">
                  <img src="img/img/easy-icon.png" alt="" className="achievement-icon" />
                  <span>EASY</span>
                </NavLink>
                <NavLink to="/achievements#medium" className="achievement-link">
                  <img src="img/img/medium-icon.png" alt="" className="achievement-icon" />
                  <span>MEDIUM</span>
                </NavLink>
                <NavLink to="/achievements#hard" className="achievement-link">
                  <img src="img/img/hard-icon.png" alt="" className="achievement-icon" />
                  <span>HARD</span>
                </NavLink>
              </div>
            </div>
            
            <NavLink 
              to="/guides" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              РУКОВОДСТВА
            </NavLink>
            
            {user ? (
              <div 
                className="user-menu dropdown"
                onMouseEnter={() => setUserDropdownOpen(true)}
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <div className="user-info">
                  <div className="user-avatar">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user.username}</span>
                  <span className="dropdown-arrow"></span>
                </div>
                
                <div className={`dropdown-content user-dropdown ${userDropdownOpen ? 'show' : ''}`}>
                  <div className="user-stats">
                    <div className="stat-item">
                      <span className="stat-label">Уровень:</span>
                      <span className="stat-value">
                        {user.subscription === 'premium' ? 'Premium' : 
                         user.subscription === 'ultimate' ? 'Ultimate' : 'Новичок'}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Достижений:</span>
                      <span className="stat-value">0/50</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">В системе:</span>
                      <span className="stat-value">Сегодня</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={onLogout}>
                    <span className="logout-icon">✖</span>
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <button 
                className="nav-link auth-btn"
                onClick={onOpenAuthModal}
              >
                ВОЙТИ
              </button>
            )}
          </nav>
        </div>
      </header>
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        onLogin={onLogin}
      />
    </>
  );
};

export default Header;