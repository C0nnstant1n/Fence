import * as React from "react";
import PostService from "./PostService";

const postService = new PostService();
interface Istate {
  data: string[];
  inputValue: string;
}

export default class Posts extends React.Component<any, Istate> {
  constructor(props) {
    console.log(props);

    super(props);
    this.state = {
      data: [],
      inputValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event);

    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event) {
    postService.createPost({ text: this.state.inputValue });
    this.getData();
    this.setState({ inputValue: "" });
  }

  getData() {
    postService.getPosts().then((result) => {
      this.setState({ data: result.data });
    });
  }

  componentDidMount(): void {
    this.getData();
  }

  setLike(post) {
    postService.setLikePost(post.id);
    post.likesCount += 1;
    this.forceUpdate();
  }

  render() {
    return (
      <div id='posts'>
        {this.state.data.map((post) => (
          <div id={"post_" + post.id}>
            <p> {post.text} </p>
            <button onClick={() => this.setLike(post)}>
              {" "}
              {post.likesCount}
            </button>
            <p> Date : {post.date}</p>
            <hr />
          </div>
        ))}
        <input
          type='text'
          onChange={this.handleChange}
          value={this.state.inputValue}
        ></input>
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}
