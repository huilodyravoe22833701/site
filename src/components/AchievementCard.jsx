import React from 'react';
import { Link } from 'react-router-dom';

const AchievementCard = ({ id, icon, title, description, guideLink }) => {
  return (
    <div className="achievement-card" id={id}>
      <h3>
        <img src={icon} className="achievement-icon" alt={title} />
        {title}
      </h3>
      <p>{description}</p>
      <Link to={guideLink} className="guide-button">
        Смотреть руководство
      </Link>
    </div>
  );
};

export default AchievementCard;