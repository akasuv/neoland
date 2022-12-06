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
  <div className="h-30 w-full flex flex-col pt-2  border shadow-sm rounded-xl  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 border-gray-700 shadow-slate-700/[.7]">
    <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-3 gap-y-3">
      <FontAwesomeIcon icon={icon} size="2x" />
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  </div>
);

const sections = [
  { title: "Color Schemes", icon: faPalette, href: "/color-schemes" },
  { title: "Plugins", icon: faCube, href: "/plugins" },
];

const Hero = () => (
  <div className="flex gap-x-4 w-full justify-center">
    {sections.map((section) => (
      <Link
        href={section.href}
        className="grow max-w-[280px] min-w-[100px] w-[100px] shrink-0"
      >
        <Card title={section.title} icon={section.icon} />
      </Link>
    ))}
  </div>
);

export default Hero;
