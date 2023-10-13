import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessage,
  setOpenAlert,
  setSeverity,
} from "../features/alert/alertSlice";
import Cookies from "js-cookie";
import { setDocument } from "../features/employer/employerSlice";
import { setAttachmentName } from "../features/application/applicationSlice";

// state

// axios config
const API = process.env.REACT_APP_API_PROD_URL;
const TOKEN = Cookies.get("access-tokn") ? Cookies.get("access-tokn") : null;
const CONFIG = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    contentType: "multipart/form-data",
  },
};

const Uploader = () => {
  const dispatch = useDispatch();

  const { firstName, lastName } = useSelector((state) => state.employee);

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    console.log(meta);
    return { url: "http://localhost:5000/image" };
  };

  const displayAlert = (message, severity) => {
    dispatch(setOpenAlert(true));
    dispatch(setMessage(message));
    dispatch(setSeverity(severity));
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    // console.log(status, meta, file);
    console.log(`status :${status}`);
    console.log(file.name);

    const formData = new FormData();

    if (status === "done") {
      dispatch(setDocument(file));
      const fileName = file.name;

      formData.append("file", file);
      axios
        .post(`${API}/file`, formData, CONFIG)
        .then((response) => {
          if (response.status === 200) {
            // alert("success");

            // get file extension
            const fileExtension = fileName.split(".").pop();
            console.log(`file extension: ${fileExtension}`);
            const newFileName = response.data.data + "." + fileExtension;
            displayAlert(newFileName, "success");

            dispatch(setAttachmentName(newFileName));
          } else {
            // alert(response.statusText);
            displayAlert(response.statusText, "error");
          }

          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
          displayAlert(err.message, "error");
        });
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));

    //  axios
    //    .post("http://localhost:5000/image", formData)
    //    .then((response) => {
    //      console.log(response);
    //    })
    //    .catch((err) => {
    //      console.log(err);
    //    });

    allFiles.forEach((f) => f.remove());
  };

  return (
    <>
      <Dropzone
        // getUploadParams={getUploadParams}
        maxFiles={1}
        onChangeStatus={handleChangeStatus}
        // onSubmit={handleSubmit}
        // accept="image/*,audio/*,video/*"
        inputContent="Drop File Here"
        // accept=".zip,.rar,.7zip"
        multiple={false}
        canCancel={false}
        styles={{
          color: "red",
          dropzone: { height: 150 },
          dropzoneActive: { borderColor: "green" },
        }}
      />
    </>
  );
};

export default Uploader;
