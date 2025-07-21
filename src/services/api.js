// Имитация API сервера с пользователями
export const fetchUsers = async () => {
    // В реальном приложении здесь будет запрос к API
    // const response = await fetch('https://dummyjson.com/users');
    // const data = await response.json();
    
    // Возвращаем моковые данные
    return [
        {
            id: 1,
            firstName: "Иван",
            lastName: "Иванов",
            middleName: "Иванович",
            age: 28,
            gender: "Мужской",
            phone: "+7 (999) 123-45-67",
            email: "ivanov@example.com",
            country: "Россия",
            city: "Москва",
            address: "ул. Тверская, д. 10",
            height: 180,
            weight: 75,
            avatar: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            id: 2,
            firstName: "Мария",
            lastName: "Петрова",
            middleName: "Сергеевна",
            age: 32,
            gender: "Женский",
            phone: "+7 (999) 234-56-78",
            email: "petrova@example.com",
            country: "Россия",
            city: "Санкт-Петербург",
            address: "Невский пр., д. 20",
            height: 165,
            weight: 58,
            avatar: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
            id: 3,
            firstName: "Алексей",
            lastName: "Сидоров",
            middleName: "Николаевич",
            age: 45,
            gender: "Мужской",
            phone: "+7 (999) 345-67-89",
            email: "sidorov@example.com",
            country: "Казахстан",
            city: "Алматы",
            address: "пр. Абая, д. 15",
            height: 175,
            weight: 80,
            avatar: "https://randomuser.me/api/portraits/men/3.jpg"
        },
        {
            id: 4,
            firstName: "Елена",
            lastName: "Смирнова",
            middleName: "Дмитриевна",
            age: 29,
            gender: "Женский",
            phone: "+7 (999) 456-78-90",
            email: "smirnova@example.com",
            country: "Беларусь",
            city: "Минск",
            address: "ул. Ленина, д. 5",
            height: 170,
            weight: 60,
            avatar: "https://randomuser.me/api/portraits/women/4.jpg"
        },
        {
            id: 5,
            firstName: "Дмитрий",
            lastName: "Кузнецов",
            middleName: "Олегович",
            age: 35,
            gender: "Мужской",
            phone: "+7 (999) 567-89-01",
            email: "kuznetsov@example.com",
            country: "Украина",
            city: "Киев",
            address: "ул. Крещатик, д. 25",
            height: 182,
            weight: 85,
            avatar: "https://randomuser.me/api/portraits/men/5.jpg"
        },
        {
            id: 6,
            firstName: "Ольга",
            lastName: "Васильева",
            middleName: "Андреевна",
            age: 31,
            gender: "Женский",
            phone: "+7 (999) 678-90-12",
            email: "vasilyeva@example.com",
            country: "Россия",
            city: "Екатеринбург",
            address: "ул. Мамина-Сибиряка, д. 30",
            height: 168,
            weight: 62,
            avatar: "https://randomuser.me/api/portraits/women/6.jpg"
        },
        {
            id: 7,
            firstName: "Сергей",
            lastName: "Михайлов",
            middleName: "Викторович",
            age: 40,
            gender: "Мужской",
            phone: "+7 (999) 789-01-23",
            email: "mikhailov@example.com",
            country: "Армения",
            city: "Ереван",
            address: "ул. Туманяна, д. 12",
            height: 178,
            weight: 77,
            avatar: "https://randomuser.me/api/portraits/men/7.jpg"
        },
        {
            id: 8,
            firstName: "Анна",
            lastName: "Федорова",
            middleName: "Игоревна",
            age: 27,
            gender: "Женский",
            phone: "+7 (999) 890-12-34",
            email: "fedorova@example.com",
            country: "Россия",
            city: "Казань",
            address: "ул. Баумана, д. 18",
            height: 172,
            weight: 65,
            avatar: "https://randomuser.me/api/portraits/women/8.jpg"
        }
    ];
};