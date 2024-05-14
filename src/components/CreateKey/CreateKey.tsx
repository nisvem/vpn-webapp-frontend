import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import { setUser } from '../../reducers/user';

import { useHttp } from '../../hooks/http.hook';

import FieldSelect from '../FieldSelect/FieldSelect';
import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';
import { InfoTable, InfoRow } from '../InfoTable/InfoTable';

import { CreateKeyForm, Server, Store, User, Option } from '../../types';
import { useNavigate } from 'react-router-dom';

const CreateSchema = Yup.object()
  .shape({
    user: Yup.object().required('Required'),
    name: Yup.string()
      .required('Required')
      .min(3, 'The minimum is 3 characters')
      .max(25, 'The maximum is 25 characters'),
    server: Yup.object().required('Required'),
  })
  .required('Required');

const CreateKey = () => {
  const { telegramId, isAdmin } = useSelector<Store, User>(
    (state) => state.user
  );
  const user = useSelector<Store, User>((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { request, process, loading, errorText } = useHttp();

  const [serversOption, setServersOptions] = useState<Option[]>([]);
  const [userOption, setUserOptions] = useState<Option[]>([
    {
      value: user.telegramId,
      label: `${user.name} ${user.surname} / @${user.username}`,
    },
  ]);

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

    if (isAdmin) {
      try {
        request('/api/getUsers').then((response) => {
          const options = response?.map((user: User) => {
            return {
              value: user.telegramId,
              label: `${user.name} ${user.surname} / @${user.username}`,
            };
          });

          setUserOptions(options);
        });
      } catch {}
    }
  }, []);

  const onSubmit = async (values: CreateKeyForm) => {
    try {
      const response = await request('/api/createKey', 'POST', {
        name: values.name,
        server: values.server!.value,
        user: values.user!.value,
      });
      response.user.telegramId === telegramId
        ? dispatch(setUser(response.user))
        : null;
      navigate(`/keys/${response.key._id}`);
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
        name: '',
        user: userOption[0],
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

          {isAdmin ? (
            <label>
              <FieldSelect
                name='user'
                placeholder='Choose user'
                options={userOption}
              />
            </label>
          ) : (
            <label className='hidden'>
              <FieldSelect
                name='user'
                placeholder='Choose user'
                options={userOption}
              />
            </label>
          )}

          <label>
            <FieldSelect
              name='server'
              placeholder='Choose server'
              options={serversOption}
            />
          </label>
          {values.server?.value ? (
            <InfoTable>
              <InfoRow name='Price' onlyAdmin={false}>
                <>{`${
                  serversOption.find(
                    (item) => values.server?.value === item.value
                  )?.price
                } rub/mes`}</>
              </InfoRow>
              <InfoRow name='Country' onlyAdmin={false}>
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
              </InfoRow>
            </InfoTable>
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
