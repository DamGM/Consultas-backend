const Role = require('../models/role');

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    const values = [
      { name: 'user' },
      { name: 'admin' }
    ];

    const roles = values.map(value => new Role(value));
    const result = await Role.insertMany(roles);
    console.log(`${result.insertedCount} roles created`);
  } catch (error) {
    console.error(error);
  }
};

createRoles();