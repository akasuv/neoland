// @ts-nocheck
import React from "react";
import { Octokit } from "octokit";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export type PluginCardProps = {
  name: string;
  description: string;
  author: string;
  link: string;
  lastUpdated: string;
  stars: number;
  avatar: string;
};

const PluginCard = ({
  name,
  description,
  author,
  link,
  lastUpdated,
  stars,
  avatar,
}: PluginCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl w-[800px]  mx-auto">
      <div className="card-body flex flex-row justify-between">
        <div className="flex flex-col gap-y-4">
          <h2 className="card-title text-3xl">{name}</h2>
          <p>{description}</p>
        </div>
        <a className="btn gap-2" href={link} target="_blank" rel="noreferrer">
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
          GitHub
        </a>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Stars</div>
          <div className="stat-value text-secondary text-xl">{stars}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Last Updated </div>
          <div className="flex">
            <div className="stat-value  text-xl">
              {lastUpdated
                ? formatDistanceToNow(new Date(lastUpdated), {
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
    <div className="bg-neutral min-h-screen">
      <Head>
        <title>NeoLand</title>
        <meta name="description" content="All about NeoVim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="py-16 text-center">
        <h1 className="text-5xl font-black font-hubot">NeoLand</h1>
      </header>
      <main className="flex flex-col gap-y-4">
        {data.map((item: any) => (
          <PluginCard {...(item as PluginCardProps)} />
        ))}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  });
  async function getRepoStats(author: string, repoName: string) {
    return await octokit.request("GET /repos/{owner}/{repo}", {
      owner: author,
      repo: repoName,
    });
  }
  let data = await fetch("https://neoland.vercel.app/api/hello").then((res) =>
    res.json()
  );

  data.forEach((item: any) => console.log(item));

  const additionalData = data.map(
    async (item: any) => await getRepoStats(item.author, item.name)
  );

  const res = await Promise.allSettled(additionalData);

  res.forEach((item) => console.log(item));

  res.forEach((item, idx) => {
    data[idx] = {
      ...data[idx],
      stars: item.value?.data?.stargazers_count,
      lastUpdated: item.value?.data?.updated_at,
      avatar: item.value?.data?.owner.avatar_url,
    };
  });

  return { props: { data } };
}
