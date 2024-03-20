import { useState, useEffect } from 'react';

export const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (newData) => {
    setOptions({
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const deleteData = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await fetch(`${url}/${id}`, { method: 'DELETE' });

        // Filter out the deleted item from the current data
        const updatedData = data.filter((recipe) => recipe.id !== id);
        // Fetch data again to get the updated list
        setData(updatedData);
      } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error('Error deleting data:', error);
        setError('Error deleting the item');
      }
    }
  };

  // Update
  // const updateRecipe = async (id, updatedRecipe) => {
  //   try {
  //     const res = await fetch(`${url}/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updatedRecipe),
  //     });

  //     if (!res.ok) {
  //       throw new Error('Failed to update data');
  //     }

  //     // Fetch updated data after successful update
  //     const newData = await res.json();

  //     // Update the state based on the response
  //     setData(
  //       data.map((recipe) =>
  //         recipe.id === id ? { ...recipe, ...newData } : recipe
  //       )
  //     );
  //   } catch (error) {
  //     console.error('Error updating data:', error);
  //     setError('Error updating the item');
  //   }
  // };

  const updateRecipe = async (id, updatedRecipe) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!res.ok) {
        throw new Error('Failed to update data');
      }

      // Fetch updated data after successful update
      const newData = await res.json();

      // Update the state based on the response
      setData((prevData) =>
        prevData.map((recipe) =>
          recipe.id === id ? { ...recipe, ...newData } : recipe
        )
      );
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Error updating the item. Please try again later.');
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsLoading(true);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();

        setIsLoading(false);
        setData(data);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('the fetch was aborted');
        } else {
          setIsLoading(false);
          setError('Could not fetch the data');
        }
      }
    };

    if (method === 'GET') {
      fetchData();
    }

    if ((method === 'POST' || method === 'DELETE') && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, method, options]);

  return { data, isLoading, error, postData, deleteData, updateRecipe };
};
