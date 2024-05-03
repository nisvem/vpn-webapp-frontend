import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import { setUser } from '../../actions/user';

import { useHttp } from '../../hooks/http.hook';

import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';
import { KeyInfoTable, KeyInfoRow } from '../KeyInfoTable/KeyInfoTable';

import { CreateKeyForm, Server, Store, User } from '../../types';

import './CreateKey.scss';

const CreateSchema = Yup.object()
  .shape({
    name: Yup.string()
      .required('Required')
      .min(3, 'The maximum is 3 characters')
      .max(25, 'The minimum is 25 characters'),
    server: Yup.string().required('Required'),
  })
  .required();

const CreateKey = () => {
  const [servers, setServers] = useState<Server[]>([]);

  const { request, process, loading, errorText } = useHttp();
  const navigate = useNavigate();

  const { telegramId } = useSelector<Store, User>((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    request('/api/getServers').then((response) => {
      setServers(response);
    });
  }, []);

  const onSubmit = async (values: CreateKeyForm) => {
    try {
      const { user, key } = await request('/api/createKey', 'POST', {
        name: values.name,
        server: values.server,
      });
      user.telegramId === telegramId ? dispatch(setUser(user)) : null;
      navigate(`/key/${key.id}/`);
    } catch (e) {}
  };
  return process === 'error' ? (
    <>
      <Error text={errorText}></Error>
    </>
  ) : loading ? (
    <Spiner />
  ) : (
    <Formik
      initialValues={{ name: '', server: '' }}
      onSubmit={onSubmit}
      validationSchema={CreateSchema}
    >
      {({ errors, touched, values }) => (
        <Form className='w-full flex flex-col flex-1 gap-4'>
          <label>
            <Field
              name='name'
              placeholder='Name'
              className={`input ${
                errors.name && touched.name
                  ? 'error'
                  : touched.name
                  ? 'valid'
                  : ''
              }`}
            />
            {errors.name && touched.name ? (
              <p className='alert' role='alert'>
                {errors.name}
              </p>
            ) : null}
          </label>

          <label>
            <Field
              as='select'
              name='server'
              className={`input ${
                errors.server && touched.server
                  ? 'error'
                  : touched.server
                  ? 'valid'
                  : ''
              }`}
            >
              <>
                <option value=''>Choose server</option>
                {servers.map((server, i) => (
                  <option key={i} value={server.name}>
                    {`${server.name} (${server.country}) ${getUnicodeFlagIcon(
                      server.abbreviatedCountry
                    )}`}
                  </option>
                ))}
              </>
            </Field>
            {errors.server && touched.server ? (
              <p className='alert' role='alert'>
                {errors.server}
              </p>
            ) : null}
          </label>
          {values.server ? (
            <KeyInfoTable>
              <KeyInfoRow name='Price' onlyAdmin={false}>
                <>{`${
                  servers.find((item) => values.server === item.name)?.price
                } rub/mes`}</>
              </KeyInfoRow>
              <KeyInfoRow name='Country' onlyAdmin={false}>
                <>
                  {`${
                    servers.find((item) => values.server === item.name)?.country
                  } ${getUnicodeFlagIcon(
                    servers.find((item) => values.server === item.name)
                      ?.abbreviatedCountry || ''
                  )}`}
                </>
              </KeyInfoRow>
            </KeyInfoTable>
          ) : null}

          <button
            className='btn w-full mt-auto'
            type='submit'
            disabled={
              Object.entries(errors).length || !Object.entries(touched).length
                ? true
                : false
            }
          >
            Create
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateKey;
