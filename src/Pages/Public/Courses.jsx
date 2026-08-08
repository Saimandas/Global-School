import React, { useState } from "react";
import { ArrowRight, Users } from "lucide-react";
import {academicPrograms} from '../../data/academicProgramsData'
import Button from "../../Components/ui/Button";
import Container from "../../Components/ui/Container";
import { useNavigate } from "react-router-dom";

const images = [
  "https://picsum.photos/id/1015/900/700",
  "https://picsum.photos/id/1018/900/700",
  "https://picsum.photos/id/1019/900/700",
  "https://picsum.photos/id/1025/900/700",
];

const Courses = () => {
  const [activeProgram, setActiveProgram] = useState(0);
  const navigate=useNavigate();
  const program = academicPrograms[activeProgram];
  const Icon = program.icon;

  return (
    <section className="py-5">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-2 font-heading text-4xl font-bold text-foreground lg:text-3xl">
            Our Courses
          </h2>

          {/* <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Discover our comprehensive learning programs designed to nurture curiosity, creativity, and academic excellence from early childhood to higher secondary education.
          </p> */}
        </div>

        <div className="mt-2 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg">
          <div className="grid lg:grid-cols-[320px_1fr]">
            <div className="border-r border-border bg-muted/40">
              {academicPrograms.map((item, index) => {
                const SidebarIcon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveProgram(index)}
                    className={`flex w-full items-center gap-4 border-b border-border px-8 py-6 text-left transition-all duration-300 ${
                      activeProgram === index
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        activeProgram === index
                          ? "bg-white/20"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <SidebarIcon size={24} />
                    </div>

                    <div>
                      <h3 className="font-semibold">{item.title}</h3>

                      <p
                        className={`text-sm ${
                          activeProgram === index
                            ? "text-white/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.classes}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid items-center gap-12 p-10 lg:grid-cols-2">
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={32} />
                </div>

                <h2 className="mt-8 text-4xl font-bold">
                  {program.title}
                </h2>

                <p className="mt-3 font-medium text-primary">
                  {program.classes}
                </p>

                <div className="mt-8">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Streams
                  </h4>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {program.streams.map((stream) => (
                      <span
                        key={stream}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {stream}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Popular Subjects
                  </h4>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {program.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="rounded-lg bg-muted px-3 py-2 text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-border pt-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <Users size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Faculty Members
                      </p>

                      <p className="font-semibold">
                        {program.teachers} Qualified Teachers
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="flex items-center px-2 flex-nowrap  mt-5 "
                    onClick={()=>{
                      navigate(`${program.slug}`)
                    }}
                  >
                    Course Details
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img
                  src={images[activeProgram]}
                  alt={program.title}
                  className="h-[550px] w-full rounded-3xl object-cover"
                />

                <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 p-5 backdrop-blur">
                  <p className="text-sm text-muted-foreground">
                    Courses Stage
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-primary">
                    {program.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Courses;