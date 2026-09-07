import React, { useEffect, useState } from "react";
import {
  BellRing,
  CalendarDays,
  Image,
  GraduationCap,
  BookOpen,
  Building2,
  Activity,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../Components/UI/Container";
import { getDashboardData } from "../../superbase/supabase";

const Dashboard = () => {
  const [stats,setStats]=useState({
    notices:0,
    events:0,
    gallery:0,
    teachers:0,
    subjects:0,
    categories:0,
  });

  useEffect(()=>{
    loadDashboard();
  },[]);

  async function loadDashboard(){
    try{
      const data=await getDashboardData();
      setStats(data);
    }catch(err){
      console.error(err);
    }
  }

  const modules=[
    {
      title:"Notices",
      icon:BellRing,
      to:"/admin/impDocs",
      desc:"Manage important notices.",
      gradient:"from-pink-600 via-fuchsia-600 to-purple-700"
    },
    {
      title:"Events",
      icon:CalendarDays,
      to:"/admin/manage-event",
      desc:"Manage school events.",
      gradient:"from-cyan-600 via-sky-700 to-blue-800"
    },
    {
      title:"Gallery",
      icon:Image,
      to:"/admin/manage-gallery",
      desc:"Manage gallery images.",
      gradient:"from-emerald-600 via-green-700 to-teal-800"
    },
    // {
    //   title:"Categories",
    //   icon:Building2,
    //   to:"/admin/categories",
    //   desc:"Academic categories.",
    //   gradient:"from-orange-500 via-amber-600 to-yellow-700"
    // },
    // {
    //   title:"Subjects",
    //   icon:BookOpen,
    //   to:"/admin/subjects",
    //   desc:"Manage subjects.",
    //   gradient:"from-indigo-600 via-violet-700 to-purple-800"
    // },
    {
      title:"Teachers",
      icon:GraduationCap,
      to:"/admin/teachers",
      desc:"Manage teachers.",
      gradient:"from-green-700 via-emerald-700 to-lime-700"
    }
  ];

  const cards=[
    {label:"Notices",value:stats.notices,icon:BellRing},
    {label:"Events",value:stats.events,icon:CalendarDays},
    {label:"Gallery",value:stats.gallery,icon:Image},
    {label:"Teachers",value:stats.teachers,icon:GraduationCap},
    {label:"Subjects",value:stats.subjects,icon:BookOpen},
    {label:"Categories",value:stats.categories,icon:Building2},
  ];

  return (
    <section className="py-10">
      <Container>
        <div className="rounded-[32px] bg-gradient-to-br from-green-700 via-emerald-700 to-teal-900 p-10 text-white shadow-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                <Sparkles size={16}/> School CMS Dashboard
              </span>
              <h1 className="mt-6 text-5xl font-bold">Welcome Back, Administrator 👋</h1>
              <p className="mt-5 max-w-2xl text-white/80">
                Manage notices, events, gallery, teachers, subjects and academic categories from one dashboard.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map(({label,value,icon:Icon})=>(
                <div key={label} className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur">
                  <Icon size={28}/>
                  <h2 className="mt-4 text-3xl font-bold">{value}</h2>
                  <p className="text-white/70">{label}</p>
                </div>
              ))}
              <div className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur">
                <Activity size={28}/>
                <h2 className="mt-4 text-3xl font-bold">
                  {stats.notices+stats.events+stats.gallery+stats.teachers+stats.subjects+stats.categories}
                </h2>
                <p className="text-white/70">Total Records</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-12 mb-6 text-3xl font-bold">Management Modules</h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {modules.map(({title,to,desc,gradient,icon:Icon})=>(
            <Link key={title} to={to}
              className={`group rounded-[28px] bg-gradient-to-br ${gradient} p-8 text-white shadow-xl transition hover:-translate-y-2`}>
              <Icon size={42}/>
              <h3 className="mt-6 text-3xl font-bold">{title}</h3>
              <p className="mt-3 text-white/80">{desc}</p>
              <div className="mt-10 flex items-center justify-between">
                <span>Open Module</span>
                <ArrowRight className="transition group-hover:translate-x-2"/>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Dashboard;
