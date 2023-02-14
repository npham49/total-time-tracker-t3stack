/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import React from "react";
import { useSession } from "next-auth/react";
import Datepicker from "react-tailwindcss-datepicker";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";

const NewItem = () => {
  const { data: session } = useSession();
  const [timeStamps, setTimeStamps] = React.useState({
    date: {
      startDate: new Date(),
      endDate: new Date(),
    },
    time: "",
    type: "",
    note: "",
  });
  const postTimeStamp = api.time.postTime.useMutation()
  const handleSubmit = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();
    console.log(timeStamps);
    const postTime = postTimeStamp.mutate({
      // @ts-ignore
      date: timeStamps.date.startDate,
      time: Number(timeStamps.time) as unknown as number,
      type: timeStamps.type,
      note: timeStamps.note,
    })
    if (postTimeStamp.isSuccess) {
      window.location.href = `/dashboard/${session?.user.id || "404"}`
    }

  };

  return (
    <div className="container">
      <h1>New Time Stamp</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <Datepicker
              useRange={false}
              asSingle={true}
              value={timeStamps.date}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange={(e) => setTimeStamps({ ...timeStamps, date: e })}
            />
          <label htmlFor="time" className="mt-20">
            Time
            <input
              type="number"
              id="time"
              name="time"
              placeholder="time"
              value={timeStamps.time}
              onChange={(e) =>
                setTimeStamps({ ...timeStamps, time: e.target.value })
              }
              required
            />
          </label>
          <label htmlFor="email">
            Type
            <input
              type="text"
              id="type"
              name="type"
              placeholder="type"
              value={timeStamps.type}
              onChange={(e) =>
                setTimeStamps({ ...timeStamps, type: e.target.value })
              }
              required
            />
          </label>
          <label htmlFor="note">
            Note
            <textarea
              typeof="text"
              id="note"
              name="note"
              placeholder="note"
              value={timeStamps.note}
              onChange={(e) =>
                setTimeStamps({ ...timeStamps, note: e.target.value })
              }
              required
            />
          </label>
        </div>
        <button role={"button"} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewItem;
