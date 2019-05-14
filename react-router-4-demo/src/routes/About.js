import React from "react";

const About = ({ match }) => {
  return (
    <div>
      <h2>{match.params.username} About</h2>
    </div>
  );
};

export default About;
