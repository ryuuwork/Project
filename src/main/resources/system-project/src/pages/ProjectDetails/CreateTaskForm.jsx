import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTask } from "@/redux/Task/Action";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const CreateTaskForm = ({ status }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      taskName: "",
      description: "",
    },
  });
  const onSubmit = (data) => {
    data.projectId = id;
    dispatch(
      createTask({
        title: data.taskName,
        description: data.description,
        projectId: id,
        status,
      })
    );
    console.log("Create project data: ", data);
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-x-gray-700 py-5 px-5"
                    placeholder="task name ..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-x-gray-700 py-5 px-5"
                    placeholder="description name ..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose>
            <Button type="submit" className="w-full mt-5">
              Create Task
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};
CreateTaskForm.propTypes = {
  status: PropTypes.string.isRequired,
};
export default CreateTaskForm;
