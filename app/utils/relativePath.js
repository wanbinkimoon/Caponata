const path = require('path')

module.exports = function definePath(folder, dest){
  const absolutePath = __dirname.split('/')
  const appFolderIndex = absolutePath.indexOf(folder)
  const projectFolderIndex = appFolderIndex - 1
  const projectFolder = `${absolutePath.splice(0, projectFolderIndex + 1).join('/')}` 
  const appFolder = `${absolutePath.splice(projectFolder, absolutePath.length).join('/')}`
  const relativePath = path.join(`/${projectFolder}`, `/${folder}`, dest)

  return relativePath
}