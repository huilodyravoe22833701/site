// pages/Subscribe.jsx
import React from 'react';
import SidePanel from '../components/SidePanel';
import './Subscribe.css';

const Subscribe = ({ user, onUpgrade, onOpenAuthModal }) => {
  const handleSubscribe = (plan) => {
    if (onUpgrade(plan)) {
      // Перенаправление обратно на страницу руководств после успешной оплаты
      setTimeout(() => {
        window.location.href = '/guides';
      }, 1000);
       
    } else {
      // Если пользователь не авторизован, открываем модалку
      onOpenAuthModal();
    }
  };

  return (
    <div className="page-container">
      <SidePanel side="left" />
      
      <main className="content main-content">
        <h1>Оформление подписки</h1>
        
        <div className="subscription-options">
          <div className="subscription-card">
            <div className="card-header">
              <h3>Premium подписка</h3>
              <div className="price">299 ₽<span>/месяц</span></div>
            </div>
            
            <ul className="features">
              <li> Полный доступ к 5 готовым руководствам</li>
              <li> Пошаговые инструкции со скриншотами</li>
              <li> Все будущие обновления</li>
              <li> Поддержка от автора</li>
              <li> Доступ на всех устройствах</li>
            </ul>
            
            <button 
              className="subscribe-btn"
              onClick={() => handleSubscribe('premium')}
            >
              Оформить подписку
            </button>
          </div>
        </div>
        
        <div className="payment-info">
          <h3>После оформления подписки:</h3>
          <p>Вы мгновенно получите доступ ко всем руководствам на странице <a href="/guides">РУКОВОДСТВА</a></p>
        </div>
      </main>
      
      <SidePanel side="right" />
    </div>
  );
};

export default Subscribe;