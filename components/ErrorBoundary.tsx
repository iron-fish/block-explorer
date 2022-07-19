import React, { ReactNode, Component } from 'react'
import Error from 'pages/_error'

interface ErrorBoundaryProps {
  children?: ReactNode
}
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Error
          handleReload={() => this.setState({ hasError: false })}
          error={this.state.error}
        />
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
