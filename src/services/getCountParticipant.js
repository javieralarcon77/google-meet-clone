export const getCountParticipant = async ({ roomname}) => {
  try {
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:4200' : ''
    const response = await fetch( url + '/get_count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roomname })
    })
  
    const data = await response.json()
    return data.count;
  }catch (e) {
    console.log(e)
  }
  return 0
}