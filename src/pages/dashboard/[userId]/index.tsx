/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { api } from "../../../utils/api";
import { TimeStamp } from "@prisma/client";

const Dashboard = () => {
  const { data: session } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: timeStamps, isLoading } = api.time.getTime.useQuery();
  if (!session) {
    return (
      <div className="container">
        <h1>Not Authorized</h1>
      </div>
    );
  }
  return (
    <div className="container">
      <a role={"button"} href={`${window.location.href}/new`}>New Time Stamp</a>
      <h1>Dashboard</h1>
      <h2>{session.user.name}</h2>
      <div className="mx-auto max-w-xl p-8 dark:bg-gray-800 dark:text-gray-100">
        <ul className="space-y-12">
          {timeStamps &&
            timeStamps.map((timeStamp: TimeStamp) => (
              <li key={timeStamp.id} className="flex items-start space-x-3">
                <p
                  className="flex max-w-[100px] h-8 items-center text-sm"
                >
                  {String(timeStamp.date.toDateString())}
                </p>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between space-x-4 dark:text-gray-400">
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="group my-1 inline-flex items-center space-x-2 rounded-full border px-3 py-1 text-sm dark:border-gray-700"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full dark:bg-violet-400"
                      ></span>
                      <span className="group-hover:underline dark:text-gray-100">
                        {timeStamp.type}
                      </span>
                    </a>
                    <span className="whitespace-nowrap text-xs">
                      {timeStamp.time} minutes
                    </span>
                  </div>
                  <div>
                    <p>{timeStamp.note}</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
