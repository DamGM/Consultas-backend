const User = require('../models/user');
const Role = require('../models/role');

const createAdminUser = async () => {
  const adminRole = await Role.findOne({ name: 'admin' });
  if (!adminRole) {
    console.error('Role admin no encontrado');
    return;
  }

  const adminUser = new User({
    email: 'admin@example.com',
    password: '12345678',
    role: adminRole._id
  });

  try {
    await adminUser.save();
    console.log('Administrador creado correctamente');
  } catch (error) {
    console.error('Erro al crear administrador', error);
  }
};

createAdminUser();