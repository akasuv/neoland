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
  <div className="card h-20 w-30 md:h-40 md:w-60 border border-primary text-primary-content rounded-md hover:bg-primary text-primary hover:text-white transition-all duration-500 cursor-pointer">
    <div className="card-body p-3 flex flex-col items-center justify-center gap-y-4">
      <FontAwesomeIcon icon={icon} className="text-xl md:text-3xl" />
      <p className="font-bold text-sm md:text-2xl grow-0">{title}</p>
    </div>
  </div>
);

const sections = [
  { title: "Theme", icon: faPalette, href: "/theme" },
  { title: "Plugin", icon: faCube, href: "/plugin" },
  { title: "Tutorial", icon: faBookTanakh, href: "/tutorial" },
];

const Hero = () => (
  <div className="flex gap-x-4  w-full max-w-[800px]">
    {sections.map((section) => (
      <Link href={section.href}>
        <Card title={section.title} icon={section.icon} />
      </Link>
    ))}
  </div>
);

export default Hero;
