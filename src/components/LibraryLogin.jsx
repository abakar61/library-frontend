import { useState } from 'react'
import LibraryButton from './LibraryButton'

function LibraryLogin() {
  const [hasAccount, setHasAccount] = useState(true)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  function switchForm() {
    setHasAccount(!hasAccount)
  }

  function loginAction() {
    alert("This is your username " + userName + " and password " + password)
  }

  if (hasAccount) {
    return (
      <div style={{ border: "3px solid blue", marginTop: "190px" }}>
        <label>UserName:</label>
        <input
          type="text"
          placeholder="Enter Your username"
          onChange={e => setUserName(e.target.value)}
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <br />

        <LibraryButton buttonLabel="LOGIN" onClickButton={loginAction} />
        <br />

        <label>New here? </label>
        <LibraryButton buttonLabel="Create Account" onClickButton={switchForm} />
      </div>
    )
  }

  return (
    <div style={{ border: "3px solid indigo", marginTop: "190px" }}>
      <label>Student ID:</label>
      <input type="text" placeholder="Enter Your Student ID" />
      <br />

      <label>Email:</label>
      <input type="email" />
      <br />

      <label>Password:</label>
      <input type="password" />
      <br />

      <label>Confirm Password:</label>
      <input type="password" />
      <br />

      <LibraryButton buttonLabel="Create Account" />
      <br />

      <label>Already have an account? </label>
      <LibraryButton buttonLabel="Sign In" onClickButton={switchForm} />
    </div>
  )
}

export default LibraryLogin
