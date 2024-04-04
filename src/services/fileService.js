const path = require('path');
const timestamp = Date.now();

const uploadSingleFile = async (fileObject) => {
  let extName = path.extname(fileObject.name);
  let fileName = `${fileObject.name}-${timestamp}${extName}`;
  uploadPath = path.join(__dirname, '..', '/public/image/upload/', fileName);

  try {
    await fileObject.mv(uploadPath);
    return {
      status: 'success',
      path: uploadPath,
      error: null,
    };
  } catch (error) {
    return {
      status: 'failed',
      path: null,
      error: JSON.stringify(error),
    };
  }
};

const uploadMutipleFiles = async (fileArr) => {
  uploadPath = path.resolve(__dirname, '../public/image/upload/');
  let resultArr = [];
  let countSuccess = 0;
  for (let i = 0; i < fileArr.length; i++) {
    let exName = path.extname(fileArr[i].name);
    let basename = path.basename(fileArr[i].name, exName);
    let finalName = `${basename}-${timestamp}-${exName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    try {
      await fileArr[i].mv(finalPath);
      resultArr.push({
        status: 'success',
        path: finalName,
        fileName: fileArr[i].name,
        error: null,
      });
      countSuccess++;
    } catch (error) {
      resultArr.push({
        status: 'failed',
        path: null,
        fileName: fileArr[i].name,
        error: JSON.stringify(error),
      });
    }
  }
};

module.exports = {
  uploadSingleFile,
  uploadMutipleFiles,
};
