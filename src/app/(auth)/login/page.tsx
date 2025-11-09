"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/features/auth/lib/validation";
import { useState } from "react";
import { Input } from "@/components/ui/input/input";

export default function LoginPage() {
  const [error, setError] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setError("");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="w-full h-screen bg-background grid place-items-center">
      <form
        className="w-min h-min p-4 rounded-lg bg-background-dark flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold">Login</h1>
        
        <div className="flex flex-col gap-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-64"
            />
            {errors.email && (
              <p className="text-red-400 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.email && (
              <p className="text-red-400 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
         <button type="submit" disabled={isSubmitting} style={{ padding: "8px 16px" }}>
           {isSubmitting ? "Loading..." : "Login"}
         </button>
      </form>
    </div>
  );
}