/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from '@/frontend/components/Form';
import { Layout } from '@/frontend/components/layout/Main';
import { getChangedValues } from '@/frontend/helper/common';
import { patchUser, useGetUser } from '@/frontend/services/user';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';



function EditUser({ props }) {
  const { user, id, router } = props;
  const initialValues = {
    name: user.data.name,
    email: user.data.email,
    password: user.data.password
  };
  const validationSchema = Yup.object({
    name: Yup.string()
            .max(90, 'Must be 90 characters or less')
            .required('Required'),
    email: Yup.string()
        .email()
        .required('Required'),
    password: Yup.string().max(60, 'max 60 char')
  });
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const editedValues = getChangedValues(values, initialValues);
      const result = await patchUser(editedValues, id);
      if (result.code !== 200) {
        if (result.status == 400) {
          result.info.data.map((value:any) =>
            Object.keys(value).map((key) =>
              formik.setFieldError(key, value[key])
            )
          );
        }
      }
      if (result.code == 200) {
        return router.push('/users');
      }
    },
  });

  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <Form formik={formik} header={['name','email','password']}>
        <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
          <div className='text-3xl'>Edit User : {id}</div>
        </div>
      </Form>
    </div>
  );
}

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const value = Array.isArray(id) ? id[0] : id;
  const { user, isError, isLoading } = useGetUser({ id: value });
  if (isError)
    return (
      <div>
        error fetch data with error code: {isError['status']},{' '}
        {JSON.stringify(isError['info'])}
      </div>
    );
  if (isLoading) return <div>Loading ...</div>;
  const props = {
    user,
    id,
    router,
  };
  return (
    <Layout>
      <EditUser props={props} />
    </Layout>
  );
};

export default Edit;
