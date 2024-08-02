'use client';
import { useSelect } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import { useEffect } from 'react';

export const PostEdit: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      resource: 'customers',
      redirect: false,
      // You can define all properties provided by Refine useForm
    },
  });

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <div>
        <label>email: </label>
        <input {...register('email', { required: true })} />
        {errors.email && <span>This field is required</span>}
      </div>

      <div>
        <label>password: </label>
        <input {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
      </div>

      <input type="submit" value="Submit" />
      {formLoading && <p>Loading</p>}
    </form>
  );
};

export default PostEdit;
