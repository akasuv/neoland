import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export type PluginProps = {
  name: string;
  description: string;
  author: string;
  link: string;
  last_updated: string;
  stars: number;
  avatar: string;
};

const Plugin = ({
  name,
  description,
  author,
  link,
  last_updated,
  stars,
  avatar,
}: PluginProps) => {
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
              <FontAwesomeIcon icon={faGithub} size="2x" />
              <p className="hidden md:block">GitHub</p>
            </a>
          </div>
          <p className="text-sm md:text-base">{description}</p>
        </div>
      </div>
      <div className="stats stats-vertical lg:stats-horizontal  shadow">
        <div className="stat">
          <div className="stat-title">Total Stars</div>
          <div className="stat-value text-secondary text-xl ">
            <FontAwesomeIcon icon={faStar} />
            <p className="ml-2 inline">{stars}</p>
          </div>
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

export default Plugin;
