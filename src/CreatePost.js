import React from "react";
import FormField from "./components/FormField";
import "./CreatePost.css";
import ReactLoading from "react-loading";
import download from "./assets/download.png";
// import dotenv from 'dotenv'
import preview from "./assets/preview.png";
import FileSaver from "file-saver";
import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const CreatePost = () => {
  
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [postQuery, setPostQuery] = React.useState({
    name: "",
    prompt: "",
    photo: "",
  });

  console.log("eevee");
  console.log(process.env.REACT_APP_OPENAI_API_KEY);
  const [loading, setLoading] = React.useState(false);

  async function handleClick() {
    if (!postQuery.prompt) {
      alert("Please enter a prompt");
      return;
    }
    console.log("submitted");
    setLoading(true);

    try {
      const aiResponse = await openai.createImage({
        prompt: postQuery.prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      });

      const aiImage = aiResponse.data.data[0].b64_json;
      console.log(aiImage);

      setPostQuery({
        ...postQuery,
        photo: `data:image/jpeg;base64,${aiImage}`,
      });

      console.log(postQuery);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function chng(event) {
    setPostQuery((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log("chng");
  }

  async function downloadImage(prompt, photo) {
    FileSaver.saveAs(photo, `download-${prompt}.jpg`);
  }

  return (
    <div className="create-post-section">
      <div className="heading-section">
        <h1 className="community-heading">Create</h1>
        <p className="info-msg">Generate imaginative images with DALL-E</p>
      </div>

      <div className="form-field">
        <div className="form-input">
          <FormField chng={chng} value={postQuery} />
        </div>
        <button className="create-button" onClick={handleClick}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className="generated-image">
        {postQuery.photo ? (
          <img
            width="342px"
            className="ai-image"
            height="342px"
            src={postQuery.photo}
            alt={""}
          />
        ) : (
          <img
            width="342px"
            className="ai-image"
            height="342px"
            src={preview}
            alt={""}
          />
        )}
        {loading && (
          <ReactLoading
            className="spinner"
            type="spin"
            color="#A9A9A9"
            height={50}
            width={50}
          />
        )}

        {postQuery.photo && (
          <img
            src={download}
            onClick={() => downloadImage(postQuery.prompt, postQuery.photo)}
            alt="download"
            className="download-icon"
          />
        )}
      </div>
    </div>
  );
};

export default CreatePost;
