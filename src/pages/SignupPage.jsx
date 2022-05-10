import React from 'react'
import Base from '../components/shared/Base'
import Signup from '../components/signup/Signup'

const SignupPage = () => {
  return (
    <Base isHeaderRequired={false}>
      <Signup />
    </Base>
  )
}

export default SignupPage;