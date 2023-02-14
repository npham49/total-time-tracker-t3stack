import React from "react";

const about = () => {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100 container">
      <div className="container mx-auto flex flex-col justify-center p-4 md:p-8">
        <p className="p-2 text-center text-sm font-medium uppercase tracking-wider">
          About
        </p>
        <h2 className="mb-12 text-center text-4xl font-bold leading-none sm:text-5xl">
          Total Time Tracker
        </h2>
        <div className="grid gap-10 sm:p-3 md:grid-cols-2 md:gap-8 lg:px-12 xl:px-32">
          <div>
            <h3 className="font-semibold">Purpose of this website</h3>
            <p className="mt-1 dark:text-gray-400">
              This website is designed to track total time spent on an item,
              a good example would be a project. You can track how long you have spent on a project.
              You can also share your time sheet with someone else.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Sharing function</h3>
            <p className="mt-1 dark:text-gray-400">
              You can share your time sheet with someone else. You can share it with a friend, a colleague or a client.
              This function would be helpful during charging for a project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default about;
