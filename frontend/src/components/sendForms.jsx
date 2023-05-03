import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, Button } from '@mui/material';

export const SendForm = (props) => {
  const [receiver_email, setreceiver_email] = useState("");
  const [file_name, setfilename] = useState("");
  const [xml_data, setxml_data] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); /* Prevents page refresh on submit */
    try {
      // Post Request
      const response = await Axios.post(
        "http://h13a-sox-sending-api.ap-southeast-2.elasticbeanstalk.com/send/send_invoice",
        {
          receiver_email,
          file_name,
          xml_data,
        }
      );
      console.log(response);
      localStorage.setItem("report", JSON.stringify(response.data));
      navigate("/send/result");
    } catch (err) {
      console.log(err);
    }
  };

  return(
    <>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField required id="email-input" label="Recipient Email" variant="outlined" value={receiver_email} onChange={(e) => setreceiver_email(e.target.value)}/>
        </FormControl>
        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField required id="file-input" label="File Name (ie. invoice.xml)" variant="outlined" value={file_name} onChange={(e) => setfilename(e.target.value)}/>
        </FormControl>
        <FormControl sx={{ marginTop: '2%', width: '20%', height: '50%' }}>
          <TextField multiline required id="file-input" label="XML Input" variant="outlined" value={xml_data}
          onChange={(e) => setxml_data(e.target.value)}/>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ marginTop: '2%', fontSize: '11pt', width: '20%' }}>Send E-Invoice</Button>
      </form>
    </>
  );

};

