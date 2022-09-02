import { Menu } from '@headlessui/react';

import ContentTable from './ContentTable';

type tableProps = {
  title: string;
  header: any;
  result: any;
  id: string;
  props: any;
}

export const Table = ({ title, header, result, id, props }: tableProps) => {
  const {
    page,
    limit,
    setLimit,
    setPage,
    handleAdd,
    handleDelete,
    handleEdit,
    handleView,
  } = props;

  return (
    <div className=''>
      {title && setLimit && (
        <>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <h1 className='text-2xl font-medium'>{title}</h1>
            {handleAdd && (
              <button
                onClick={() => handleAdd()}
                className=' space-x-3 rounded-md border-2 border-gray-200 p-2 text-gray-600 hover:border-white hover:bg-gray-600 hover:text-white'
              >
                tambah data
              </button>
            )}
          </div>
          <div className='flex flex-col items-center justify-between  space-y-5 py-6 md:flex-row md:space-y-0'>
            <div className='flex items-center'>
              <div className='mr-2'>show</div>
              <div className='relative'>
                <Menu>
                  <Menu.Button className='flex space-x-3 rounded-md border-2 border-gray-200 px-10 py-2  text-gray-600'>
                    <span>{limit}</span>
                  </Menu.Button>
                  <Menu.Items
                    as='div'
                    className='top-ful absolute flex w-full flex-col items-center space-y-2 bg-gray-500'
                  >
                    {['5','10','15','20'].map((value, index) => (
                      <Menu.Item key={index}>
                        <a
                          onClick={() => setLimit(value)}
                          className='flex cursor-pointer space-x-2 px-9 py-1 text-white hover:bg-gray-500'
                        >
                          <span>{value}</span>
                        </a>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
              <div className='ml-2'>entries</div>
            </div>
            <div className='sm:w-1/6'>
            </div>
          </div>
        </>
      )}
      <ContentTable
        header={header}
        id={id}
        result={result}
        limit={limit}
        page={page}
        setPage={setPage}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleView={handleView}
      />
    </div>
  );
};
