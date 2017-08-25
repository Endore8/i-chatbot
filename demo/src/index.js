import React, { Component } from 'react'
import { render } from 'react-dom'

import ChatBot, { ChatBotUtil } from '../../src'

import './index.css'

class Demo extends Component {

  constructor (props) {
    super(props)

    this._onClick = this._onClick.bind(this)
    this._onGetStarted = this._onGetStarted.bind(this)
    this._onQuickReplyAction = this._onQuickReplyAction.bind(this)
    this._onTextInputSubmit = this._onTextInputSubmit.bind(this)
  }

  _onClick (e) {
    e.preventDefault()

    this.chatbot.simulate('Get Started', 'GET-STARTED')
  }

  _onGetStarted () {
    return [
      ChatBotUtil.textMessage(['Hi!', 'Hey there!'].any()),
      ChatBotUtil.textMessage(['How is life?', 'What\'s up?'].any(),
        ChatBotUtil.makeReplyButton('Great!', 'INTRO'))
    ]
  }

  _onQuickReplyAction (postback) {
    switch (postback) {
      case 'INTRO':
        return [
          ChatBotUtil.textMessage('That\'s good to hear!'),
          ChatBotUtil.textMessage('Want to know more about me?',
            ChatBotUtil.makeReplyButton('Sure!', 'ABOUT'),
            ChatBotUtil.makeReplyButton('Nope', 'END'))
        ]

      case 'ABOUT':
        return [
          ChatBotUtil.textMessage('I\'m a chatbot! 🤖'),
          ChatBotUtil.textMessage('And u?',
            ChatBotUtil.makeTextInputField('Send', 'Your name', 'USER-NAME'))
        ]

      case 'END':
        return [
          ChatBotUtil.textMessage('Ok, that\'s it for today'),
          ChatBotUtil.textMessage('Come back later! 😉',
            ChatBotUtil.makeReplyButton('Bye', 'BYE'))
        ]
    }
  }

  _onTextInputSubmit (value, postback) {
    switch (postback) {
      case 'USER-NAME':
        return [
          ChatBotUtil.textMessage(`Welcome ${value}!`,
            ChatBotUtil.makeReplyButton('Nice!', 'END')
          )
        ]
    }
  }

  render () {
    return (
      <div className="Demo Container">
        <div className="Content">
          <h1>i-chatbot demo</h1>
          <ChatBot ref={(cb) => {this.chatbot = cb}}
                   onGetStarted={this._onGetStarted}
                   onQuickReplyAction={this._onQuickReplyAction}
                   onTextInputSubmit={this._onTextInputSubmit}
                   getStartedButton={ChatBotUtil.makeGetStartedButton('Get Started')} />
          <div className="Actions">
            <button onClick={this._onClick}>Simulate Get Started</button>
          </div>
        </div>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
