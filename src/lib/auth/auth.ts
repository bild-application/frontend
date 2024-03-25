import fetcher from "@/lib/fetcher";

type TRegister = {
  email: string;
  agreeTerms: boolean;
  password: {
    first: string;
    second: string;
  };
};

export const register = async ({ email, agreeTerms, password }: TRegister) => {
  console.log({ email, agreeTerms, password });
  const { error } = await fetcher({
    method: "POST",
    bearerToken: "",
    url: `/api/register`,
    body: {
      email: email,
      agreeTerms: agreeTerms,
      password: {
        first: password.first,
        second: password.second,
      },
    },
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log("Success");
};
