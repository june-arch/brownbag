export const fetcher = async (...args: [string, object]) => {
    const res = await fetch(...args);
    if (!res.ok) {
      let error = new Error('An error occurred while fetching');
      error['info'] = await res.json();
      error['status'] = res.status;
      throw error;
    }
    
    return await res.json();
  };
export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };
export const isDate = function (value: string) {
    const checkDate = Date.parse(value);
    if (value) {
      if (Number(value)) {
        return false;
      }
      if (
        !value.match(
          '^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$'
        )
      ) {
        return false;
      }
    }
    return checkDate;
  };
export const getChangedValues = (values: any, initialValues:any) => {
    return Object.entries(values).reduce((acc, [key, value]) => {
      const hasChanged = initialValues[key] !== value;
  
      if (hasChanged) {
        acc[key] = value;
      }
  
      return acc;
    }, {});
  };