import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "programmé",
        "bg-blue-600": status === "attente",
        "bg-red-600": status === "annulé",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "programmé",
          "text-blue-500": status === "attente",
          "text-red-500": status === "annulé",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
