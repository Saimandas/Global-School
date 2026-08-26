import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

import Container from "../../Components/ui/Container";
import Button from "../../Components/ui/Button";

const Contact = () => {
  return (
    <section className="py-10">
      <Container>

        <div className="overflow-hidden rounded-3xl border border-border bg-card">

          <div className="grid lg:grid-cols-[420px_1fr]">

            {/* Left */}

            <div className="border-r border-border bg-muted p-8">

              <h1 className="text-3xl font-bold">
                Contact Us
              </h1>

              <p className="mt-4 text-muted-foreground leading-7">
                We'd love to hear from you. Feel free to visit our
                campus or contact us during office hours.
              </p>

              <div className="mt-8 space-y-6">

                <div className="flex gap-4">
                  <MapPin className="mt-1 text-primary" size={22} />

                  <div>
                    <h3 className="font-semibold">Address</h3>

                    <p className="text-muted-foreground">
                      Saljhora, Kajalgaon, Chirang, Assam.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="mt-1 text-primary" size={22} />

                  <div>
                    <h3 className="font-semibold">Phone</h3>

                    <p className="text-muted-foreground">
                         ____ 0366429055 <br />
                      +91 8472043949 <br />
                      +91 8812018503 
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="mt-1 text-primary" size={22} />

                  <div>
                    <h3 className="font-semibold">Email</h3>

                    <p className="text-muted-foreground">
                      info@globalschool.edu.in
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="mt-1 text-primary" size={22} />

                  <div>
                    <h3 className="font-semibold">Office Hours</h3>

                    <p className="text-muted-foreground">
                      Mon - Sat <br />
                      9:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>

              </div>

              <iframe
                className="mt-8 h-56 w-full rounded-2xl"
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps?q=Guwahati&output=embed"
              />

            </div>

            {/* Right */}

            <div className="p-8">

              <div className="grid gap-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-xl border border-border bg-background px-5 py-4 outline-none"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-xl border border-border bg-background px-5 py-4 outline-none"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="rounded-xl border border-border bg-background px-5 py-4 outline-none"
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="resize-none rounded-xl border border-border bg-background px-5 py-4 outline-none"
                />

                <Button
                  variant="primary"
                  className="w-full py-4"
                >
                  Send Message
                </Button>

              </div>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default Contact;