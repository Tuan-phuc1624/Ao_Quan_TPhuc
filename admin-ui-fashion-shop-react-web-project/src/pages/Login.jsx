/** @format */

import { Button } from "@windmill/react-ui";
import { ImFacebook, ImGoogle } from "react-icons/im";
import { Link } from "react-router-dom";

//internal import
import ImageDark from "@/assets/img/login-office-dark.jpeg";
import ImageLight from "@/assets/img/login-office.jpeg";
import CMButton from "@/components/form/button/CMButton";
import InputArea from "@/components/form/input/InputArea";
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import useLoginSubmit from "@/hooks/useLoginSubmit";

const Login = () => {
   const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src={ImageLight}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  Đăng Nhập
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <LabelArea label="Email" />
                  <InputArea
                    register={register}
                    defaultValue="admin@gmail.com"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    placeholder="john@doe.com"
                  />
                  <Error errorName={errors.email} />
                  <div className="mt-6"></div>
                  <LabelArea label="Mật Khẩu" />
                  <InputArea
                    register={register}
                    defaultValue="12345678"
                    label="Password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    placeholder="***************"
                  />
                  <Error errorName={errors.password} />

                  {loading ? (
                    <CMButton
                      disabled={loading}
                      type="submit"
                      className={`bg-emerald-600 rounded-md mt-4 h-12 w-full`}
                      to="/dashboard"
                    />
                  ) : (
                    <Button
                      disabled={loading}
                      type="submit"
                      className="mt-4 h-12 w-full"
                      to="/dashboard"
                    >
                      {"Đăng Nhập"}
                    </Button>
                  )}
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
