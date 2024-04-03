import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  const [likes, setLikes] = useState(0);

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

  const fetchLikes = useCallback(async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch likes');
      }
      const data = await response.json();
      const recipe = data;
      setLikes(recipe.likes || 0);
    } catch (error) {
      console.error('Error fetching likes count:', error);
    }
  }, [url, setLikes]); // Add any dependencies used inside the function

  const updateLikes = async () => {
    try {
      const newLikes = likes + 1;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: newLikes }),
      });
      if (!response.ok) {
        throw new Error('Failed to update likes');
      }
      setLikes(newLikes);
    } catch (error) {
      console.error('Error updating likes count:', error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(url, {
          ...options,
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

  return {
    data,
    isLoading,
    error,
    postData,
    deleteData,
    updateRecipe,
    likes,
    updateLikes,
  };
};
