import axios from "axios";
import { useState } from "react";

export const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const { data } = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(data);
      }
      return data;
    } catch (error) {
      setErrors(
        <div className="p-3 bg-red-300 text-red-700 rounded">
          <h1>Oops...</h1>
          <ul className="list-disc ml-4">
            {error.response?.data?.errors?.map((err, i) => (
              <li key={i}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};
