"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faBolt } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

const ColorSchemeCard = ({
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
  }, [isOpen, link]);

  return (
    <div className="flex flex-col border shadow-sm rounded-xl bg-gray-800 border-gray-700 shadow-slate-700/[.7]">
      <div className="p-4 md:p-7 flex flex-col justify-between grow gap-y-4">
        <div className="flex justify-between items-center shrink-0">
          <a href={`/plugin/${id}`}>
            <FontAwesomeIcon icon={faPalette} size="2x" />
          </a>
          <Button
            onClick={() => setIsOpen(true)}
            variant="secondary"
            className="whitespace-nowrap py-3 px-4 grow-0 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all text-sm bg-gray-700 hover:bg-gray-600 focus:ring-offset-gray-800"
          >
            <FontAwesomeIcon icon={faBolt} />
            Instant Doc
          </Button>
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
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
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
              readMeContent && (
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
              )
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
    </div>
  );
};

export default ColorSchemeCard;
