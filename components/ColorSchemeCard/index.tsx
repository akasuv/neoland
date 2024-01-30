"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCube,
  faPalette,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export type ColorSchemeCardProps = {
  name: string;
  description: string;
  author: string;
  link: string;
  last_updated: string;
  stars: number;
  avatar: string;
  tag1?: string;
  tag2?: string;
  id: string;
};

const ColorShemeCard = ({
  name,
  description,
  link,
  id,
}: ColorSchemeCardProps) => {
  const [readMeContent, setReadMeContent] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const transformImageUri = (input: string) =>
    /^https?:/.test(input)
      ? input
      : `${link.replace(
          "github.com",
          "raw.githubusercontent.com",
        )}/master/${input}`;

  React.useEffect(() => {
    window.addEventListener("close.hs.overlay", () => {
      setIsOpen(false);
    });
  }, []);

  React.useEffect(() => {
    const rawContentLink =
      link.replace("github.com", "raw.githubusercontent.com") +
      "/master/README.md";
    if (isOpen) {
      fetch(rawContentLink)
        .then((res) => res.text())
        .then((data) => {
          setReadMeContent(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col border shadow-sm rounded-xl bg-gray-800 border-gray-700 shadow-slate-700/[.7]">
      <div className="p-4 md:p-7 flex flex-col justify-between grow gap-y-4">
        <div className="flex justify-between items-center shrink-0">
          <a href={`/plugin/${id}`}>
            <FontAwesomeIcon icon={faPalette} size="2x" />
          </a>
          <button
            onClick={() => setIsOpen(true)}
            data-hs-overlay={`#p-${id}`}
            type="button"
            className="whitespace-nowrap py-3 px-4 grow-0 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-500  transition-all text-sm bg-gray-700 hover:bg-gray-600 focus:ring-offset-gray-800"
          >
            <FontAwesomeIcon icon={faBolt} />
            Instant Doc
          </button>
        </div>
        <a href={`/plugin/${id}`}>
          <h3 className="text-lg font-bold text-white mt-4 hover:underline">
            {name}
          </h3>
          <p className="mt-2 text-gray-400">{description}</p>
        </a>
        <div className="flex justify-between items-center hover:underline">
          <a
            className="inline-flex items-center gap-2 text-sm font-medium text-white"
            href={link}
            target="_blank"
          >
            GitHub
            <svg
              className="w-2.5 h-auto"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
      <div
        id={`p-${id}`}
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:w-full md:w-3/4 p-4 pt-8 sm:mx-auto h-[calc(100%-3.5rem)]">
          <div className="max-h-full w-full overflow-hidden flex flex-col border shadow-sm rounded-xl bg-gray-800 border-gray-700 shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b border-gray-700">
              <h3 className="font-bold text-white">{name}</h3>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm focus:ring-gray-700 focus:ring-offset-gray-800"
                data-hs-overlay={`#p-${id}`}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3.5 h-3.5"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              {isLoading ? (
                <div className="h-screen flex flex-col border shadow-sm rounded-xl bg-gray-800 border-gray-700 shadow-slate-700/[.7]">
                  <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                    <div className="flex justify-center">
                      <div
                        className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                readMeContent && (
                  <ReactMarkdown
                    className="prose markdown"
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            children={String(children).replace(/\n$/, "")}
                            style={coldarkDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    children={readMeContent}
                    transformImageUri={transformImageUri}
                  />
                )
              )}
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-700">
              <button
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium text-gray-700 shadow-sm align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm bg-gray-800 hover:bg-slate-800 border-gray-700 text-gray-400 hover:text-white focus:ring-offset-gray-800"
                data-hs-overlay={`#p-${id}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorShemeCard;
