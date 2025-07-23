import PropTypes from 'prop-types'

const LoginForm = ( {
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLoginSubmit
}) => (

  <div>
    <h2>LogIn to application</h2>
    <form onSubmit={ handleLoginSubmit }>
      <div>
        Username
        <input
          title='username'
          type="text"
          value={ username }
          name="Username"
          onChange={ handleUsernameChange }
        />
      </div>
      <div>
        Password
        <input
          title='password'
          type="password"
          value={ password }
          name="Password"
          onChange={ handlePasswordChange }
        />
      </div>
      <p>
        <button type="submit">Login</button>
      </p>
    </form>
  </div>
)

LoginForm.PropTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleLoginSubmi: PropTypes.func.isRequired
}

export default LoginForm