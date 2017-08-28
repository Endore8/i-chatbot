import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.buttonClassName = ""
  }

  handleClick (e) {
    e.preventDefault()

    this.props.onAction(this.props.title, this.props.callback)
  }

  render () {
    return (
      <button className={this.buttonClassName} onClick={this.handleClick}>{this.props.title}</button>
    )
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  callback: PropTypes.func,
  onAction: PropTypes.func.isRequired
}

export default Button
