import React from "react";
import { FileText } from "lucide-react";

const EmptyState = ({
  text,
}) => {
  return (

    <div className="rounded-2xl border border-dashed border-border bg-card py-20 text-center">

      <FileText
        size={50}
        className="mx-auto text-primary"
      />

      <h2 className="mt-5 text-2xl font-semibold">

        {text}

      </h2>

    </div>

  );
};

export default EmptyState;