import React from "react";

const about = () => {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100">
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione,
              fugit? Aspernatur, ullam enim, odit eaque quia rerum ipsum
              voluptatem consequatur ratione, doloremque debitis? Fuga labore
              omnis minima, quisquam delectus culpa!
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Lorem ipsum dolor sit amet.</h3>
            <p className="mt-1 dark:text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione,
              fugit? Aspernatur, ullam enim, odit eaque quia rerum ipsum
              voluptatem consequatur ratione, doloremque debitis? Fuga labore
              omnis minima, quisquam delectus culpa!
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Lorem ipsum dolor sit amet.</h3>
            <p className="mt-1 dark:text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione,
              fugit? Aspernatur, ullam enim, odit eaque quia rerum ipsum
              voluptatem consequatur ratione, doloremque debitis? Fuga labore
              omnis minima, quisquam delectus culpa!
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Lorem ipsum dolor sit amet.</h3>
            <p className="mt-1 dark:text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione,
              fugit? Aspernatur, ullam enim, odit eaque quia rerum ipsum
              voluptatem consequatur ratione, doloremque debitis? Fuga labore
              omnis minima, quisquam delectus culpa!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default about;
