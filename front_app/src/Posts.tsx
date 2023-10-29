import React, { ChangeEvent } from "react";
import PostService from "./PostService";

const postService = new PostService();

export interface IPost {
  id: number;
  text: string;
  likesCount: number;
  date: Date;
}

interface Istate {
  data: IPost[];
  inputValue: string;
}

export default class Posts extends React.Component<any, Istate> {
  constructor(props: string) {
    super(props);
    this.state = {
      data: [],
      inputValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    console.log(event);

    postService.createPost({ text: this.state.inputValue });
    this.getData();
    this.setState({ inputValue: "" });
  }

  getData() {
    postService.getPosts().then((result) => {
      this.setState({ data: result });
    });
  }

  componentDidMount(): void {
    this.getData();
  }

  setLike(post: IPost) {
    post.likesCount += 1;
    postService.setLikePost(post.id, post);
    this.forceUpdate();
  }

  handleDelete(post: IPost) {
    postService.deletePost(post.id);
    this.getData();
  }

  formatDate({ date }: IPost) {
    const string_date = new Date(date);

    const options = {
      day: "numeric",
      year: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      timezone: "UTC",
    };
    return string_date.toLocaleString("ru", options);
  }

  render() {
    return (
      <div id='posts'>
        {this.state.data.map((post) => (
          <div key={post.id} id={"post_" + post.id}>
            <p> {post.text} </p>
            <button onClick={() => this.setLike(post)}>
              {" "}
              {post.likesCount}
            </button>
            <p>
              Опубликовано: <span>{this.formatDate(post)}</span>
            </p>
            <button onClick={() => this.handleDelete(post)}>X</button>
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
