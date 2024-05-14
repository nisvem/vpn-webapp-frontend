import { Link, RouteObject, useMatches } from 'react-router-dom';

const Breadcrumb = () => {
  const matches: RouteObject[] = useMatches();
  let crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match));

  console.log(crumbs);

  return (
    <ul className='breadcrumb'>
      {crumbs.map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
