import React from 'react';
import './SidePanel.css';

const SidePanel = ({ side = 'left' }) => {
  if (side === 'right') {
    return (
      <div className="side-panel right-panel">
        <h3>Соцсети</h3>
        <div className="social-links">
          <a href="#" title="Youtube"><img src="img/img/logo.png" alt="Youtube" /></a>
          <a href="#" title="Telegram"><img src="img/img/logo.png" alt="Telegram" /></a>
          <a href="#" title="Discord"><img src="img/img/logo.png" alt="Discord" /></a>
        </div>
        <h3>Статистика</h3>
        <div className="stats">
          <h4>Игроков онлайн: 999</h4>
        </div>
      </div>
    );
  }

  // Левая панель
  return (
    <div className="side-panel left-panel">
      <h3>Популярные гайды</h3>
      <ul className="popular-guides">
        <li><a href="/guides#microwave-guide">Изысканная конвекция</a></li>
        <li><a href="/guides#team-guide">Наши мозги и ваша сила</a></li>
        <li><a href="/guides#hat-xen-guide">Редкий образец</a></li>
      </ul>
    </div>
  );
};

export default SidePanel;