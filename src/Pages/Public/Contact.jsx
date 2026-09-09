import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import Container from "../../Components/UI/Container";
import Button from "../../Components/UI/Button";

const Contact = () => {
  return (
    <section className="overflow-hidden py-10">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="grid min-w-0 lg:grid-cols-[420px_minmax(0,1fr)]">
            {/* ================= LEFT ================= */}
            <div className="min-w-0 border-b border-border bg-muted p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <h1 className="text-3xl font-bold sm:text-4xl">
                Contact Us
              </h1>

              <p className="mt-4 leading-7 text-muted-foreground">
                We'd love to hear from you. Feel free to visit our
                campus or contact us during office hours.
              </p>

              <div className="mt-8 space-y-6">
                {/* Address */}
                <div className="flex min-w-0 gap-4">
                  <MapPin
                    className="mt-1 shrink-0 text-primary"
                    size={22}
                  />

                  <div className="min-w-0">
                    <h3 className="font-semibold">
                      Address
                    </h3>

                    <p className="mt-1 break-words text-muted-foreground">
                      Saljhora, Kajalgaon, Chirang, Assam.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex min-w-0 gap-4">
                  <Phone
                    className="mt-1 shrink-0 text-primary"
                    size={22}
                  />

                  <div className="min-w-0">
                    <h3 className="font-semibold">
                      Phone
                    </h3>

                    <p className="mt-1 break-words text-muted-foreground">
                      ____ 0366429055
                      <br />
                      +91 8472043949
                      <br />
                      +91 8812018503
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex min-w-0 gap-4">
                  <Mail
                    className="mt-1 shrink-0 text-primary"
                    size={22}
                  />

                  <div className="min-w-0">
                    <h3 className="font-semibold">
                      Email
                    </h3>

                    <p className="mt-1 break-all text-muted-foreground">
                      info@globalschool.edu.in
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex min-w-0 gap-4">
                  <Clock
                    className="mt-1 shrink-0 text-primary"
                    size={22}
                  />

                  <div className="min-w-0">
                    <h3 className="font-semibold">
                      Office Hours
                    </h3>

                    <p className="mt-1 text-muted-foreground">
                      Mon - Sat
                      <br />
                      9:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= GOOGLE MAP ================= */}
              <div className="mt-8 w-full overflow-hidden rounded-2xl border border-border">
                <div className="aspect-[4/3] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3570.320430725209!2d90.4939765754256!3d26.509817076889608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDMwJzM1LjMiTiA5MMKwMjknNDcuNiJF!5e0!3m2!1sen!2sin!4v1788923592264!5m2!1sen!2sin"
                    className="block h-full w-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Global School location in Saljhora, Bongaigaon, Assam"
                  />
                </div>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="min-w-0 p-6 sm:p-8 lg:p-10">
              <div className="grid gap-5">
                {/* Name */}
                <input
                  type="text"
                  placeholder="Full Name"
                  className="min-w-0 w-full rounded-xl border border-border bg-background px-5 py-4 outline-none transition focus:border-primary"
                />

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email Address"
                  className="min-w-0 w-full rounded-xl border border-border bg-background px-5 py-4 outline-none transition focus:border-primary"
                />

                {/* Phone */}
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="min-w-0 w-full rounded-xl border border-border bg-background px-5 py-4 outline-none transition focus:border-primary"
                />

                {/* Message */}
                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="min-w-0 w-full resize-none rounded-xl border border-border bg-background px-5 py-4 outline-none transition focus:border-primary"
                />

                {/* Button */}
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