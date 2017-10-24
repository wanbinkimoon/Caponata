module.exports = function defaultFolder(){
  const standards = ['dev', 'app', 'src']
  const absolutePath = __dirname.split('/')
  const matchingPath = standards.filter(d => absolutePath.indexOf(d) > 0 && d).toString()

  return matchingPath 

}