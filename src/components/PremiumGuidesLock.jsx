// components/PremiumGuidesLock.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PremiumGuidesLock.css';

const PremiumGuidesLock = ({ user, onUpgrade, onOpenAuthModal }) => {
  const navigate = useNavigate();
  
  const previewGuides = [
    {
      id: 1,
      title: "Изысканная конвекция",
      description: "Как взорвать запеканку в микроволновке",
      icon: "img/img/microwave.jpg",
      locked: false 
    },
    {
      id: 2,
      title: "Наши мозги и ваша сила",
      description: "Спасите всех учёных и охранников",
      icon: "img/img/team.jpg",
      locked: true
    },
    {
      id: 3,
      title: "Редкий образец",
      description: "Донесите шляпу до Зена",
      icon: "img/img/hat-xen.jpg",
      locked: true
    },
    {
      id: 4,
      title: "Мастер-ломастер",
      description: "Нажмите тревогу и вмешайтесь в работу ноутбука",
      icon: "img/img/masterlom.jpg",
      locked: true
    },
    {
      id: 5,
      title: "Извлечение CO2",
      description: "Получите 20 банок газровки из автоматов",
      icon: "img/img/co2icon.jpg",
      locked: true
    }
  ];

  const handleUpgradeClick = () => {
    navigate('/subscribe');
  };

  return (
    <div className="premium-guides-lock">
      <div className="lock-header">
        <div className="lock-icon">🔒</div>
        <h2>Премиум руководства</h2>
        <p className="subtitle">Полный доступ ко всем руководствам</p>
      </div>
      
      <div className="preview-section">
        <h3>Доступные руководства после подписки:</h3>
        
        <div className="guides-preview">
          {previewGuides.map((guide) => (
            <div key={guide.id} className={`guide-preview-card ${guide.locked ? 'locked' : ''}`}>
              <div className="guide-icon">
                <img src={guide.icon} alt={guide.title} />
                {guide.locked && <div className="lock-overlay">🔒</div>}
              </div>
              <h4>{guide.title}</h4>
              <p>{guide.description}</p>
              {guide.locked ? (
                <span className="premium-badge">PREMIUM</span>
              ) : (
                <span className="free-badge">БЕСПЛАТНО    
                (после регистрации аккаунта)</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="upgrade-section">
        <div className="pricing-card">
          <div className="plan-header">
            <h3>Premium подписка</h3>
            <div className="price">299 ₽<span>/месяц</span></div>
            <p className="billing">или 2,499 ₽ за год (экономия 33%)</p>
          </div>
          
          <ul className="plan-features">
            <li>➕ <strong>5 готовых руководств</strong> с детальными инструкциями</li>
            <li>➕Скриншоты и пошаговые объяснения</li>
            <li>➕ Все будущие обновления</li>
            <li>➕ Поддержка от автора</li>
            <li>➕ Доступ на всех устройствах</li>
          </ul>
          
          <button className="upgrade-btn" onClick={handleUpgradeClick}>
            Получить доступ
          </button>
          
          <div className="guarantee">
            <p>➕ 30-дневная гарантия возврата денег</p>
            <p>➕ Отмена в любой момент</p>
            <p>➕ Моментальный доступ</p>
          </div>
        </div>
        
        {user ? (
          <div className="current-status">
            <p>Ваш текущий статус: <span className={`status ${user.subscription}`}>{user.subscription.toUpperCase()}</span></p>
            {user.subscription === 'free' && (
              <button className="trial-btn" onClick={() => onUpgrade('premium')}>
                Попробовать 7 дней бесплатно
              </button>
            )}
          </div>
        ) : (
          <div className="login-prompt">
            <p>Войдите в систему, чтобы оформить подписку</p>
            <button 
                className="nav-link auth-btn"
                onClick={onOpenAuthModal}
              >
              Войти / Зарегистрироваться
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumGuidesLock;