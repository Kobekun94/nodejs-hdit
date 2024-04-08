const Task = require('../models/task');
const aqp = require('api-query-params');

module.exports = {
  createTask: async (data) => {
    if (data.type === 'EMPTY PROJECT') {
      let result = await Task.create(data);
      return result;
    }

    // return null;
  },
  getTasks: async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    delete filter.page;
    let offset = (page - 1) * limit;
    result = await Task.find(filter).populate(population).skip(offset).limit(limit).exec();
    return result;
  },

  deleteTask: async (id) => {
    try {
      let result = await Task.deleteById({ _id: id });
      return result;
    } catch (error) {
      console.log('error');
      return null;
    }
  },

  updateTask: async (data) => {
    let task = await Task.updateOne({ _id: data.id }, { ...data });
    return task;
  },
};
