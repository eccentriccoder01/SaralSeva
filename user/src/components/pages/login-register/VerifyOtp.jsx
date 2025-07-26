import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import heroBg from "./../../../assets/baner-cpgrams_3.jpg"; // Using a relevant background

const VerifyOtp = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const { mobile } = location.state || {};
  const navigate = useNavigate();

  const FormSchema = z.object({
    pin: z.string().min(6, { message: "Your one-time password must be 6 characters." }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/auth/verify-otp", { mobile, otp: data.pin });
      if (res.data.message === "OTP verified") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user._id);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      form.setError("pin", { type: "manual", message: "Invalid OTP. Please try again." });
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center p-4 bg-orange-50/30" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative w-full max-w-md p-10 text-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl font-bold text-orange-900 jost">Enter Verification Code</FormLabel>
                  <FormControl>
                    <div className="flex justify-center">
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                    </div>
                  </FormControl>
                  <FormDescription className="text-gray-600">
                    Please enter the 6-digit OTP sent to your mobile number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-lg py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-px transition-all">
              Verify & Proceed
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOtp;