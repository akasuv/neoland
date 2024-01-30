// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jsdom from "jsdom";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { Octokit } from "octokit";
import fetch from "node-fetch";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { JSDOM } = jsdom;

  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  });

  const getPlugins = async () => {
    const res = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}{?ref}",
      {
        owner: "rockerBOO",
        repo: "awesome-neovim",
        path: "README.md",
      },
    );

    const content = await fetch(res.data.download_url).then((res) =>
      res.text(),
    );
    const html = await mdToHTML(content);
    const dom = new JSDOM(html as any);
    const listItems = dom.window.document.querySelectorAll("li");
    const filtered = Array.prototype.filter.call(
      listItems,
      (item) =>
        item.children[0].href.startsWith("http") &&
        item.children[0].href.includes("github"),
    );

    let data: any = Array.prototype.map.call(filtered, (item: any) => {
      return {
        name: item.children[0].textContent.split("/")[1],
        author: item.children[0].textContent.split("/")[0],
        link: item.children[0].href,
        description: item.textContent.split(" - ")[1],
      };
    });

    let additional: any = {};
    try {
      additional = await getRepoStats(data.author, data.name);

      data = {
        ...data,
        stars: additional.data.stargazers_count,
        lastUpdated: additional.data.updated_at,
        avatar: additional.data.owner.avatar_url,
      };
    } catch (err) {
      console.log(err);
    }

    return data;
  };

  async function getRepoStats(author: string, repoName: string) {
    return await octokit.request("GET /repos/{owner}/{repo}", {
      owner: author,
      repo: repoName,
    });
  }

  async function mdToHTML(md: any) {
    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(md);
    return file;
  }

  const data = await getPlugins();
  res.status(200).json(data);
}
