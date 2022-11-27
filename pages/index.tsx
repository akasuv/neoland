// @ts-nocheck
import { createClient } from "@supabase/supabase-js";
import React from "react";
import Head from "next/head";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export type PluginCardProps = {
  name: string;
  description: string;
  author: string;
  link: string;
  last_updated: string;
  stars: number;
  avatar: string;
};

const PluginCard = ({
  name,
  description,
  author,
  link,
  last_updated,
  stars,
  avatar,
}: PluginCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl w-full max-w-[800px] mx-auto">
      <div className="card-body flex justify-between">
        <div className="flex flex-col w-full gap-y-4">
          <div className="flex justify-between items-center w-full gap-x-4">
            <h2 className="card-title text-xl md:text-3xl max-w-1/2 text-ellipsis overflow-hidden block">
              {name}
            </h2>
            <a
              className="btn gap-2"
              href={link}
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
          </div>
          <p className="text-sm md:text-base">{description}</p>
        </div>
      </div>
      <div className="stats stats-vertical lg:stats-horizontal  shadow">
        <div className="stat">
          <div className="stat-title">Total Stars</div>
          <div className="stat-value text-secondary text-xl">{stars}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Last Updated </div>
          <div className="flex">
            <div className="stat-value  text-xl">
              {last_updated
                ? formatDistanceToNow(new Date(last_updated), {
                    addSuffix: true,
                  })
                : "-"}
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <div className="avatar">
              <a
                className="w-16"
                href={`https://github.com/${author}`}
                target="_blank"
                rel="noreferrer"
              >
                <img className="rounded-full" src={avatar} alt={author} />
              </a>
            </div>
          </div>
          <div className="stat-title">Maintained By</div>
          <div className="stat-value text-xl row-span-2">{author}</div>
        </div>
      </div>
    </div>
  );
};
export default function Home({ data = [] }: any) {
  return (
    <div className="bg-neutral min-h-screen pb-16">
      <Head>
        <title>NeoLand</title>
        <meta name="description" content="All about NeoVim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="px-8 py-16 flex flex-col items-center relative gap-y-4">
        <h1 className="text-5xl font-black font-hubot flex-1 text-center">
          NeoLand
        </h1>
        <p>
          " NeoLand is a collection of plugins, themes and other resources for
          NeoVim. "
        </p>
        <p>👆 GitHub Copilot said so, I guess we've got lots do.</p>
        <a
          className="btn btn-outline btn-active gap-2 absolute right-16"
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
          <PluginCard {...(item as PluginCardProps)} />
        ))}
      </main>
      <div></div>
    </div>
  );
}

export async function getStaticProps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase.from("Plugins").select();

  return { props: { data } };
}
