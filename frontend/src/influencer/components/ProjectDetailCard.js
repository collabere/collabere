import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import ProjectBudgetInfoModal from "./ProjectBudgetInfoModal";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Link } from "react-router-dom";

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false
    };
  }

  handlePopoverClose = () => {
    this.setState({ popoverOpen: false });
  };

  handlePopoverOpen = () => {
    this.setState({ popoverOpen: true });
  };

  parseDate = (serverDateString) => {
    var array=serverDateString.split('T');
    var date=array[0];
    var time = array[1].split(".")[0];
    return date.concat(" at ").concat(time)
  }

  render() {
    const pathToNavigate = "/messages/"
      .concat(this.props.influencerUsername)
      .concat("/")
      .concat(this.props.clientId)
      .concat("/")
      .concat(this.props.dateStarted);
    return (
      <div style={{ width: "100%" }}>
        <Card style={{ backgroundColor: "#D8BFD8" }}>
          <CardActionArea
            style={{ textDecoration: "none" }}
            component={Link}
            to={pathToNavigate}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.clientName}
              </Typography>
              <Typography
                style={{ color: "#4B0082" }}
                variant="body2"
                color="#4B0082"
                component="p"
              >
                Project Starting Date: {this.parseDate(this.props.dateStarted.toString())}
              </Typography>
              <Typography
                style={{ color: "#4B0082" }}
                variant="body2"
                component="p"
              >
                Latest Text: {this.props.introText}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Checkbox
              //   checked={state.checkedA}
              //   onChange={handleChange("checkedA")}
              //   value="checkedA"
              inputProps={{
                "aria-label": "primary checkbox"
              }}
            />

            <ProjectBudgetInfoModal
              minBudget={this.props.minBudget}
              maxBudget={this.props.maxBudget}
            />
            <Button size="small" color="secondary">
              Delete{" "}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ProjectCard;
