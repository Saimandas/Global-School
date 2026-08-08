import React from "react";
import {
  CircleCheck,
  FileText,
  CalendarDays,
  School,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";

import Container from "../../Components/ui/Container";

const Admission = () => {
  return (
    <main className="pb-20">

      {/* Header
      <section className="border-b border-border bg-muted/30">
        <Container className="py-12">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            Admissions Open • Session 2026–27
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Admissions
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Join Global School and become a part of an inspiring learning
            community. Our admission process is simple, transparent and designed
            to help every student begin their academic journey with confidence.
          </p>
        </Container>
      </section> */}

      {/* Admission Journey */}
      <section className="py-14">
        <Container>
          <div className="mb-10">
            <h2 className="text-3xl font-bold">
              Your Admission Journey
            </h2>

            <p className="mt-2 text-muted-foreground">
              Complete your admission in four simple steps.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-border p-6">
              <School className="mb-5 text-primary" size={34} />

              <span className="text-xs font-semibold tracking-widest text-primary">
                STEP 01
              </span>

              <h3 className="mt-2 text-xl font-semibold">
                Visit School
              </h3>

              <p className="mt-3 text-muted-foreground">
                Meet our admission team and explore the campus.
              </p>
            </div>

            <div className="rounded-2xl border border-border p-6">
              <FileText className="mb-5 text-primary" size={34} />

              <span className="text-xs font-semibold tracking-widest text-primary">
                STEP 02
              </span>

              <h3 className="mt-2 text-xl font-semibold">
                Submit Documents
              </h3>

              <p className="mt-3 text-muted-foreground">
                Submit the required documents for verification.
              </p>
            </div>

            <div className="rounded-2xl border border-border p-6">
              <CircleCheck className="mb-5 text-primary" size={34} />

              <span className="text-xs font-semibold tracking-widest text-primary">
                STEP 03
              </span>

              <h3 className="mt-2 text-xl font-semibold">
                Verification
              </h3>

              <p className="mt-3 text-muted-foreground">
                Our team verifies your documents and eligibility.
              </p>
            </div>

            <div className="rounded-2xl border border-border p-6">
              <ChevronRight className="mb-5 text-primary" size={34} />

              <span className="text-xs font-semibold tracking-widest text-primary">
                STEP 04
              </span>

              <h3 className="mt-2 text-xl font-semibold">
                Admission Confirmed
              </h3>

              <p className="mt-3 text-muted-foreground">
                Complete the formalities and begin your journey.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* Information */}
      <section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">

            {/* Eligibility */}
            <div className="rounded-2xl border border-border p-7">
              <h3 className="text-2xl font-semibold">
                Eligibility
              </h3>

              <div className="mt-6 space-y-5">

                <div className="flex items-start justify-between border-b border-border pb-4">
                  <div>
                    <h4 className="font-semibold">
                      Pre-Primary
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Nursery – UKG
                    </p>
                  </div>

                  <span className="text-sm">
                    Age 3+
                  </span>
                </div>

                <div className="flex items-start justify-between border-b border-border pb-4">
                  <div>
                    <h4 className="font-semibold">
                      Primary
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Classes I–V
                    </p>
                  </div>

                  <span className="text-sm">
                    Previous Class
                  </span>
                </div>

                <div className="flex items-start justify-between border-b border-border pb-4">
                  <div>
                    <h4 className="font-semibold">
                      Secondary
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Classes VI–X
                    </p>
                  </div>

                  <span className="text-sm">
                    Previous Class
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">
                      Higher Secondary
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      Classes XI–XII
                    </p>
                  </div>

                  <span className="text-sm">
                    Class X Pass
                  </span>
                </div>

              </div>
            </div>

            {/* Documents */}

            <div className="rounded-2xl border border-border p-7">
              <h3 className="text-2xl font-semibold">
                Required Documents
              </h3>

              <div className="mt-6 space-y-4">

                <div className="flex items-center gap-3">
                  <CircleCheck size={18} className="text-primary" />
                  Birth Certificate
                </div>

                <div className="flex items-center gap-3">
                  <CircleCheck size={18} className="text-primary" />
                  Aadhaar Card
                </div>

                <div className="flex items-center gap-3">
                  <CircleCheck size={18} className="text-primary" />
                  Passport Size Photographs
                </div>

                <div className="flex items-center gap-3">
                  <CircleCheck size={18} className="text-primary" />
                  Previous Marksheet
                </div>

                <div className="flex items-center gap-3">
                  <CircleCheck size={18} className="text-primary" />
                  Transfer Certificate
                </div>

              </div>
            </div>

            {/* Important Dates */}

            <div className="rounded-2xl border border-border p-7">
              <div className="flex items-center gap-3">
                <CalendarDays className="text-primary" />

                <h3 className="text-2xl font-semibold">
                  Important Dates
                </h3>
              </div>

              <div className="mt-7 space-y-6">

                <div>
                  <p className="text-sm text-muted-foreground">
                    Admission Opens
                  </p>

                  <h4 className="mt-1 text-lg font-semibold">
                    15 January 2026
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Last Date
                  </p>

                  <h4 className="mt-1 text-lg font-semibold">
                    31 March 2026
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Session Begins
                  </p>

                  <h4 className="mt-1 text-lg font-semibold">
                    05 April 2026
                  </h4>
                </div>

              </div>
            </div>

          </div>
        </Container>
      </section>
            {/* FAQ & Contact */}
      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">

            {/* FAQ */}
            <div className="rounded-2xl border border-border p-8">
              <h2 className="text-3xl font-bold">
                Frequently Asked Questions
              </h2>

              <div className="mt-8 space-y-6">

                <div className="border-b border-border pb-5">
                  <h3 className="font-semibold">
                    What is the minimum age for admission?
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    Children applying for Pre-Primary should be at least
                    3 years old. Eligibility for other classes depends on
                    the previous class completed.
                  </p>
                </div>

                <div className="border-b border-border pb-5">
                  <h3 className="font-semibold">
                    Can students take admission in the middle of the session?
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    Mid-session admission may be granted depending on seat
                    availability and school policies.
                  </p>
                </div>

                <div className="border-b border-border pb-5">
                  <h3 className="font-semibold">
                    Does the school provide transport?
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    Yes. School transportation is available on selected
                    routes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">
                    How can I contact the admission office?
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    You can contact us by phone, email or by visiting the
                    school campus during office hours.
                  </p>
                </div>

              </div>
            </div>

            {/* Contact */}
            <div className="rounded-2xl border border-border bg-muted/30 p-8">

              <h2 className="text-2xl font-bold">
                Admission Office
              </h2>

              <p className="mt-3 text-muted-foreground">
                Need help with the admission process? Our team is here to
                assist you.
              </p>

              <div className="mt-8 space-y-6">

                <div className="flex items-start gap-4">
                  <Phone
                    className="mt-1 text-primary"
                    size={20}
                  />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Phone
                    </p>

                    <h4 className="font-semibold">
                      +91 98765 43210
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail
                    className="mt-1 text-primary"
                    size={20}
                  />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Email
                    </p>

                    <h4 className="font-semibold">
                      admissions@globalschool.com
                    </h4>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Office Hours
                  </p>

                  <h4 className="mt-1 font-semibold">
                    Monday – Saturday
                  </h4>

                  <p className="text-muted-foreground">
                    9:00 AM – 4:00 PM
                  </p>
                </div>

              </div>

            </div>

          </div>
        </Container>
      </section>

    </main>
  );
};

export default Admission;