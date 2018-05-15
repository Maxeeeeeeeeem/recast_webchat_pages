import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store'

import { getChannelPreferences } from 'actions/channel'
import App from 'containers/App'

document.body.innerHTML += '<div id="recast-webchat-div"></div>'
const root = document.getElementById('recast-webchat-div')
const script = document.currentScript || document.getElementById('recast-webchat')

const channelId = script.getAttribute('channelId')
const token = script.getAttribute('token')

if (root && channelId && token) {
  getChannelPreferences(channelId, token).then(preferences => {

  	// MU: overriding preferences

  	// preferences.conversationTimeToLive
    preferences.openingType = "never"

    // style : (TODO)
    //preferences.complementaryColor = "#FFFFFF"
    //preferences.accentColor = "#c79d4c"
    //preferences.backgroundColor = "#F2F2F2"
    preferences.botMessageColor = "#6f7076"

    // Expander (white)
    preferences.expanderLogo = "https://res.cloudinary.com/hz4pj1unt/image/upload/c_scale,h_133,w_133/v1524563757/brand/IconeEdmonRVB_Blanc.png"
    
    // Avatar
    var expanderTitle = $("#user-details-expander-title").attr('content');
    if (expanderTitle === undefined) {
      preferences.expanderTitle = "Commencer l'expérience EDMON"
      preferences.onboardingMessage = "Une question fiscale ?"
    } else {
      preferences.expanderTitle = expanderTitle
      preferences.onboardingMessage = ""
    }


    // header (< 768px)
    preferences.headerLogo = preferences.expanderLogo
    preferences.headerTitle = "Discussion avec votre Conseiller Patrimonial"
    
    // bot picture
    preferences.botPicture = "https://res.cloudinary.com/hz4pj1unt/image/upload/c_scale,h_133,w_133/v1524550940/brand/IconeEdmonRVB_Ocre.png"

    // Avatar
    var userPicture = $("#user-details-avatar").attr('content');
    if (userPicture === undefined) {
      // use default userPicture
      // preferences.userPicture = "https://res.cloudinary.com/hz4pj1unt/image/upload/c_scale,w_133/v1524551016/website_assets/avatar.jpg"
    } else {
      preferences.userPicture = userPicture
    }

    // Welcome Message
    var userWelcomeMessage = $("#user-details-welcome-message").attr('content');
    if (userWelcomeMessage === undefined) {
      // use default message
      // preferences.welcomeMessage = "Bonjour, je suis Edmon, je peux répondre à vos questions fiscales."
    } else {
      preferences.welcomeMessage = userWelcomeMessage
    }

    // Close button
    preferences.closeButton = "https://cdn.recast.ai/webchat/close.svg"

    ReactDOM.render(
      <Provider store={store}>
        <App token={token} channelId={channelId} preferences={preferences} />
      </Provider>,
      root,
    )
  })
}
