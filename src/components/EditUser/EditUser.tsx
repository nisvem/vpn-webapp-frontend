import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useHttp } from '../../hooks/http.hook';

import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';
import { InfoTable, InfoRow } from '../InfoTable/InfoTable';

import { EditUserForm, Store, User } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../reducers/user';

import './EditUser.scss';
import i18next from '../../lang';

const EditUserSchema = Yup.object()
  .shape({
    isAdmin: Yup.boolean().required(i18next.t('required')),
    isLimitedToCreate: Yup.boolean().required(i18next.t('required')),
    maxKeyAvalible: Yup.number().min(0).required("It's must be number"),
  })
  .required(i18next.t('required'));

const EditUser = ({ user }: { user: User }) => {
  const { telegramId } = useSelector<Store, User>((state) => state.user);
  const { request, process, loading, errorText } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values: EditUserForm) => {
    try {
      const response = await request('/api/editUser', 'POST', {
        telegramId: user.telegramId,
        isAdmin: values.isAdmin,
        isLimitedToCreate: values.isLimitedToCreate,
        maxKeyAvalible: values.maxKeyAvalible,
      });

      //? Такая реализация не работает, потому что срабатывает dispatch, но navigate не отправляет на новую страницу, почему-то ...
      // response.telegramId === telegramId ? dispatch(setUser(response)) : null;
      // navigate(`/users/${response.telegramId}`);

      //? А такая реализация работает, почему-то ...
      response.telegramId === telegramId ? dispatch(setUser(response)) : null;
      navigate(-1);
    } catch (e) {
      console.error(e);
    }
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
        <Form className='w-full h-full flex flex-col flex-1 gap-4'>
          <InfoTable>
            <InfoRow name={i18next.t('name')} onlyAdmin={true}>
              <p>
                {user.name} {user.surname || ''}
              </p>
            </InfoRow>
            {user?.username && (
              <InfoRow name={i18next.t('nickname')} onlyAdmin={true}>
                <a
                  href={`https://t.me/${user?.username}`}
                  target='_blank'
                >{`@${user?.username}`}</a>
              </InfoRow>
            )}

            {user?.phoneNumber && (
              <InfoRow name={i18next.t('phone')} onlyAdmin={true}>
                <a
                  href={`https://t.me/+${user?.phoneNumber}`}
                  target='_blank'
                >{` +${user?.phoneNumber}`}</a>
              </InfoRow>
            )}

            <InfoRow name='TelegramId' onlyAdmin={true}>
              <p>{user.telegramId}</p>
            </InfoRow>
            <InfoRow name={i18next.t('admin')} onlyAdmin={true}>
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
            <InfoRow name={i18next.t('limited_create')} onlyAdmin={true}>
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
            <InfoRow name={i18next.t('keys_avalible')} onlyAdmin={true}>
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
            {i18next.t('edit_user_btn')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditUser;
