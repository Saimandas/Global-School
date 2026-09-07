import React from "react";
import Button from "../UI/Button";
import { Plus } from "lucide-react";

const PageHeader = ({
  title,
  description,
  onAdd,
  buttonText = "Add",
}) => {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

      <div>

        <h1 className="text-4xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {description}
        </p>

      </div>

      <Button
        onClick={onAdd}
        className="flex items-center gap-2"
      >
        <Plus size={18}/>
        {buttonText}
      </Button>

    </div>
  );
};

export default PageHeader;