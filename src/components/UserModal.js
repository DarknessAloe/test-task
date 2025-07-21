import React, { useEffect } from 'react';

const UserModal = ({ user, onClose }) => {
  // Обработчик для закрытия по клавише Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!user) return null;
  
  // Обработчик клика на фон
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{user.lastName} {user.firstName} {user.middleName}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="user-avatar">
            <img src={user.avatar} alt="Аватар пользователя" />
          </div>
          
          <div className="user-info">
            <h3>Основная информация</h3>
            <div className="info-row">
              <div className="info-label">Возраст:</div>
              <div>{user.age} лет</div>
            </div>
            <div className="info-row">
              <div className="info-label">Телефон:</div>
              <div>{user.phone}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Email:</div>
              <div>{user.email}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Рост:</div>
              <div>{user.height} см</div>
            </div>
            <div className="info-row">
              <div className="info-label">Вес:</div>
              <div>{user.weight} кг</div>
            </div>
          </div>
          
          <div className="user-info">
            <h3>Адрес</h3>
            <div className="info-row">
              <div className="info-label">Страна:</div>
              <div>{user.country}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Город:</div>
              <div>{user.city}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Адрес:</div>
              <div>{user.address}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;