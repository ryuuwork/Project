import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchProjects, searchProject } from "@/redux/Project/Action";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../Project/ProjectCard";

const ProjectList = () => {
  const dispatch = useDispatch();

  const { project } = useSelector((store) => store);

  const [keyword, setKeyword] = useState("");

  const handleFilterCategory = (value) => {
    if (value === "All") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ category: value }));
    }
  };

  const handleFilterTags = (value) => {
    if (value === "All") {
      dispatch(fetchProjects({}));
    } else {
      dispatch(fetchProjects({ tag: value }));
    }
  };

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
    dispatch(searchProject(event.target.value));
  };

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
    <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
      <selection className="fifterSection">
        <Card className="p-5 sticky top-10">
          <div className="flex justify-between lg:w-[20rem]">
            <p className="text-xl -tracking-wider">filter</p>
            <Button variant="ghost" size="icon">
              <MixerHorizontalIcon />
            </Button>
          </div>

          <CardContent className="mt-5">
            <ScrollArea className="space-y-7 h-[70vh]">
              <div>
                <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                <div className="pt-5">
                  <RadioGroup
                    className="space-y-3 pt-5"
                    defaultValue="all"
                    onValueChange={(value) => handleFilterCategory(value)}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="All" id="r1" />
                      <Label htmlFor="r1">All</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Backend" id="r2" />
                      <Label htmlFor="r2">Back-End</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Fullstack" id="r3" />
                      <Label htmlFor="r3">Full-Stack</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Frontend" id="r4" />
                      <Label htmlFor="r4">Front-End</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div>
                <h1 className="pb-3 text-gray-400 border-b">Tag</h1>
                <div className="pt-9">
                  <RadioGroup
                    className="space-y-3 pt-5"
                    defaultValue="all"
                    onValueChange={(value) => handleFilterTags(value)}
                  >
                    {tags.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <RadioGroupItem value={item} id={`r1-${item}`} />
                        <Label htmlFor={`r1-${item}`}>{item}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </selection>

      <selection className="projectListSection w-full lg:w-[48rem]">
        <div className="flex gap-2 items-center pb-5 justify-between">
          <div className="relative p-0 w-full">
            <Input
              onChange={handleSearchChange}
              placeholder="search project"
              className="40% px-9"
            />
            <MagnifyingGlassIcon className="absolute top-3 left-4" />
          </div>
        </div>
        <div>
          <div className="space-y-5 min-h-[74vh]">
            {keyword
              ? project.searchProjects?.map((item) => (
                  <ProjectCard key={item} item={item} />
                ))
              : project.projects?.map((item) => (
                  <ProjectCard key={item} item={item} />
                ))}
          </div>
        </div>
      </selection>
    </div>
  );
};
export default ProjectList;
