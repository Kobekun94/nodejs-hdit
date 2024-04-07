const Customer = require('../models/customer');

const createCustomerService = async (customerData) => {
  try {
    let result = await Customer.create({
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      description: customerData.description,
      image: customerData.image,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const createArrayCustomerService = async (arr) => {
  try {
    let result = await Customer.insertMany(arr);
    return result;
  } catch (error) {
    console.log('error');
    return null;
  }
};

const deleteACustomerService = async (id) => {
  try {
    let result = await Customer.deleteById({ _id: id });
    return result;
  } catch (error) {
    console.log('error');
    return null;
  }
};

const deleteArrCustomerService = async (ids) => {
  try {
    let result = await Customer.delete({ _id: { $in: ids } });
    return result;
  } catch (error) {
    console.log('error');
    return null;
  }
};

const getAllCustomerService = async (limit, page) => {
  try {
    let result = null;
    if (limit && page) {
      result = 'PAGE';
    } else {
      result = await Customer.find({});
    }

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createCustomerService,
  createArrayCustomerService,
  deleteACustomerService,
  deleteArrCustomerService,
  getAllCustomerService,
};
