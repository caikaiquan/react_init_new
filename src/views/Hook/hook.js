import React, { useState } from 'react'


const HookStudy = () => {
  const [userName, setUserName] = useState('张三丰')

  const handleChangeName = (name) => {
    setUserName(name) 
    console.log(userName,'changeName-click')
    setTimeout(() => {
      console.log(userName,'changeName-click') 
    }, 1000);
  }

  return (
    <div className="Hook">
      <h1>这里是Hook学习</h1>
      <p>用户名：{userName}</p>
      <button onClick={() => {handleChangeName('赵云')}}>Change Name</button>
    </div>
  )
}

export default HookStudy