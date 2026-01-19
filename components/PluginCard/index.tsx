"use client";
import React from "react";
import { Tag } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faBolt } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export type PluginProps = {
  name: string;
  description: string;
  link: string;
  tags: string[];
  id: string;
  hideReadMe?: boolean;
};

const Plugin = ({
  id,
  name,
  description,
  link = "",
  tags,
  hideReadMe = true,
}: PluginProps) => {
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
    const rawContentLink =
      link.replace("github.com", "raw.githubusercontent.com") +
      "/master/README.md";
    if (isOpen || !hideReadMe) {
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
  }, [isOpen, hideReadMe, link]);

  const MarkdownContent = () => (
    <ReactMarkdown
      className="prose markdown"
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const isInline = !match;
          return !isInline && match ? (
            <SyntaxHighlighter
              style={coldarkDark}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      urlTransform={transformImageUri}
    >
      {readMeContent}
    </ReactMarkdown>
  );

  return (
    <div
      className={
        "p-6 border shadow-sm rounded-xl bg-gray-800 border-gray-700 shadow-slate-700/[.7]"
      }
    >
      <div className="flex items-start sm:items-start justify-between gap-x-4 flex-col sm:flex-col md:flex-row gap-y-4">
        <div className="flex items-start md:items-center gap-x-6 flex-col sm:flex-col md:flex-row sm:items-start gap-y-4">
          <div>
            <a href={`/plugin/${id}`}>
              <FontAwesomeIcon
                icon={faCube}
                size="2x"
                className="text-green-300"
              />
            </a>
          </div>
          <div>
            <a href={`/plugin/${id}`}>
              <h3 className="text-lg font-bold text-white hover:underline">
                {name}
              </h3>
              <p className="text-gray-400">{description}</p>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-x-4 grow-0 shrink-0 w-full md:w-fit justify-between">
          <Button
            variant="secondary"
            className={cn(
              "whitespace-nowrap py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm bg-gray-700 hover:bg-gray-600 focus:ring-offset-gray-800",
              {
                hidden: !hideReadMe,
              },
            )}
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faBolt} />
            Instant Doc
          </Button>
        </div>
      </div>
      <div className="mt-4 sm:pl-0 md:pl-12 flex justify-between flex-wrap gap-y-4">
        <div className="flex gap-x-4">
          {tags?.map((tag) => <Tag key={tag} text={tag} />)}
        </div>
        <a
          className="inline-flex items-center gap-2 text-sm font-medium text-white hover:underline"
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
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-gray-800 border-gray-700">
          <DialogHeader className="border-b border-gray-700 pb-3">
            <DialogTitle className="text-white">{name}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="h-64 flex flex-col justify-center items-center">
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
            ) : (
              readMeContent && <MarkdownContent />
            )}
          </div>
          <DialogFooter className="border-t border-gray-700 pt-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-gray-800 hover:bg-slate-800 border-gray-700 text-gray-400 hover:text-white"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!hideReadMe ? (
        isLoading ? (
          <div className="h-[400px] flex flex-col border-t py-4 mt-8 bg-gray-800 border-gray-700">
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
            <div className="border-t py-4 mt-8 border-gray-700 overflow-x-auto">
              <MarkdownContent />
            </div>
          )
        )
      ) : null}
    </div>
  );
};

export default Plugin;
