import { useState } from "react";
import { Lock, User, School } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Container from "../../Components/ui/Container";
import Button from "../../Components/ui/Button";

const data = {
  username: "GlobalSchool",
  password: "Admin@123",
};

function AdminLogin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const login = () => {
    console.log("hello");
    
    if (username === data.username && password === data.password) {
        sessionStorage.setItem("isLoggedIn","true")
        navigate("/admin/",{replace:true});     
        return
    }else{
    sessionStorage.removeItem("isLoggedIn")}
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center py-20 bg-background">
      <Container>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl">

          <div className="grid lg:grid-cols-2">

            {/* Left */}

            <div className="hidden lg:flex flex-col justify-center bg-primary p-12 text-primary-foreground">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15">
                <School size={42} />
              </div>

              <h1 className="mt-8 text-5xl font-bold">
                Admin Panel
              </h1>

              <p className="mt-5 text-lg leading-8 text-primary-foreground/80">
                Welcome to the Global School administration dashboard.
                Login to manage courses, teachers, gallery, notices
                and other website content.
              </p>

              <div className="mt-12 rounded-2xl border border-white/20 bg-white/10 p-5">
                <p className="text-sm opacity-80">
                  Authorized access only.
                </p>
              </div>

            </div>

            {/* Right */}

            <div className="p-10 md:p-14">

              <div className="text-center">
                <h2 className="text-4xl font-bold">
                  Sign In
                </h2>

                <p className="mt-3 text-muted-foreground">
                  Login using your administrator credentials.
                </p>
              </div>

              <div className="mt-10 space-y-6">

                {/* Username */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Username
                  </label>

                  <div className="flex items-center rounded-xl border border-border bg-background px-4">
                    <User
                      size={18}
                      className="text-muted-foreground"
                    />

                    <input
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setusername(e.target.value)}
                      className="w-full bg-transparent px-4 py-4 outline-none"
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Password
                  </label>

                  <div className="flex items-center rounded-xl border border-border bg-background px-4">
                    <Lock
                      size={18}
                      className="text-muted-foreground"
                    />

                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      className="w-full bg-transparent px-4 py-4 outline-none"
                    />
                  </div>
                </div>

                <Button
                  onClick={login}
                  variant="primary"
                  className="w-full py-4 text-lg"
                >
                  Login
                </Button>

              </div>

              <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
                © 2026 Global School <br />
                Designed & Developed by <strong>KT Technology</strong>
              </div>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}

export default AdminLogin;