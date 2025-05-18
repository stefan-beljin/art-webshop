import camelcaseKeys from "camelcase-keys";

export const get = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const formattedData = camelcaseKeys(data, { deep: true });
    return formattedData;
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);

    throw new Error(message);
  }
};
