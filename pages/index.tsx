import { createClient } from "@supabase/supabase-js";
import { Hero, Plugin } from "@/components";
import React from "react";
import Head from "next/head";

export default function Home({ data = [] }: any) {
  return (
    <div className="bg-neutral min-h-screen pb-16">
      <Head>
        <title>NeoLand</title>
        <meta name="description" content="All about NeoVim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="py-16 pt-28 md:pt-40 flex flex-col items-center relative gap-y-4  relative h-[500px] md:h-screen">
        <h1 className="text-5xl font-black font-hubot  text-center ">
          NeoLand
        </h1>
        <p className="text-center">
          Everything about Neovim, Let the wonderland thrive.
        </p>
        <div className="form-control w-full max-w-[800px] mt-4 px-16">
          <div className="input-group w-full">
            <input
              type="text"
              placeholder="find the magic"
              className="input input-bordered grow"
            />
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="pt-10">
          <Hero />
        </div>
        <div className="absolute bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#1eb854"
              fill-opacity="1"
              d="M0,32L34.3,53.3C68.6,75,137,117,206,117.3C274.3,117,343,75,411,85.3C480,96,549,160,617,202.7C685.7,245,754,267,823,282.7C891.4,299,960,309,1029,282.7C1097.1,256,1166,192,1234,160C1302.9,128,1371,128,1406,128L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </div>
        <a
          className="btn btn-outline btn-active gap-2 absolute right-8  md:right-16 top-6 md:top-16"
          href="https://github.com/akasuv/neoland"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="24"
            height="24"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
          <p className="hidden md:block">GitHub</p>
        </a>
      </header>
      <main className="flex flex-col gap-y-4 px-8">
        {data.map((item: any) => (
          <Plugin {...item} />
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  const { data, error } = await supabase.from("Plugins").select();

  return { props: { data } };
}
