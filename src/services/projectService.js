const Project = require('../models/project.js');
const aqp = require('api-query-params');

module.exports = {
  createProject: async (data) => {
    if (data.type === 'EMPTY PROJECT') {
      let result = await Project.create(data);
      return result;
    }
    if (data.type === 'ADD USER') {
      //   console.log(data);

      let myProject = await Project.findById(data.projectId).exec();

      for (let i = 0; i < data.userArr.length; i++) {
        myProject.usersInfo.push(data.userArr[i]);
      }

      let newResult = await myProject.save();
      return newResult;
    }
    if (data.type === 'ADD TASK') {
      //   console.log(data);

      let myProject = await Project.findById(data.projectId).exec();

      for (let i = 0; i < data.tasks.length; i++) {
        myProject.tasks.push(data.tasks[i]);
      }

      let newResult = await myProject.save();
      return newResult;
    }
    if (data.type === 'DELETE USER') {
      //   console.log(data);

      let myProject = await Project.findById(data.projectId).exec();

      for (let i = 0; i < data.userArr.length; i++) {
        myProject.usersInfo.pull(data.userArr[i]);
      }

      let newResult = await myProject.save();
      return newResult;
    }

    return null;
  },
  getProject: async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    console.log(population);
    delete filter.page;
    let offset = (page - 1) * limit;
    result = await Project.find(filter).populate(population).skip(offset).limit(limit).exec();
    return result;
  },

  deleteProject: async (id) => {
    try {
      let result = await Project.deleteById({ _id: id });
      return result;
    } catch (error) {
      console.log('error');
      return null;
    }
  },

  updateProject: async (data) => {
    let project = await Project.updateOne({ _id: data.id }, { ...data });

    return project;
  },
};
