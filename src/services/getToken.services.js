export const getToken = async ({username, roomname}) => {
  try {
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:4200' : ''
    const response = await fetch( url + '/get_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, roomname })
    })
  
    const data = await response.json()
    return data.token;
  }catch (e) {
    console.log(e)
  }
  return null
}