const { createTask, getTasks, deleteTask, updateTask } = require('../services/taskServices');

module.exports = {
  postCreateTask: async (req, res) => {
    let result = await createTask(req.body);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  getAllTask: async (req, res) => {
    let result = await getTasks(req.query);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  postDeleteTask: async (req, res) => {
    let id = req.body.id;
    let result = await deleteTask(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  putUpdateTask: async (req, res) => {
    let result = await updateTask(req.body);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
