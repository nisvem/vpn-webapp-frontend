import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useHttp } from '../../hooks/http.hook';

import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';
import { InfoTable, InfoRow } from '../InfoTable/InfoTable';

import { EditUserForm, User } from '../../types';
import { useNavigate } from 'react-router-dom';

const EditUserSchema = Yup.object()
  .shape({
    isAdmin: Yup.boolean().required('Required'),
    isLimitedToCreate: Yup.boolean().required('Required'),
    maxKeyAvalible: Yup.number().min(0).required("It's must be number"),
  })
  .required('Required');

const EditUser = ({ user }: { user: User }) => {
  const { request, process, loading, errorText } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const onSubmit = async (values: EditUserForm) => {
    console.log(values);
    // try {
    //   const response = await request('/api/editKey', 'POST', {
    //     telegramId: user.telegramId,
    //     isAdmin: values.isAdmin,
    //     isLimitedToCreate: values.isLimitedToCreate,
    //     maxKeyAvalible: values.maxKeyAvalible,
    //   });

    //   navigate(`/users/${response.telegramId}`);
    // } catch (e) {
    //   console.error(e);
    // }
  };
  return process === 'error' ? (
    <>
      <Error text={errorText}></Error>
    </>
  ) : loading ? (
    <Spiner />
  ) : (
    <Formik
      initialValues={{
        isAdmin: user.isAdmin,
        isLimitedToCreate: user.isLimitedToCreate,
        maxKeyAvalible: user.maxKeyAvalible,
      }}
      onSubmit={onSubmit}
      validationSchema={EditUserSchema}
    >
      {({ errors, touched }) => (
        <Form className='w-full flex flex-col flex-1 gap-4'>
          <InfoTable>
            <InfoRow name='Name' onlyAdmin={true}>
              <p>
                {user.name} {user.surname || ''}
              </p>
            </InfoRow>
            <InfoRow name='Nickname' onlyAdmin={true}>
              <a
                href={`https://t.me/${user?.username}`}
                target='_blank'
              >{`@${user?.username}`}</a>
            </InfoRow>
            <InfoRow name='TelegramId' onlyAdmin={true}>
              <p>{user.telegramId}</p>
            </InfoRow>
            <InfoRow name='Admin' onlyAdmin={true}>
              <label className='checkbox-label'>
                <Field name='isAdmin' type='checkbox' className='hidden' />
                <span className='checkbox'></span>
                {errors.isAdmin && touched.isAdmin ? (
                  <p className='alert mt-2' role='alert'>
                    {errors.isAdmin}
                  </p>
                ) : null}
              </label>
            </InfoRow>
            <InfoRow name='Limited to create' onlyAdmin={true}>
              <label className='checkbox-label'>
                <Field
                  name='isLimitedToCreate'
                  type='checkbox'
                  className='hidden'
                />
                <span className='checkbox'></span>
                {errors.isLimitedToCreate && touched.isLimitedToCreate ? (
                  <p className='alert mt-2' role='alert'>
                    {errors.isLimitedToCreate}
                  </p>
                ) : null}
              </label>
            </InfoRow>
            <InfoRow name='Keys avalible' onlyAdmin={true}>
              <label className=''>
                <Field
                  name='maxKeyAvalible'
                  type='number'
                  className={`input p-1 ${
                    errors.maxKeyAvalible ? 'error' : ''
                  }`}
                />
                {errors.maxKeyAvalible && touched.maxKeyAvalible ? (
                  <p className='alert mt-2' role='alert'>
                    {errors.maxKeyAvalible}
                  </p>
                ) : null}
              </label>
            </InfoRow>
          </InfoTable>

          <button
            className='btn w-full mt-auto'
            type='submit'
            disabled={Object.entries(errors).length ? true : false}
          >
            Edit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditUser;
