/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { useSession } from "next-auth/react";
import { api } from "../../../utils/api";
import type { TimeStamp } from "@prisma/client";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { userId } = router.query;
  const currentUserId = session?.user.id;

  // convert minutes to hours and minutes
  const { data: shared, isLoading: sharedIsLoading } = api.shared.getShared.useQuery();
  const { data: timeStamps, isLoading } = api.time.getTime.useQuery();
  const postShared = api.shared.postShared.useMutation();
  const utils = api.useContext();
  const deleteTimeStamp = api.time.deleteTime.useMutation(
    {
      onMutate: async (newEntry) => {
        await utils.time.getTime.cancel();
        utils.time.getTime.setData(undefined, (prevEntries: any) => {
          if (prevEntries) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return [newEntry, ...prevEntries];
          } else {
            return [newEntry];
          }
        });
      },
      onSettled: async () => {
        await utils.time.getTime.invalidate();
      },
    }
  );
  const deleteHandler = (id: string) => {
    const result = confirm("Are you sure you want to delete this time stamp?");
    if (result) {
      deleteTimeStamp.mutateAsync({ id: id })
      .then(() => {
        alert("Time stamp deleted");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      })
    }
  };
  const shareHandler = () => {
    const sharedArray = postShared.mutate({ userId: session?.user.id || ''});
    alert("Timesheet is now shared");
    window.location.reload();
    if (userId !== currentUserId) {
      return (
        <div className="container">
          <h1>Not Authorized</h1>
        </div>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (!session) {
      return (
        <div className="container">
          <h1>Not Authorized</h1>
        </div>
      );
    }
  }
  const timeConverter = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hours ${mins} minutes`;
  };
  return (
    <div className="container">
      <h1 className="">{session?.user.name}&apos;s Dashboard</h1>
      <div className="flex">
        <a role={"button"} href={`${router.asPath}/new`}>
          New Time Stamp
        </a>
        {sharedIsLoading && <p>Loading...</p>}
        {shared?.length && shared.length > 0 ? (
          <button
            role={"button"}
            onClick={ () => {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              void navigator.clipboard.writeText(`${window.location.origin}/shared/${shared[0]?.id}`);
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              alert("Copied to clipboard: " + `${window.location.origin}/shared/${shared[0]?.id || '404'}`);
            }}
            className="ml-2 w-32"
          >
            Copy Share link
          </button>
        ) : (
          <button
            role={"button"}
            onClick={() => {
              shareHandler();
            }}
            className="ml-4 w-32"
          >
            Share
          </button>
        )}

        <p className="ml-auto">
          <b className="text-white">
            Total time spent:{" "}
            {timeConverter(
              timeStamps && timeStamps.length>0 ? timeStamps?.map((time) => time.time).reduce((prev, next) => prev + next) : 0
            )}
          </b>
        </p>
      </div>
      <div className="mx-auto p-8 dark:bg-gray-800 dark:text-gray-100">
        <ul className="space-y-12">
          <li className="flex items-start space-x-3 border-0 border-b-2 border-gray-200">
            <p className="flex h-8 min-w-[100px] items-center">Date</p>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between space-x-4 dark:text-gray-400"></div>
              <div>
                <p>Type & Note</p>
              </div>
            </div>
            <span className="whitespace-nowrap">Time</span>
          </li>
          {isLoading && <p>Loading...</p>}
          {timeStamps &&
            timeStamps.map((timeStamp: TimeStamp) => (
              <li key={timeStamp.id} className="flex items-start space-x-3">
                <p className="flex h-8 max-w-[100px] items-center text-sm">
                  {String(timeStamp.date.toDateString())}
                </p>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between space-x-4 dark:text-gray-400">
                    <p className="group my-1 inline-flex items-center space-x-2 rounded-full border px-3 py-1 text-sm dark:border-gray-700">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full dark:bg-violet-400"
                      ></span>
                      <span className="dark:text-gray-100">
                        {timeStamp.type}
                      </span>
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => deleteHandler(timeStamp.id)}
                        className="mr-0 ml-auto max-w-[100px]"
                        role={"button"}
                      >
                        Delete
                      </button>
                      <span className="whitespace-nowrap text-xs">
                        {timeStamp.time} minutes
                      </span>
                    </div>
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
