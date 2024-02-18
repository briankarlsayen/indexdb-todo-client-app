import { checkOnline } from "../utils";
import { addTodoApi, deleteTodo, getTodos, updateChecked } from "./dexieApi";

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
    // const { data, error } = useQuery(props.routeName, () =>
    //   fetchData({
    //     routeName: props.routeName,
    //     method: "POST",
    //     body: props.params,
    //   })
    // );

    if (await checkOnline()) {
      const todo = await fetchData({
        routeName: props.routeName,
        method: "POST",
        body: props.params,
      });
      if (todo) await addTodoApi(todo);
      return todo;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const routesGetApi = async (props: PApi) => {
  try {
    // const { data, error } = useQuery(props.routeName, () =>
    //   fetchData({ routeName: props.routeName, method: "GET" })
    // );
    if (await checkOnline())
      return await fetchData({ routeName: props.routeName, method: "GET" });

    return await getTodos();
  } catch (error) {
    console.log("error", error);
  }
};

export const routesPutApi = async (props: PApi) => {
  try {
    // const { data, error } = useQuery(props.routeName, () =>
    //   fetchData({
    //     routeName: props.routeName,
    //     method: "PUT",
    //     body: props.params,
    //   })
    // );

    if (await checkOnline()) {
      const todo = await fetchData({
        routeName: props.routeName,
        method: "PUT",
        body: props.params,
      });
      if (todo) {
        const list = props.routeName.split("/");
        if (list.length > 1) {
          return updateChecked(list.pop(), todo);
        }
      }
      return;
    }

    // if (!data) {
    //   const list = props.routeName.split("/");
    //   if (list.length > 1) {
    //     return updateChecked(Number(list[-1]), props.params);
    //   }
    //   return;
    // }
    // return data;
  } catch (error) {
    const list = props.routeName.split("/");
    if (list.length > 1) {
      return updateChecked(Number(list[-1]), props.params);
    }
    return;
    console.log("error", error);
  }
};

export const routesDeleteApi = async (props: PApi) => {
  try {
    // const { data, error } = useQuery(props.routeName, () =>
    //   fetchData({ routeName: props.routeName, method: "DELETE" })
    // );

    if (await checkOnline()) {
      const list = props.routeName.split("/");
      if (list.length > 1) {
        return deleteTodo(Number(list[-1]));
      }
    }

    return await fetchData({
      routeName: props.routeName,
      method: "DELETE",
    });
  } catch (error) {
    console.log("error", error);
  }
};
