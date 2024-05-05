import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import { setUser } from '../../reducers/user';

import { useHttp } from '../../hooks/http.hook';

import FieldSelect from '../FieldSelect/FieldSelect';
import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';
import { KeyInfoTable, KeyInfoRow } from '../KeyInfoTable/KeyInfoTable';

import { CreateKeyForm, Server, Store, User, ServerOption } from '../../types';

const CreateSchema = Yup.object()
  .shape({
    name: Yup.string()
      .required('Required')
      .min(3, 'The minimum is 3 characters')
      .max(25, 'The maximum is 25 characters'),
    server: Yup.object().required('Required'),
  })
  .required('Required');

const CreateKey = () => {
  const { telegramId } = useSelector<Store, User>((state) => state.user);
  const dispatch = useDispatch();

  const { request, process, loading, errorText } = useHttp();

  const [serversOption, setServersOptions] = useState<ServerOption[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    request('/api/getServers').then((response) => {
      const options = response?.map((server: Server) => {
        return {
          value: server.name,
          label: `${getUnicodeFlagIcon(server.abbreviatedCountry)} ${
            server.name
          } (${server.country})`,
          price: server.price,
          country: server.country,
          abbreviatedCountry: server.abbreviatedCountry,
        };
      });

      setServersOptions(options);
    });
  }, []);

  const onSubmit = async (values: CreateKeyForm) => {
    try {
      // console.log(values);
      const { user, key } = await request('/api/createKey', 'POST', {
        name: values.name,
        server: values.server!.value,
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
      initialValues={{
        name: '',
      }}
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
            <FieldSelect
              name='server'
              placeholder='Choose server'
              options={serversOption}
            />
          </label>
          {values.server?.value ? (
            <KeyInfoTable>
              <KeyInfoRow name='Price' onlyAdmin={false}>
                <>{`${
                  serversOption.find(
                    (item) => values.server?.value === item.value
                  )?.price
                } rub/mes`}</>
              </KeyInfoRow>
              <KeyInfoRow name='Country' onlyAdmin={false}>
                <>
                  {`${
                    serversOption.find(
                      (item) => values.server?.value === item.value
                    )?.country
                  } ${getUnicodeFlagIcon(
                    serversOption.find(
                      (item) => values.server?.value === item.value
                    )?.abbreviatedCountry || ''
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
