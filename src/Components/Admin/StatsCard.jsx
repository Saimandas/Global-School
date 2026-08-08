import React from "react";

const StatsCard = ({
  title,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">

      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {value}
      </h2>

    </div>
  );
};

export default StatsCard;