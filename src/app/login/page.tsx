"use client";

import React, { FormEvent } from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import LoginInput from "./components/login_input";
import LoginSubmit from "./components/login_submit";
import Alert from "../components/alert";
import { login, redirectIfAuth } from "./actions";

export default function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const setPasswordChange = (value: string) => {
    setPassword(value);
    setError(false);
  };

  const setUsernameChange = (value: string) => {
    setUsername(value);
    setError(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    console.log("submit");

    if (!username || !password) {
      setError(true);
      setLoading(false);
      return;
    }

    const data = await login(username, password);

    if (!data) {
      console.log("error");
      setError(true);
      setLoading(false);
      setPassword("");
      return;
    }

    redirectIfAuth("/home");
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <Card
        isBlurred
        shadow="lg"
        className=" w-full sm:mx-5  max-w-md lg:max-w-4xl"
      >
        <CardBody>
          <div className="flex overflow-hidden ">
            <div className=" hidden lg:flex lg:w-1/2 bg-cover ">
              <Image
                alt="NextUI hero Image"
                src="/img4.webp"
                className=" object-cover w-full h-full"
              />
            </div>

            <div className="w-full p-8 lg:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-700 text-center">
                Sistema de Administracion
              </h2>
              <p className=" text-lg text-gray-600 text-center">Bienvenido!</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <a
                  href=""
                  className="text-xs text-center text-gray-500 uppercase"
                >
                  inicio de sesion
                </a>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>

              <form className="mt-10" onSubmit={handleSubmit}>
                <LoginInput
                  type="text"
                  label="Username"
                  className="my-6"
                  isInvalid={errors}
                  onChange={setUsernameChange}
                  id={"email"}
                />

                <LoginInput
                  type="password"
                  label="Contraseña"
                  className="my-6"
                  isInvalid={errors}
                  onChange={setPasswordChange}
                  id={"password"}
                />

                <Alert
                  error={errors}
                  label="No se pudo iniciar sesion con las credenciales
                        proporcionadas."
                />

                <div
                  className={`${errors ? "hidden" : "block"} h-16 mt-10`}
                ></div>

                <div className=" mt-10  flex justify-center items-center ">
                  <LoginSubmit
                    color="secondary"
                    variant="shadow"
                    label="Iniciar Sesion"
                    isLoading={loading}
                  />
                </div>
              </form>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
