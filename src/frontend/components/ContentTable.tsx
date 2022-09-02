import MoonLoader from 'react-spinners/MoonLoader';
import Swal from 'sweetalert2';

import { formatDate, isDate } from '@/frontend/helper/common';

import Pagination from './Pagination';

type contentTable = {
  header: any;
  id: string;
  result: any;
  limit: any;
  page: any;
  setPage: any;
  handleDelete: any;
  handleEdit: any;
  handleView: any;
}
const ContentTable = ({
  header,
  id,
  result,
  limit,
  page,
  setPage,
  handleDelete,
  handleEdit,
  handleView,
}: contentTable) => {
  const { data, isError, isLoading } = result;
  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <MoonLoader />
      </div>
    );
  }
  if (isError) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: `Error : ( ${isError['info']['message']} )`,
      color: 'red',
    });
    return (
      <table>
        <tbody className='flex-1 sm:flex-none'>
          <Pagination setPage={setPage} />
        </tbody>
      </table>
    );
  }
  const { users: items, meta } = data.data;
  return (
    <table className='flex-no-wrap my-5 flex w-full flex-row overflow-hidden rounded-lg sm:bg-white sm:shadow-lg'>
      <thead className=''>
        {items &&
          items.map((value: any, index: any) => {
            return (
              <tr
                key={index}
                className='flex-no wrap mb-2 flex flex-col rounded-l-lg bg-gray-600 bg-opacity-20 sm:mb-0 sm:table-row sm:rounded-none'
              >
                <th className='p-3 text-left sm:w-1/12 sm:text-center'>no</th>
                {header.map((title: any, index: any) => (
                  <th key={index} className='p-3 text-left'>
                    {title.replace('_', ' ').trim()}
                  </th>
                ))}
                {handleEdit && handleDelete && (
                  <th className='p-[14px] text-left sm:w-2/12 sm:p-3 sm:text-center'>
                    Action
                  </th>
                )}
              </tr>
            );
          })}
      </thead>
      <tbody className='flex-1 sm:flex-none'>
        {items.map((value: any, index: any) => (
          <tr
            key={index}
            className='flex-no wrap mb-2 flex flex-col sm:mb-0 sm:table-row'
          >
            <td className='border-grey-light border p-3 sm:w-1/12 sm:text-center'>
              {limit * (page - 1) + (index + 1)}
            </td>
            {header.map((title: any, i: any) => (
              <td key={i} className='border-grey-light border p-3 text-left'>
                {isDate(value[title]) ? formatDate(value[title]) : value[title]}
              </td>
            ))}
            {handleEdit && handleDelete && (
              <td className='border-grey-light border p-3 sm:w-2/12 sm:text-center'>
                <a
                  onClick={() => handleView(value)}
                  className='cursor-pointer text-gray-500'
                >
                  <button className='w-[80px] rounded-md border-2 border-blue-500 transition hover:bg-blue-500 hover:text-white'>
                    Lihat
                  </button>
                </a>
                <a
                  onClick={() => handleEdit(value[id])}
                  className='cursor-pointer text-gray-500'
                >
                  <button className='w-[80px] rounded-md border-2 border-green-500 transition hover:bg-green-500 hover:text-white'>
                    Edit
                  </button>
                </a>
                <a
                  onClick={() => handleDelete(value[id])}
                  className='cursor-pointer text-red-500'
                >
                  <button className='w-[80px] rounded-md border-2 border-red-500 transition hover:bg-red-500 hover:text-white'>
                    Hapus
                  </button>
                </a>
              </td>
            )}
          </tr>
        ))}
        <Pagination page={page} limit={limit} setPage={setPage} meta={meta} />
      </tbody>
    </table>
  );
};
export default ContentTable;
