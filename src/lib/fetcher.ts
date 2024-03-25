type Args = {
  url: string;
  body?: Record<string, any> | BodyInit;
  bearerToken: string;
  method: Methods;
  isFile?: boolean;
};

type Return<Type> =
  | {
      data: Type;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

type Options = {
  method: Methods;
  headers: any;
  body?: Record<string, any> | BodyInit;
};

type Methods = "GET" | "POST" | "PUT" | "DELETE";

export default async function fetcher<Type>({
  url,
  body,
  bearerToken,
  method,
  isFile,
}: Args): Promise<Return<Type>> {
  const defaultURL = process.env.NEXT_PUBLIC_API;
  const options: Options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: isFile ? body : JSON.stringify(body),
  };

  if (body === undefined) delete options.body;
  if (isFile) delete options.headers["Content-Type"];

  try {
    const response = await fetch(defaultURL + url, options as RequestInit);
    const data = await response.json();

    if (!response.ok) return { data: null, error: data };

    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error as Error };
  }
}
