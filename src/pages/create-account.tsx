import React from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AppleMutation,
  AppleMutationVariables,
  UserRole,
} from '../__generated__/graphql';
import { useForm } from 'react-hook-form';
import { Button } from '../components/button';
import { gql, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const CREATE_ACCOUNT_MUTAION = gql(`
  mutation apple($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`);

type ICreateAccountForm = {
  email: string;
  password: string;
  role: UserRole;
};

export const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { errors },
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
  });

  const onCompleted = (data: AppleMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
    }
  };

  const [mutateFunction, { data, loading, error }] = useMutation<
    AppleMutation,
    AppleMutationVariables
  >(CREATE_ACCOUNT_MUTAION, {
    onCompleted,
  });
  const onSubmit = ({ email, password, role }: ICreateAccountForm) => {
    mutateFunction({
      variables: {
        createAccountInput: {
          email,
          password,
          role,
        },
      },
    });
  };

  return (
    <div className='h-screen flex items-center flex-col mt-10 lg:mt-28'>
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className='w-full max-w-screen-sm flex flex-col px-5 items-center'>
        {/* <img src={nuberLogo} className="w-52 mb-10" alt="Nuber Eats" /> */}
        <h4 className='w-full font-medium text-left text-3xl mb-5'>
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-3 mt-5 w-full mb-5'
        >
          <input
            {...register('email', {
              required: 'Email is required',
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name='email'
            required
            type='email'
            placeholder='Email'
            className='input'
          />
          <input
            {...register('password', { required: 'Password is required' })}
            required
            name='password'
            type='password'
            placeholder='Password'
            className='input'
          />
          {/* {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )} */}
          <select className='input' {...register('role', { required: true })}>
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={'Create Account'}
          />
          {/* {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )} */}
        </form>
        <div>
          <FontAwesomeIcon icon={faUser} /> Already have an account?
          <Link to='/' className='text-lime-600 hover:underline'>
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};