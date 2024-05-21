import { useEffect } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useHttp } from '../../hooks/http.hook';

import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';
import { InfoTable, InfoRow } from '../InfoTable/InfoTable';

import { EditKeyForm, Key } from '../../types';
import { useNavigate } from 'react-router-dom';

import './EditKey.scss';

const EditKeySchema = Yup.object()
  .shape({
    name: Yup.string()
      .required('Required')
      .min(3, 'The minimum is 3 characters')
      .max(25, 'The maximum is 25 characters'),
    currentPrice: Yup.number().min(10).required("It's must be number"),
    lastPayment: Yup.date(),
    nextPayment: Yup.date().required('Required'),
  })
  .required('Required');

const EditKey = ({ dataKey }: { dataKey: Key }) => {
  const { request, process, loading, errorText } = useHttp();

  useEffect(() => {}, []);
  const navigate = useNavigate();

  const onSubmit = async (values: EditKeyForm) => {
    console.log(values);
    try {
      const response = await request('/api/editKey', 'POST', {
        id: dataKey._id,
        name: values.name,
        currentPrice: values.currentPrice,
        lastPayment: values.lastPayment,
        nextPayment: values.nextPayment,
      });

      navigate(`/keys/${response._id}`);
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
        name: dataKey.name,
        currentPrice: dataKey?.currentPrice || 0,
        lastPayment: dataKey?.lastPayment
          ? new Date(dataKey?.lastPayment)
          : undefined,
        nextPayment: dataKey?.nextPayment
          ? new Date(dataKey?.nextPayment)
          : undefined,
      }}
      onSubmit={onSubmit}
      validationSchema={EditKeySchema}
    >
      {({ errors, touched }) => (
        <Form className='w-full h-full flex flex-col flex-1 gap-4'>
          <InfoTable>
            <InfoRow name='Name' onlyAdmin={true}>
              <>
                <label className='flex items-center justify-center gap-1'>
                  <Field
                    name='name'
                    type='text'
                    className={`input ${errors.name ? 'error' : ''}`}
                  />
                </label>
                {errors.name && touched.name ? (
                  <p className='alert mt-2' role='alert'>
                    {errors.name}
                  </p>
                ) : null}
              </>
            </InfoRow>
            <InfoRow name='Owner' onlyAdmin={true}>
              <>
                {dataKey.user?.name ? (
                  <p>{`Name: ${dataKey.user?.name}`}</p>
                ) : null}
                {dataKey.user?.surname ? (
                  <p>{`Lastname: ${dataKey.user?.surname}`}</p>
                ) : null}
                {dataKey.user?.telegramId ? (
                  <p>{`TelegramId: ${dataKey.user?.telegramId}`}</p>
                ) : null}
                {dataKey.user?.username ? (
                  <p>
                    <a
                      href={`https://t.me/${dataKey.user?.username}`}
                      target='_blank'
                    >{`@${dataKey.user?.username}`}</a>
                  </p>
                ) : null}
              </>
            </InfoRow>

            {dataKey.server ? (
              <InfoRow name='Server' onlyAdmin={true}>
                <span>
                  {`${dataKey.server.name} (${
                    dataKey.server.country
                  }) ${getUnicodeFlagIcon(dataKey.server.abbreviatedCountry)}`}
                </span>
              </InfoRow>
            ) : null}

            <InfoRow name='Price' onlyAdmin={true}>
              <>
                <label className='flex items-center justify-center gap-2 my-auto'>
                  <Field
                    name='currentPrice'
                    type='number'
                    step='50'
                    className={`input !p-0 text-right  ${
                      errors.currentPrice ? 'error' : ''
                    }`}
                  />
                  <p className='mr-auto'>rub/mes</p>
                </label>
                {errors.currentPrice && touched.currentPrice ? (
                  <p className='alert mt-2' role='alert'>
                    {errors.currentPrice}
                  </p>
                ) : null}
              </>
            </InfoRow>

            <InfoRow name='Last Payment' onlyAdmin={true}>
              <>
                <Field name='lastPayment'>
                  {({ field, form }: FieldProps<string>) => (
                    <DatePicker
                      {...field}
                      dateFormat='dd/MM/yyyy'
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(val) => form.setFieldValue(field.name, val)}
                    />
                  )}
                </Field>
                {errors.lastPayment && touched.lastPayment ? (
                  <p className='alert mt-2' role='alert'>
                    {errors.lastPayment}
                  </p>
                ) : null}
              </>
            </InfoRow>

            <InfoRow name='Next Payment' onlyAdmin={true}>
              <>
                <Field name='nextPayment'>
                  {({ field, form }: FieldProps<string>) => (
                    <DatePicker
                      {...field}
                      dateFormat='dd/MM/yyyy'
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(val) => form.setFieldValue(field.name, val)}
                    />
                  )}
                </Field>
                {errors.nextPayment && touched.nextPayment ? (
                  <p className='alert mt-2' role='alert'>
                    {errors.nextPayment}
                  </p>
                ) : null}
              </>
            </InfoRow>
          </InfoTable>

          <button
            className='btn w-full mt-auto'
            type='submit'
            disabled={
              Object.entries(errors).length || !Object.entries(touched).length
                ? true
                : false
            }
          >
            Edit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditKey;
