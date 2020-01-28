import React from "react";
import "./TotalServer.scss";
import { connect } from "react-redux";
import Card from "../../Card";
import firebase from "../../../../firebase";

const TotalServers = props => {
  const joinServer = id => {
    firebase
      .database()
      .ref("users")
      .child(props.user.uid + "/servers/" + id)
      .set({ id });
  };
  return (
    <div className="totalservers">
      {props.totalServers
        ? props.totalServers.map(server => (
            <Card
              key={server.id}
              img={server.url}
              onClick={() => joinServer(server.id)}
              header={server.name}
              joined={
                props.joinedServer
                  ? props.joinedServer[server.id]
                    ? true
                    : false
                  : false
              }
            />
          ))
        : null}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    totalServers: state.server.totalServers,
    joinedServer: state.server.joinedServers,
    user: state.user.user
  };
}
export default connect(mapStateToProps)(TotalServers);
