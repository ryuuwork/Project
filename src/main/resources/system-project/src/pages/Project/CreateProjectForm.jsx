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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProject } from "@/redux/Project/Action";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const CreateProjectForm = () => {
  const dispatch = useDispatch();

  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags");
    const updateTags = currentTags.includes(newValue)
      ? currentTags.filter((tags) => tags !== newValue)
      : [...currentTags, newValue];
    form.setValue("tags", updateTags);
  };

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: ["React", "Spring Boot", "MySQL"],
    },
  });

  const onSubmit = (data) => {
    dispatch(createProject(data));
  };

  const litmitProject = false;

  const tags = [
    "All",
    "React",
    "Spring Boot",
    "MySQL",
    "Tailwind",
    "JS",
    "Python",
  ];
  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-x-gray-700 py-5 px-5"
                    placeholder="Project name"
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
                    placeholder="Project description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    defaultValue="fullstack"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fullstack">Full-Stack</SelectItem>
                      <SelectItem value="Frontend">Front-End</SelectItem>
                      <SelectItem value="Backend">Back-End</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      handleTagsChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {field.value.map((item) => (
                  <div
                    onClick={() => handleTagsChange(item)}
                    key={item}
                    className="cursor-pointer flex rounded-full items-center border gap-2 px-4 py-1"
                  >
                    <span className="text-sm">{item}</span>
                    <Cross1Icon className="h-3 w-3" />
                  </div>
                ))}

                <div className="flex gap-1 flex-wrap"></div>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose>
            {litmitProject ? (
              <div>
                <p>
                  {" "}
                  you can create only 3 project with free plan, please upgrede
                  your plan
                </p>
              </div>
            ) : (
              <Button type="submit" className="w-full mt-5">
                Create Project
              </Button>
            )}
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
