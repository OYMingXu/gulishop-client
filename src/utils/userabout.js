// 用户相关的工具函数
// 用来生产用户的临时标识

import { v4 as uuidv4 } from 'uuid';

function getTempId() {
  let userId = localStorage.getItem("userId")

  if (!userId) {
    userId = uuidv4()
    localStorage.setItem("userId", userId)
  }

  return userId
}

export default getTempId