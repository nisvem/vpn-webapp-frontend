import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import 'react-datepicker/dist/react-datepicker.css';

import { useHttp } from '../../hooks/http.hook';

import Spiner from '../Spiner/Spiner';
import Error from '../Error/Error';
import { InfoTable, InfoRow } from '../InfoTable/InfoTable';
import date from 'date-and-time';

import { PaymentKeyForm, Key, Option, Tariff, Store, User } from '../../types';
import FieldSelect from '../FieldSelect/FieldSelect';
import WebApp from '@twa-dev/sdk';
import i18next from '../../lang';

const PaymentKeySchema = Yup.object()
  .shape({
    tariff: Yup.object().required(i18next.t('required')),
  })
  .required(i18next.t('required'));

const PaymentForm = ({ dataKey }: { dataKey: Key }) => {
  const { request, process, loading, errorText } = useHttp();
  const { telegramId } = useSelector<Store, User>((state) => state.user);
  const [ tariffOption, setTariffOption ] = useState<Option[]>([]);

  useEffect(() => {
    request('/api/getTariffs').then((response) => {
      const options = response?.map((tariff: Tariff) => {
        return {
          value: tariff._id,
          label: `${tariff.name} (${tariff.discountPercentage}%)`,
          days: tariff.days,
          discountPercentage: tariff.discountPercentage,
        };
      });

      options.sort((a: Tariff, b: Tariff) => a.days > b.days);

      setTariffOption(options);
    });
  }, []);

  const onSubmit = async (values: PaymentKeyForm) => {
    console.log(values);

    try {
      await request(`/api/getUrlPaymentToChat`, 'POST', {
        keyId: dataKey._id,
        tariffId: values.tariff!.value,
        telegramId: telegramId,
      });
      WebApp.close();
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
      initialValues={{} as PaymentKeyForm}
      onSubmit={onSubmit}
      validationSchema={PaymentKeySchema}
    >
      {({ errors, touched, values}) => (
        <Form className='w-full flex flex-col flex-1 gap-4'>
          <InfoTable>
            <InfoRow name='Name' onlyAdmin={false}>
              <p>{dataKey.name}</p>
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
              <InfoRow name='Server' onlyAdmin={false}>
                <span>
                  {`${dataKey.server.name} (${
                    dataKey.server.country
                  }) ${getUnicodeFlagIcon(dataKey.server.abbreviatedCountry)}`}
                </span>
              </InfoRow>
            ) : null}

            <InfoRow name='Price' onlyAdmin={false}>
              <p className='mr-auto'>{dataKey.currentPrice} ⭐️ Stars / 30 days</p>
            </InfoRow>
          </InfoTable>
          <label>
            <FieldSelect
              name='tariff'
              placeholder='Choose tariff'
              options={tariffOption}
            />
          </label>
          {values.tariff?.value ? (
            <div>
              <p className='text-base font-thin'>
                {`Next payment: ${date.format(
                  date.addDays(getFutureDate(dataKey.nextPayment, new Date()), Number(values.tariff.days)),
                  'D MMMM YYYY'
                )}`}
              </p>
              <p className='text-base font-thin'>{`Discount: ${values.tariff.discountPercentage}%`}</p>
              {Number(values.tariff.discountPercentage) ? (
                <p className='text-base font-thin'>
                  {`Total: `}
                  <span className='line-through decoration-2 '>
                    {(
                      (Number(dataKey.currentPrice) *
                        Number(values.tariff.days)) /
                      30
                    ).toFixed(2)}
                  </span>
                  <span className='font-semibold'>
                    {` `}
                    {(
                      (Number(dataKey.currentPrice) *
                        Number(values.tariff.days)) /
                        30 -
                      (((Number(dataKey.currentPrice) *
                        Number(values.tariff.days)) /
                        30) *
                        Number(values.tariff.discountPercentage)) /
                        100
                    ).toFixed(0)}
                    {` ⭐️ Stars`}
                  </span>
                </p>
              ) : (
                <p className='text-base font-thin'>
                  {`Total: `}
                  <span className='font-semibold'>
                    {(
                      (Number(dataKey.currentPrice) *
                        Number(values.tariff.days)) /
                      30
                    ).toFixed(0)}
                    {` ⭐️ Stars`}
                  </span>
                </p>
              )}
            </div>
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
            Pay
          </button>
        </Form>
      )}
    </Formik>
  );
};

function getFutureDate(...date: (Date | undefined)[]): Date {
  let arrDate = date.filter((el): el is Date => el !== undefined);

  arrDate.sort((a, b) => (new Date(a).getTime() > new Date(b).getTime() ? -1 : 1));

  return arrDate.length > 0 ? new Date(arrDate[0]) : new Date();
}

export default PaymentForm;
