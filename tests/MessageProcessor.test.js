import expect from 'expect'

import MessageProcessor from 'src/chatbot/MessageProcessor'

describe('MessageProcessor', () => {
  it('Processes a message with a delay', (done) => {
    const msgVal = {content: {text: 'Hi!'}}
    const now = new Date().getTime()

    const processor = new MessageProcessor((msg) => {
      expect(processor.isProcessing).toEqual(false)
      expect(msg).toEqual(msgVal)
      expect(new Date().getTime() - now).toBeGreaterThan(MessageProcessor.minTypingSpeed)
      done()
    })
    processor.process(msgVal)
    expect(processor.isProcessing).toEqual(true)
  })

  it('Processes only a correct message object', () => {
    const processor = new MessageProcessor(() => {})

    expect(processor.process({content: {text: 'Hi! It\'s a correct message.'}})).toEqual(true)
    expect(processor.process({text: 'Hi! This is a test message.'})).toEqual(false)
    expect(processor.process('Hi! This is a test message.')).toEqual(false)
    expect(processor.process(1234)).toEqual(false)
    expect(processor.process({content: {text: 'Hi again!'}})).toEqual(true)
  })

  it('Typing speed is normalized', () => {
    expect(MessageProcessor.typingSpeed('Hi')).toEqual(MessageProcessor.minTypingSpeed)
    expect(MessageProcessor.typingSpeed('Hello there!')).toEqual(1200)
    expect(MessageProcessor.typingSpeed('Hi! A test case for typing!'))
      .toBeGreaterThan(MessageProcessor.minTypingSpeed)
      .toBeLessThan(MessageProcessor.maxTypingSpeed)
    expect(MessageProcessor.typingSpeed('Hello there! I\'m your test case for typing speed! And I\'m super looooooooooooooooooooooooooooooooong!'))
      .toEqual(MessageProcessor.maxTypingSpeed)
  })

  it('Typing speed is zero for no text', () => {
    expect(MessageProcessor.typingSpeed()).toEqual(0)
  })

  it('Resets a state correctly', (done) => {
    const processor = new MessageProcessor(() => {
      throw new Error('Should not be called')
    })

    const object = {content: {text: 'Hi!'}}
    processor.process(object)
    expect(processor.isProcessing).toEqual(true)
    processor.reset()
    expect(processor.isProcessing).toEqual(false)

    setTimeout(() => {
      done()
    }, MessageProcessor.typingSpeed(object.content.text))
  })
})
