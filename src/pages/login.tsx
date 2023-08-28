import React from 'react';
import { useForm } from 'react-hook-form';
import { gql } from '../__generated__';
import { useMutation } from '@apollo/client';

const LOGIN_MUTAION = gql(`
  mutation banana($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`);

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const [loginMutation, { data: resultData }] = useMutation(LOGIN_MUTAION);

  const onSubmit = (data: ILoginForm) => {
    const { email, password } = data;
    loginMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };
  return (
    <div className='h-screen flex items-center justify-center bg-gray-800'>
      <div className='bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center'>
        <h3 className='text-2xl text-gray-800'>Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-3 mt-5 px-5'
        >
          <input
            {...register('email', { required: 'Email is required' })}
            required
            type='email'
            placeholder='Email'
            className='input'
          />
          {errors.email?.message && (
            <span className='font-medium text-red-500'>
              {errors.email?.message}
            </span>
          )}
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: 4,
            })}
            required
            type='password'
            placeholder='Password'
            className='input'
          />
          {errors.password?.message && (
            <span className='font-medium text-red-500'>
              {errors.password?.message}
            </span>
          )}
          {errors.password?.type === 'minLength' && (
            <span className='font-medium text-red-500'>
              Password must be more than 4 chars.
            </span>
          )}
          <button className='mt-3 btn'>Log In</button>
          {resultData?.login?.error && (
            <span className='font-medium text-red-500'>
              {resultData?.login?.error}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};
