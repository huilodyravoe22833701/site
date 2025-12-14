import React, { useState, useEffect } from 'react'; // Добавляем useEffect
import './AuthModal.css';

const MOCK_USERS = [
  { email: 'test@gmail.com', password: 'Test123!', username: 'TestUser' },
  { email: 'admin@mail.ru', password: 'Admin123!', username: 'Администратор' }
];

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [allowClose, setAllowClose] = useState(true); // Разрешение на закрытие

  // Обработка нажатия ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && allowClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Блокируем скролл страницы под модалкой
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, allowClose]);

  // Функция валидации email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail.ru', 'yandex.ru', 'test.com'];
    
    if (!emailRegex.test(email)) {
      return "Некорректный формат email";
    }
    
    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
      return `Допустимые домены: ${allowedDomains.join(', ')}`;
    }
    
    return '';
  };

  // Функция валидации пароля
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Пароль должен быть минимум 6 символов";
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Должна быть хотя бы одна заглавная буква";
    }
    
    if (!/(?=.*\d)/.test(password)) {
      return "Должна быть хотя бы одна цифра";
    }
    
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
      return "Должен быть хотя бы один спецсимвол (!@#$%^&* и т.д.)";
    }
    
    return '';
  };

  // Поиск пользователя в "базе данных"
  const findUserByCredentials = (email, password) => {
    return MOCK_USERS.find(user => 
      user.email === email && user.password === password
    );
  };

  // Проверка, существует ли email
  const checkIfEmailExists = (email) => {
    return MOCK_USERS.some(user => user.email === email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;
    
    if (isLogin) {
      // ВХОД: проверяем существующего пользователя
      const existingUser = findUserByCredentials(email, password);
      if (!existingUser) {
        newErrors.auth = "Неверный email или пароль";
      }
    } else {
      // РЕГИСТРАЦИЯ: проверяем уникальность
      if (!username.trim()) {
        newErrors.username = "Введите имя пользователя";
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Пароли не совпадают";
      }
      if (checkIfEmailExists(email)) {
        newErrors.email = "Пользователь с таким email уже существует";
      }
    }
    
    if (Object.keys(newErrors).length === 0) {
      // Разрешаем закрытие только после успешной отправки
      setAllowClose(true);
      
      if (isLogin) {
        // Вход существующего пользователя
        const existingUser = findUserByCredentials(email, password);
        onLogin(existingUser);
      } else {
        // Регистрация нового пользователя
        const newUser = {
          email: email,
          password: password,
          username: username,
          achievements: [],
          registrationDate: new Date().toISOString()
        };
        
        MOCK_USERS.push(newUser);
        console.log('Зарегистрирован новый пользователь:', newUser);
        
        onLogin(newUser);
      }
      
      onClose();
      
      // Очистка формы
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
    } else {
      setErrors(newErrors);
      // Запрещаем закрытие при ошибках
      setAllowClose(false);
    }
  };

  // Обработчик закрытия через крестик
  const handleCloseClick = () => {
    if (allowClose) {
      onClose();
      // Сброс формы при закрытии
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
      setIsLogin(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={allowClose ? onClose : undefined}
      style={{ cursor: allowClose ? 'pointer' : 'default' }}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: 'auto' }}
      >
        <button 
          className="close-btn" 
          onClick={handleCloseClick}
          title={allowClose ? "Закрыть (Esc)" : "Заполните форму правильно"}
          disabled={!allowClose}
        >
          ×
        </button>
        
        {!allowClose && (
          <div className="close-warning">
            ⚠️ Заполните форму правильно, чтобы закрыть окно
          </div>
        )}
        
        <h2>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</h2>
        
        {errors.auth && (
          <div className="auth-error">
            <span className="error-message">{errors.auth}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Имя пользователя:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors({...errors, username: ''});
                  setAllowClose(false); // При изменении формы запрещаем закрытие
                }}
                placeholder="Введите ваше имя"
                required
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
          )}
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({...errors, email: ''});
                setAllowClose(false);
              }}
              placeholder="example@gmail.com"
              required
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({...errors, password: ''});
                setAllowClose(false);
              }}
              placeholder="Min 6 символов, заглавная, цифра, спецсимвол"
              required
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
            
            <div className="password-requirements">
              <p>Требования к паролю:</p>
              <ul>
                <li className={password.length >= 6 ? 'valid' : ''}>Минимум 6 символов</li>
                <li className={/(?=.*[A-Z])/.test(password) ? 'valid' : ''}>Одна заглавная буква</li>
                <li className={/(?=.*\d)/.test(password) ? 'valid' : ''}>Одна цифра</li>
                <li className={/(?=.*[!@#$%^&*])/.test(password) ? 'valid' : ''}>Один спецсимвол</li>
              </ul>
            </div>
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label>Подтвердите пароль:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({...errors, confirmPassword: ''});
                  setAllowClose(false);
                }}
                placeholder="Повторите пароль"
                required
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          )}
          
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={handleCloseClick}
              disabled={!allowClose}
            >
              Отмена
            </button>
          </div>
        </form>
        
        <div className="switch-mode">
          <p>
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <button 
              className="switch-btn" 
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setConfirmPassword('');
                setAllowClose(false); // При переключении запрещаем закрытие
              }}
            >
              {isLogin ? ' Зарегистрироваться' : ' Войти'}
            </button>
          </p>
        </div>
        
        <div className="demo-credentials">
          <p>Тестовые аккаунты:</p>
          <div className="test-accounts">
            <div className="test-account">
              <strong>test@gmail.com</strong>
              <span>Test123!</span>
            </div>
            <div className="test-account">
              <strong>admin@mail.ru</strong>
              <span>Admin123!</span>
            </div>
          </div>
          <p className="close-hint">
            ✨ Форма заблокирована до правильного заполнения
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;