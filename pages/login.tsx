import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="flex relative h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Andflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 opacity-60 sm:!inline !hidden"
        objectFit="cover"
      />
      <img
        src={"/andflix-logo.png"}
        alt="logo"
        height={150}
        width={150}
        className="object-contain cursor-pointer absolute left-4 top-4 md:left-10 md:top-6"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label htmlFor="" className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-[13px] p-1 font-light text-orange-600">
                This field is required
              </p>
            )}
          </label>
          <label htmlFor="" className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-[13px] p-1 font-light text-orange-600">
                This field is required
              </p>
            )}
          </label>
        </div>
        <button
          className="bg-[#e50914] w-full rounded font-semibold py-3"
          type="submit"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Andflix?{" "}
          <button className="text-white hover:underline hover:text-[#e50914]" type="submit" onClick={() => setLogin(false)}>
            Sign up Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
