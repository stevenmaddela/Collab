export default function Project(props) {
  const tasks = this.props.tasks;
  const members = this.props.members;
  return (
    <div>
      <h1>{this.props.title}</h1>
      <br />
      <h2>Leader: {this.props.projectLeader}</h2>
      <br />
      <h3>{this.props.description}</h3>
      <br />
      <ul>
        {tasks.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
      <br />
      <ul>
        {members.map((user) => {
          return <li>{user}</li>;
        })}
      </ul>
    </div>
  );
}
