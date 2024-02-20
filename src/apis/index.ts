export const BASE_URL = "http://localhost:5010";

interface PFetch {
  routeName: string;
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  body?: any;
}

const fetchData = async ({ routeName, method, body }: PFetch) => {
  const response = await fetch(BASE_URL + "/" + routeName, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: body ? JSON.stringify(body) : null,
  });
  const data = await response.json();
  return data;
};

interface PApi {
  routeName: string;
  params?: {};
  config?: {};
}

export const routesPostApi = async (props: PApi) => {
  try {
    const todo = await fetchData({
      routeName: props.routeName,
      method: "POST",
      body: props.params,
    });
    return todo;
  } catch (error) {
    console.log("error", error);
  }
};

export const routesGetApi = async (props: PApi) => {
  try {
    return await fetchData({ routeName: props.routeName, method: "GET" });
  } catch (error) {
    console.log("error", error);
  }
};

export const routesPutApi = async (props: PApi) => {
  try {
    const todo = await fetchData({
      routeName: props.routeName,
      method: "PUT",
      body: props.params,
    });

    return todo;
  } catch (error) {
    console.log("error", error);
  }
};

export const routesDeleteApi = async (props: PApi) => {
  try {
    return await fetchData({
      routeName: props.routeName,
      method: "DELETE",
    });
  } catch (error) {
    console.log("error", error);
  }
};
