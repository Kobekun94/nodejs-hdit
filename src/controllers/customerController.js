const { uploadSingleFile } = require('../services/fileService');
const { createCustomerService } = require('../services/customerService');

module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;

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
    };

    await createCustomerService(customerData);
    return res.send('create a customer');
  },
};
