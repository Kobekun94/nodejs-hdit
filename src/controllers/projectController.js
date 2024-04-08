const { createProject, getProject, deleteProject, updateProject } = require('../services/projectService');

module.exports = {
  postCreateProject: async (req, res) => {
    let result = await createProject(req.body);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  getAllProject: async (req, res) => {
    let result = await getProject(req.query);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  postDeleteProject: async (req, res) => {
    let id = req.body.id;
    let result = await deleteProject(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  putUpdateProject: async (req, res) => {
    let result = await updateProject(req.body);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
