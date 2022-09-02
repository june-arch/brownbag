import useSWR, { SWRResponse } from 'swr';

import { fetcher } from '@/frontend/helper/common';

const address = `api/user`;

export const useGetUsers = (
  queries: { page: string; limit: string; }
) => {
  const { page, limit } = queries;
  const { data, error } = useSWR(
    [
      `${address}?page=${page}&limit=${limit}`,
    ],
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;

        // Only retry up to 10 times.
        if (retryCount >= 10) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetUser = (params: { id: string | undefined }) => {
  const { id } = params;
  const { data, error } = useSWR(
    [
      `http://localhost:3000/${address}/${id}`,
    ],
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;

        // Only retry up to 10 times.
        if (retryCount >= 1) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const postUser = async (
  payload: any
) => {
  try {
    const result = await fetcher(`http://localhost:3000/${address}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const patchUser = async (
  payload: any,
  id: string
) => {
  try {
    const result = await fetcher(`http://localhost:3000/${address}/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const result = await fetcher(`${address}/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    });
    return result;
  } catch (error) {
    return error;
  }
};
