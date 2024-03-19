import { Outlet } from 'react-router-dom';

export default function AppTitle(props) {
  const { title = 'Box-office', subtitle = 'Are you looking for new movie' } =
    props;

  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
