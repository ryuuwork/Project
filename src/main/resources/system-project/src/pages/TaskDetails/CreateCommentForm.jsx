import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createComment } from "@/redux/Comment/Action";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const CreateCommentForm = ({ taskId }) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      content: "",
    },
  });
  const onSubmit = (data) => {
    dispatch(createComment(data.content, taskId));
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="flex gap-2 py-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarFallback>T</AvatarFallback>
                  </Avatar>

                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="w-[20rem]"
                      placeholder="add comment here ..."
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" size="icon">
            <PaperPlaneIcon />
          </Button>
        </form>
      </Form>
    </div>
  );
};
CreateCommentForm.propTypes = {
  taskId: PropTypes.number.isRequired,
};

export default CreateCommentForm;
