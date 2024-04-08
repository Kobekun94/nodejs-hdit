const Joi = require('joi');
const { uploadSingleFile } = require('../services/fileService');
const {
  createCustomerService,
  createArrayCustomerService,
  deleteACustomerService,
  deleteArrCustomerService,
} = require('../services/customerService');
const Customer = require('../models/customer');

module.exports = {
  getCustomers: async (req, res) => {
    let results = await Customer.find({});
    return res.render('customers.ejs', { listCustomer: results });
  },

  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;

    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),

      address: Joi.string(),

      phone: Joi.string().pattern(new RegExp('^[0-9]{8,11}$')),

      email: Joi.string().email(),

      description: Joi.string(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(200).json({
        EC: 0,
        data: error,
      });
      //return error
    } else {
      let imageUrl = '';

      if (!req.files || Object.keys(req.files).length === 0) {
        //do nothing
      } else {
        let results = await uploadSingleFile(req.files.image);
        imageUrl = results.path;
      }

      let customerData = {
        name,
        address,
        phone,
        email,
        description,
        image: imageUrl,
      };

      let customer = await createCustomerService(customerData);
      return res.status(200).json({
        EC: 0,
        data: customer,
      });
    }
  },

  postCreateArrayCustomer: async (req, res) => {
    let customers = await createArrayCustomerService(req.body.customers);
    if (customers) {
      return res.status(200).json({
        EC: 0,
        data: customers,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: customers,
      });
    }
  },

  deleteACustomerAPI: async (req, res) => {
    let id = req.body.id;
    let result = await deleteACustomerService(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  deleteArrCustomerAPI: async (req, res) => {
    let ids = req.body.customersId;
    console.log(ids);
    let result = await deleteArrCustomerService(ids);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
