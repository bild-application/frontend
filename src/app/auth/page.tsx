"use client";
import Image from "next/image";
import { register } from "@/lib/auth/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { loginSchema } from "@/lib/zodSchema";

type FormData = z.infer<typeof loginSchema>;

export default function CreateAccount() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: FormData) {
    // register({
    //   email: data.email as string,
    //   agreeTerms: true,
    //   password: {
    //     first: data.fPassword,
    //     second: data.sPassword,
    //   },
    // });
    console.log(data);
  }

  return (
    <form
      className="mt-12"
      action=""
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email Input */}
      <div className="">
        <label htmlFor="email">Email address</label>

        <input
          {...register("email", { required: true })}
          id="email"
          name="email"
          type="text"
          className="text-black cursor-text border ml-2 rounded-sm"
          placeholder="john@doe.com"
          autoComplete="off"
        />
        {errors?.email && (
          <p className="text-red-600 text-sm">{errors?.email?.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div className=" mt-10">
        <label htmlFor="password">Password</label>

        <input
          {...register("fPassword", { required: true })}
          id="password"
          type="password"
          name="password"
          className="text-black cursor-text border ml-2 rounded-sm"
          placeholder="Password"
          autoComplete="off"
        />
        {errors?.fPassword && (
          <p className="text-red-600 text-sm">{errors?.fPassword?.message}</p>
        )}
      </div>

      <div className=" mt-10">
        <label htmlFor="password">Password</label>

        <input
          {...register("sPassword", { required: true })}
          id="password"
          type="password"
          name="password"
          className="text-black cursor-text border ml-2 rounded-sm"
          placeholder="Password"
          autoComplete="off"
        />
        {errors?.sPassword && (
          <p className="text-red-600 text-sm">{errors?.sPassword?.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        className="bg-blue-600 text-white p-2 px-4 rounded-md cursor-pointer mt-10"
        type="submit"
        disabled={!isDirty || !isValid || isSubmitting}
      >
        Sign In
      </button>
    </form>
  );
}
