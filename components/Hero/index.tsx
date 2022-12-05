import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faCube,
  faBookTanakh,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import React from "react";
import Link from "next/link";

const Card = ({ title, icon }: { title: string; icon: IconDefinition }) => (
  <div className="h-30 w-48 flex flex-col  border shadow-sm rounded-xl  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 dark:border-gray-700 dark:shadow-slate-700/[.7]">
    <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-3 gap-y-3">
      <FontAwesomeIcon icon={icon} size="2x" />
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {title}
      </h3>
    </div>
  </div>
);

const sections = [
  { title: "Theme", icon: faPalette, href: "/theme" },
  { title: "Plugin", icon: faCube, href: "/plugin" },
  { title: "Tutorial", icon: faBookTanakh, href: "/tutorial" },
];

const Hero = () => (
  <div className="flex gap-x-4 w-full max-w-[800px]">
    {sections.map((section) => (
      <Link href={section.href}>
        <Card title={section.title} icon={section.icon} />
      </Link>
    ))}
  </div>
);

export default Hero;
