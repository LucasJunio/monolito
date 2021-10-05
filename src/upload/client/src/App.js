import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import axiosInstance from "./utils/axios";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFiles1, setSelectedFiles1] = useState([]);
  const [selectedFiles2, setSelectedFiles2] = useState([]);
  const [progress, setProgress] = useState();
  const [error, setError] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("file", selectedFiles[0]);
    formData.append("file", selectedFiles1[0]);
    formData.append("file", selectedFiles2[0]);

    const bodyobject = {
      idClient: 172,
      product: "vilevewayclient",
      itens: [
        { categorie: "identificacao", filename: selectedFiles[0].name },
        { categorie: "residencia", filename: selectedFiles1[0].name },
        { categorie: "cnpj", filename: selectedFiles2[0].name },
      ]
    }

    formData.append("info", JSON.stringify(bodyobject));
    //Clear the error message
    setError("");
    axiosInstance
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .catch((error) => {
        console.error(error)
        // const { code } = error?.response?.data;
        // switch (code) {
        //   case "FILE_MISSING":
        //     setError("Please select a file before uploading!");
        //     break;
        //   case "LIMIT_FILE_SIZE":
        //     setError("File size is too large. Please upload files below 1MB!");
        //     break;
        //   case "INVALID_TYPE":
        //     setError(
        //       "This file type is not supported! Only .png, .jpg and .jpeg files are allowed"
        //     );
        //     break;

        //   default:
        //     setError("Sorry! Something went wrong. Please try again later");
        //     break;
        // }
      });
  };
  return (
    <Container>
      <Row>
        <Col lg={{ span: 4, offset: 3 }}>
          <Form
            action="http://localhost:3002/api/v1/shopkeepers/upload"
            method="post"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Select a File1"
                name="file"
                onChange={(e) => {
                  setSelectedFiles(e.target.files);
                }}
              />
              <Form.File
                id="exampleFormControlFile2"
                label="Select a File2"
                name="file"
                onChange={(e) => {
                  setSelectedFiles1(e.target.files);
                }}
              />
              <Form.File
                id="exampleFormControlFile3"
                label="Select a File3"
                name="file"
                onChange={(e) => {
                  setSelectedFiles2(e.target.files);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="info" type="submit">
                Upload
              </Button>
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            {!error && progress && (
              <ProgressBar now={progress} label={`${progress}%`} />
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
