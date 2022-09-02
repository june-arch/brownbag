import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { Form } from '@/frontend/components/Form';
import { Layout } from '@/frontend/components/layout/Main';
import { postUser } from '@/frontend/services/user';

function AddUser() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password:''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
        name: Yup.string()
            .max(90, 'Must be 90 characters or less')
            .required('Required'),
        email: Yup.string()
            .email()
            .required('Required'),
        password: Yup.string().max(60, 'max 60 char')
    }),
    onSubmit: async (values) => {
      const result = await postUser(values);
      console.log("masuk")
      if (result.code !== 200) {
        formik.errors.name = 'name tidak valid';
        formik.errors.email = 'email tidak valid';
        formik.errors.password = 'password tidak valid';
      }
      console.log("masuk")
      if (result.data) {
        return router.push('/users');
      }
    },
  });
  return (
    <div className='mx-auto max-w-7xl p-5 '>
      <Form formik={formik} header={['name','email','password']}>
        <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
          <div className='text-3xl'>Tambah User</div>
        </div>
      </Form>
    </div>
  );
}

const Tambah = () => {
  return (
    <Layout>
      <AddUser />
    </Layout>
  );
};

export default Tambah;
