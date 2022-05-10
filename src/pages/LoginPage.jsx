import React from 'react'
import Login from '../components/login/Login'
import Base from '../components/shared/Base'

const LoginPage = () => {
  return (
    <Base isHeaderRequired={false}>
      <Login />
    </Base>
  )
}

export default LoginPage;