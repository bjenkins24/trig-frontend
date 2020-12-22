import { useState } from 'react';

const useFilters = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const dateAdjust = ({ date, type }) => {
    if (!date) return null;
    let newDate = date;
    if (type === 'end') {
      newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59
      );
    }
    return Math.round(newDate.getTime() / 1000);
  };

  const createQueryString = () => {
    let params = new URLSearchParams({
      s: dateAdjust({ date: startDate, type: 'start' }),
      e: dateAdjust({ date: endDate, type: 'end' }),
      t: selectedTags.join(',') || null,
      ty: selectedTypes.join(',') || null,
    });

    // remove null values
    const keysForDeletion = [];
    params.forEach((value, key) => {
      if (value === 'null') keysForDeletion.push(key);
    });
    keysForDeletion.forEach(key => {
      params.delete(key);
    });

    params = params.toString();
    if (!params) {
      return '';
    }
    return params;
  };

  return {
    filterProps: {
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      selectedTags,
      setSelectedTags,
      selectedTypes,
      setSelectedTypes,
    },
    queryString: createQueryString(),
  };
};

export default useFilters;
