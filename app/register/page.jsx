'use client';
import withAuth from '@components/PrivateRoute'
import RegisterForm from '@components/RegisterForm'

const Register = () => {
  return (
    <div>
        <RegisterForm />
    </div>
  )
}

export default withAuth(Register)