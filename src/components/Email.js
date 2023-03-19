import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import "./styles.css";
import Modal from "./utils/Modal";
import $ from 'jquery';

const Email = ({indexKey, email, tokenResponse }) => {
  const [headers, setHeaders] = useState({});
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [from, setFrom] = useState("");
  const [date, setDate] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [to, setTo] = useState("");
  const [messageId, setMessageId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getHeader = (headers, name) => {
    let value = "";
    headers.forEach((header, index) => {
      if (header.name === name) {
        value = header.value;
      }
    });
    return value;
  };

  const handleShowModal = () => {
    setShowModal(true);
    $(`#emailBody${indexKey}`).html(emailBody);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    $(`#emailBody${indexKey}`).empty();
  };
  

  useEffect(() => {
    fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${email.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Content-type": "text/plain; charset=UTF-8",
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setHeaders(data.payload.headers);
        setMessageId(data.id);
        var parts = data.payload.parts;
        parts.forEach((part) => {
        //   const mimeType = part.mimeType;
          const body = part.body.data;
          const decodedBody = Buffer.from(body, "base64").toString();
          setEmailBody(decodedBody);
        });
      });
  }, []);

  useEffect(() => {
    if (headers.length > 0) {
      setTitle(getHeader(headers, "From").split('<')[0]);
      setSubject(getHeader(headers, "Subject"));
      setFrom(getHeader(headers, "From"));
      setDate(getHeader(headers, "Date"));
      setTo(getHeader(headers, "To"));
    }
  }, [headers]);

  return (
    <>
      {title && (
        <div
          className="emailsCon"
          onClick={() => {
            handleShowModal();
            console.log(headers,'Gab');
          }}
        >
          <p id="emailTitle">{title.split('<')}</p>
          <p id="emailSubject">{subject}</p>
          <p id="emailDate">{date}</p>
        </div>
      )}

      {/* Display the modal */}
        <Modal show={showModal} handleClose={handleCloseModal}>
          <div id="emailModalCon">
          <form id="emailDetails">
            <label for="subject">Subject: </label>
            <input type="text" id="subject" name="subject" disabled value={subject}/>
            <label for="from">From: </label>
            <input type="text" id="from" name="from" disabled value={from}/>
            <label for="to">To: </label>
            <input type="text" id="to" name="to" disabled value={to}/>
            <label for="date">Date: </label>
            <input type="text" id="date" name="date" disabled value={date}/>
          </form>
          <div className="emailBody" id={`emailBody${indexKey}`}>{email.snippet}</div>
          </div>
        </Modal>
    </>
  );
};

export default Email;
