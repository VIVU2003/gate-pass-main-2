import { Link } from "react-router-dom";
function Heading(props: {
  heading: string;
  subheading: string;
  link: string;
  log: string;
}) {
  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold">{props.heading}</h1>
      <p className="text-gray-500">
        {props.subheading}{" "}
        <Link to={props.link} className="text-blue-600">
          {props.log}
        </Link>
      </p>
    </div>
  );
}
export default Heading;
