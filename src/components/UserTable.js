// src/components/UserTable.js
import React, { useState, useEffect, useCallback } from 'react';
import UserModal from './UserModal';
import TableHeader from './TableHeader';
import Pagination from './Pagination';
import { fetchUsers } from '../services/api';
import '../styles.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filters, setFilters] = useState({
    lastName: '',
    firstName: '',
    age: '',
    gender: '',
    phone: ''
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [columnWidths, setColumnWidths] = useState({
    lastName: 150,
    firstName: 150,
    middleName: 150,
    age: 100,
    gender: 100,
    phone: 180,
    email: 220,
    country: 150,
    city: 150
  });
  const [resizing, setResizing] = useState({ active: false, column: null, startX: 0, startWidth: 0 });
  
  const itemsPerPage = 5;
  
  const handleAgeChange = (e) => {
    // Оставляем только цифры
    const value = e.target.value.replace(/\D/g, '');
    handleFilterChange('age', value);
  };
  
  // Определение колонок таблицы
  const columns = [
    { key: 'lastName', label: 'Фамилия' },
    { key: 'firstName', label: 'Имя' },
    { key: 'middleName', label: 'Отчество' },
    { key: 'age', label: 'Возраст' },
    { key: 'gender', label: 'Пол' },
    { key: 'phone', label: 'Телефон' },
    { key: 'email', label: 'Email' },
    { key: 'country', label: 'Страна' },
    { key: 'city', label: 'Город' }
  ];
  
  // Загрузка пользователей
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке данных. Пожалуйста, попробуйте позже.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getUsers();
  }, []);
  
  // Применение фильтров
  useEffect(() => {
    let result = [...users];
    
    if (filters.lastName) {
      result = result.filter(user => 
            user.lastName.toLowerCase().startsWith(filters.lastName.toLowerCase())
      );
    }

    if (filters.firstName) {
      result = result.filter(user => 
            user.firstName.toLowerCase().startsWith(filters.firstName.toLowerCase())
      );
    }
    
    if (filters.age) {
    result = result.filter(user => 
        user.age.toString().startsWith(filters.age)
      );
    }
    
    if (filters.gender) {
        result = result.filter(user => 
            user.gender.toLowerCase().includes(filters.gender.toLowerCase())
        );
    }
    
    if (filters.phone) {
        result = result.filter(user => 
            user.phone.includes(filters.phone)
        );
    }
    
    setFilteredUsers(result);
    setCurrentPage(1);
  }, [filters, users]);
  
  // Сортировка данных
  const requestSort = (key) => {
    let direction = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      setSortConfig({ key: null, direction: null });
      return;
    }
    
    setSortConfig({ key, direction });
  };
  
  // Применение сортировки
  const getSortedData = () => {
    if (!sortConfig.key) return filteredUsers;
    
    return [...filteredUsers].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  
  // Обработчик изменения фильтров
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Обработчик открытия модального окна
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  
  // Обработчик изменения ширины колонки
  const startResize = (column, e) => {
    setResizing({
      active: true,
      column,
      startX: e.clientX,
      startWidth: columnWidths[column]
    });
  };
  
  // Обработчик перемещения при изменении ширины
  const handleResize = useCallback((e) => {
        if (resizing.active) {
            const diffX = e.clientX - resizing.startX;
            const newWidth = resizing.startWidth + diffX;
            
            if (newWidth >= 50) {
                setColumnWidths(prev => ({
                    ...prev,
                    [resizing.column]: newWidth
                }));
            }
        }
    }, [resizing]);

    // Остановка изменения ширины
    const stopResize = useCallback(() => {
        setResizing({ active: false, column: null, startX: 0, startWidth: 0 });
    }, []);
  
  // Добавляем обработчики событий для изменения ширины колонок
  useEffect(() => {
        window.addEventListener('mousemove', handleResize);
        window.addEventListener('mouseup', stopResize);
        
        return () => {
            window.removeEventListener('mousemove', handleResize);
            window.removeEventListener('mouseup', stopResize);
        };
    }, [handleResize, stopResize]);
  
  // Пагинация
  const sortedData = getSortedData();
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <div className="container">
      <div className="app-card">
        <header>
          <h1>Тестовое задание для стажера</h1>
          <div className="subtitle">Позиция: Разработчик JS</div>
          <div className="tech-stack">
            <div className="tech-item">JavaScript</div>
            <div className="tech-item">HTML</div>
            <div className="tech-item">CSS</div>
            <div className="tech-item">React</div>
          </div>
        </header>
        
        <div className="content">
          <div className="filters-section">
            <div className="filter-group">
              <label htmlFor="lastNameFilter">Фамилия</label>
              <input 
                id="lastNameFilter"
                type="text" 
                value={filters.lastName}
                onChange={(e) => handleFilterChange('lastName', e.target.value)}
                placeholder="Фильтр по фамилии"
              />
            </div>
            
            <div className="filter-group">
              <label htmlFor="firstNameFilter">Имя</label>
              <input 
                id="firstNameFilter"
                type="text" 
                value={filters.firstName}
                onChange={(e) => handleFilterChange('firstName', e.target.value)}
                placeholder="Фильтр по имени"
              />
            </div>
            
            <div className="filter-group">
            <label htmlFor="ageFilter">Возраст</label>
            <input 
                id="ageFilter"
                type="text" 
                value={filters.age}
                onChange={handleAgeChange}
                placeholder="Фильтр по возрасту"
            />
        </div>
            
            <div className="filter-group">
              <label htmlFor="genderFilter">Пол</label>
              <select 
                id="genderFilter"
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
              >
                <option value="">Все</option>
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="phoneFilter">Телефон</label>
              <input 
                id="phoneFilter"
                type="text" 
                value={filters.phone}
                onChange={(e) => handleFilterChange('phone', e.target.value)}
                placeholder="Фильтр по телефону"
              />
            </div>
          </div>
          
          {loading && <div className="loading">Загрузка данных...</div>}
          
          {error && <div className="error">{error}</div>}
          
          {!loading && !error && (
            <>
              <div className="table-container">
                <table>
                  <TableHeader 
                    columns={columns}
                    sortConfig={sortConfig}
                    onSort={requestSort}
                    onResize={startResize}
                    columnWidths={columnWidths}
                  />
                  <tbody>
                    {paginatedData.map(user => (
                      <tr key={user.id} onClick={() => handleRowClick(user)}>
                        <td>{user.lastName}</td>
                        <td>{user.firstName}</td>
                        <td>{user.middleName}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.country}</td>
                        <td>{user.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
      
      {isModalOpen && (
        <UserModal 
          user={selectedUser} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default UserTable;