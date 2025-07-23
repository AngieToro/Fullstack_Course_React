const LoginForm = ( {
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLoginSubmit
}) => (

  <div className="card-form">
    <h1>LogIn to application</h1>
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

export default LoginForm