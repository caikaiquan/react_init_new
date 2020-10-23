 const BaseParam = {
  baseUrl: 
      process.env.REACT_APP_PATH === "development" ? '开发环境' :
      process.env.REACT_APP_PATH === "beta" ? 'beta测试环境' : 
      process.env.REACT_APP_PATH === "testing" ? 'testing测试环境' : 
      process.env.REACT_APP_PATH === "production" ? '生产环境': 
                                      '开发环境',
};

export default BaseParam