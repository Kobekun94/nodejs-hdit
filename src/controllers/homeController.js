const getHomepage = (req, res) => {
  res.send('hello');
};

const getAbc = (req, res) => {
  res.render('sample.ejs');
};

module.exports = {
  getHomepage,
  getAbc,
};
