const LIST_USERS = [
  {
    id: 1,
    firstName: 'David',
    lastName: 'Wagner',
    role: 'Super Admin',
    email: 'david_wagner@example.com',
    date: 'Otc 24th, 2015',
    phone: '(205)-205-5555',
    roleId: 'admin',
  },
  {
    id: 2,
    firstName: 'Ina',
    lastName: 'Hogan',
    role: 'Admin',
    email: 'windler.warren@runte.net',
    date: 'Otc 24th, 2015',
    phone: '(204)-204-4444',
    roleId: 'admin',
  },
  {
    id: 3,
    firstName: 'Devin',
    lastName: 'Harmon',
    role: 'HR Admin',
    email: 'wintheiser_enos@yahoo.com',
    date: 'Dec 18th, 2015',
    phone: '(206)-206-6666',
    roleId: 'admin',
  },
  {
    id: 4,
    firstName: 'Lena',
    lastName: 'Page',
    role: 'Employee',
    email: 'camila_ledner@gmail.com',
    date: 'Otc 8th, 2016',
    phone: '(201)-201-1111',
    roleId: 'employee',
  },
  {
    id: 5,
    firstName: 'Eula',
    lastName: 'Horton',
    role: 'Super Admin',
    email: 'edula_dorton1221@gmail.com',
    date: 'Jun 15th, 2017',
    phone: '(202)-202-2222',
    roleId: 'admin',
  },
  {
    id: 6,
    firstName: 'Victoria',
    lastName: 'Perez',
    role: 'HR Admin',
    email: 'terrill.wiza@hotmail.com',
    date: 'Jan 8th, 2019',
    phone: '(207)-207-7777',
    roleId: 'admin',
  },
  {
    id: 7,
    firstName: 'Cora',
    lastName: 'Medina',
    role: 'Employee',
    email: 'hagenes.isai@hotmail.com',
    date: 'July 21th, 2020',
    phone: '(208)-208-8888',
    roleId: 'employee',
  },
];

/**
 * Get user from local storage
 */
let getUserFromLocalStorage =
  JSON.parse(localStorage.getItem('listUsers')) || [];

/*
 * Save list users to local storage
 */
if (!getUserFromLocalStorage.length) {
  localStorage.setItem('listUsers', JSON.stringify(LIST_USERS));
  getUserFromLocalStorage = LIST_USERS;
}

export { getUserFromLocalStorage };
