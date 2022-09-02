import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { Layout } from '@/frontend/components/layout/Main';
import { Table } from '@/frontend/components/Table';
import { deleteUser, useGetUsers } from '@/frontend/services/user';
import { formatDate } from '@/frontend/helper/common';

const Index = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  async function handleAdd() {
    return router.push('/users/add');
  }
  async function handleEdit(id: string) {
    return router.push(`/users/${id}`);
  }
  async function handleDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteUser(id);
        if (result.code !== 200) {
          Swal.fire('Delete', 'Failed to delete data', 'error');
          return;
        }
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        return router.reload();
      }
    });
  }
  async function handleView(data: any) {
    Swal.fire({
      showCloseButton: true,
      showConfirmButton: false,
      color: 'grey',
      width: '80%',
      html:
        `<div class="px-2 py-6 flex flex-col items-start space-y-2">
          <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-left w-full">
            <p class="w-full font-[900] sm:w-4/12">Name</p> 
            <p class="w-full sm:w-8/12">${data['name']}</p>
          </div>` +
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
          <p class="w-full font-[900] sm:w-4/12">Email</p>
          <p class="w-full sm:w-8/12">${data['email']}</p>
        </div>` + 
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
          <p class="w-full font-[900] sm:w-4/12">Password</p>
          <p class="w-full sm:w-8/12">${data['password']}</p>
        </div>` + 
        `<div class="flex flex-col sm:flex-row sm:space-y-0 space-y-2 text-left w-full">
          <p class="w-full font-[900] sm:w-4/12">Created</p>
          <p class="w-full sm:w-8/12">${formatDate(data['created_at'])}</p>
        </div>`,
    });
  }

  const result = useGetUsers(
    { page: page.toString(), limit: limit.toString() }
  );
  const props = {
    page,
    limit,
    setLimit,
    setPage,
    handleAdd,
    handleDelete,
    handleEdit,
    handleView,
  };
  return (
    <Layout>
      <div className='mx-auto max-w-7xl p-5 '>
        <Table
          title='Users'
          header={['name','email','password','created_at']}
          result={result}
          id='id'
          props={props}
        />
      </div>
    </Layout>
  );
};
export default Index;