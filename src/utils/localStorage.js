export const checkStorage = () => {
  if (window.localStorage.getItem('todosData')) {
    try {
      return JSON.parse(window.localStorage.getItem('todosData'))
    } catch (e) {
      window.localStorage.removeItem('todosData')
      throw e
    }
  } else {
    return null
  }
}

export const saveToStorage = (value) => window.localStorage.setItem('todosData', JSON.stringify(value))




