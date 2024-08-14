import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/redux/Auth/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Signin = () => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      usernameOfEmail: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(login(data));
    console.log("Sign In data: ", data);
  };

  return (
    <div className="mx-auto max-w-lg py-5">
      <h1 className="text-2xl font-bold mb-5">Sign In</h1>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="usernameOfEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter your username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign in</Button>
        </form>
      </Form>
    </div>
  );
};

export default Signin;
