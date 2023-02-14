import React from 'react'
import { useRouter } from 'next/router'
import { api } from "../../utils/api";
import { TimeStamp } from '@prisma/client';

const Shared = () => {
  const router = useRouter();
  const { sharedId } = router.query  || "";
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {data:shared, isLoading:sharedIsLoading} = api.shared.getSharedPublic.useQuery({id: sharedId as string});
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const {data:sharedTime, isLoading} = api.time.getTimePublic.useQuery({userId: shared ? shared[0]?.userId as string : ""});
  if (shared) {
    console.log(sharedTime);
  }
  const timeConverter = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hours ${mins} minutes`;
  };
  
  if (sharedIsLoading) {
    return <p>Loading...</p>
  }
  if (!shared) {
    return <p>Not found</p>
  }
  return (
    <div className='container'>
      <div className='flex flex-row'>
      <h1>Shared Timesheet</h1>
      <p className="ml-auto">
          <b className="text-white">
            Total time spent:{" "}
            {timeConverter(
              sharedTime
                ?.map((time) => time.time)
                .reduce((prev, next) => prev + next) || 0
            )}
          </b>
        </p>
        </div>
      <div className="mx-auto p-8  dark:bg-gray-800 dark:text-gray-100">
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
          {sharedTime &&
            sharedTime.map((timeStamp: TimeStamp) => (
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
  )
}

export default Shared