const $ = selector => document.querySelector(selector)

const $userNameInput = $('#username')
const $form = $('#form')
const $joinButton = $('#join')
const $container = $('#container')
const $count = $('#count')

const MAX_PARTICIPANTS = 2

let connected = false
let room

async function addLocalVideo () {
  const $localVideo = document.getElementById('local-video')
  const track = await Twilio.Video.createLocalVideoTrack()
  $localVideo.appendChild(track.attach())
}

addLocalVideo()

$form.addEventListener('submit', async (e) => {
  e.preventDefault()

  if (connected) {
    disconnect()
    return
  }

  const username = $userNameInput.value
  if (!username) return alert('Please provide an username')

  $joinButton.disabled = true
  $joinButton.innerText = 'Connecting...'

  try {
    await connect({username})
  } catch (e) {
    console.error(e)
    alert('Failed to connect')
    enableButton()
  }
})

async function connect ({username}) {
  const response = await fetch('/get_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username})
  })

  const data = await response.json()
  await connectWithToken(data.token)
}

async function connectWithToken (token) {
  room = await Twilio.Video.connect(token)
  room.participants.forEach(participantConnected)
  room.on('participantConnected', participantConnected)
  room.on('participantDisconnected', participantDisconnected)
  connected = true
  updateParticipantCount()
  enableButton('Leave the room')
}

function enableButton (text = 'Join the room') {
  $joinButton.disabled = false
  $joinButton.innerText = text
}

function disconnect () {
  room.disconnect()
  // quitar la cámara de los divs
  connected = false
  $container.querySelectorAll('.participant:not([id=local])').forEach(element => {
    element.remove()
  })
  enableButton()
  updateParticipantCount(0)
}

function updateParticipantCount (count = -1) {
  $count.innerHTML = `${count == -1 ? room.participants.size + 1 : 0} online users`
}

function participantConnected (participant) {
  const template = `<div id='participant-${participant.sid}' class="participant">
    <div class="video"></div>
    <div>${participant.identity}</div>
  </div>`

  $container.insertAdjacentHTML('beforeend', template)

  participant.tracks.forEach(localTrackPublication => {
    const {isSubscribed, track} = localTrackPublication
    if (isSubscribed) attachTrack(track)
  })

  participant.on('trackSubscribed', attachTrack)
  participant.on('trackUnsubscribed', track => track.detach())
  updateParticipantCount()
}

function attachTrack (track) {
  const $video = $container.querySelector(`.participant:last-child .video`)
  $video.appendChild(track.attach())
}

function participantDisconnected (participant) {
  $(`#participant-${participant.sid}`).remove()
  updateParticipantCount()
  //console.log('participant disconnected')
}