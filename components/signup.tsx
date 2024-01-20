"use client" 
import React from 'react';
import { useSession,signIn } from 'next-auth/react';

const SignupPage = () => {
  const { data: session } = useSession();

  if (session) {
    return <h1>You are already logged in!</h1>;
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <p>Choose a method to continue:</p>
      <a href="/api/auth/signin"
           onClick={(e) => {
           e.preventDefault()
           signIn()
        }}>Google</a>
      <button onClick={() => signIn('facebook')}>Sign Up with Facebook</button>
    </div>
  );
};

export default SignupPage;
