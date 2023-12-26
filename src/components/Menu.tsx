import { Link, useLocation } from 'react-router-dom';

import GrassRoundedIcon from '@mui/icons-material/GrassRounded';

import { joinClassNames } from '@/lib/tailwind-utils';

const PATHS = [
  ['Dashboard', '/'],
  ['Produtores', '/produtores'],
];

export default function Menu() {
  const location = useLocation();
  const itemIsActive = (path: string) => {
    const slicedPath = path.slice(1) || null;
    if (slicedPath === null) return location.pathname === '/';

    return location.pathname.includes(slicedPath);
  };

  return (
    <nav className="bg-primary w-2/12 h-screen p-4">
      <div className="flex items-end mb-10">
        <GrassRoundedIcon fontSize="large" htmlColor="white" />
        <Link to="/">
          <h1 className="text-xl text-white font-black ml-3 cursor-pointer">
            Brain Agriculture
          </h1>
        </Link>
      </div>

      {PATHS.map(([label, path]) => (
        <div
          className={joinClassNames(
            'w-4/6 rounded-md mt-5 transition-all',
            `${itemIsActive(path) ? 'bg-secondary' : 'hover:bg-terciary'}`
          )}
          key={label}
        >
          <Link to={path}>
            <h2
              className={joinClassNames(
                'text-lg font-medium transition-all p-2',
                `${
                  itemIsActive(path)
                    ? 'text-gray-900'
                    : 'text-white hover:text-gray-900'
                }`
              )}
            >
              {label}
            </h2>
          </Link>
        </div>
      ))}
    </nav>
  );
}
