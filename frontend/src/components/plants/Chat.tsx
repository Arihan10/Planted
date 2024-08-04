"use client";

import { useData } from "@/contexts/States";
import styles from "@/styles/components/plants/Chat.module.scss";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as PlayHT from "playht";

const tmpSuggestions = [
  "How are you feeling today?",
  "Do you need anything?",
  "Hey baby.",
];

export default function Chat({ id, imgURL }: any) {
  const [suggestions, setSuggestions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const currentMessageRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const { setLoadingModal, addAlert } = useData();
  const [audio, setAudio] = useState(null);
  const audioRef = useRef(null);

  const fetchAudio = async (text: any) => {
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${process.env.NEXT_PUBLIC_API}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audioConfig: {
            audioEncoding: "MP3",
            effectsProfileId: ["small-bluetooth-speaker-class-device"],
            pitch: 0,
            speakingRate: 1,
          },
          input: { text },
          voice: {
            languageCode: "en-US",
            name: "en-US-Journey-F",
          },
        }),
      }
    );

    const data = await response.json();
    console.log(`data:audio/mpeg;base64,${data.audioContent}`);
    setAudio(`data:audio/mpeg;base64,${data.audioContent}`);
  };

  const getSuggestions = () => {
    // TODO: get suggestions from the server
    setLoadingModal(true);
    setSuggestions(tmpSuggestions);
    setLoadingModal(false);
  };

  useEffect(() => {
    if (audio && audioRef.current) {
      audioRef.current.play();
      setAudio(null);
    }
  }, [audioRef.current]);

  useEffect(() => {
    getSuggestions();
  }, []);

  useEffect(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let currentMessages = [
      ...messages,
      { content: currentMessage, role: "user" },
    ];
    setMessages(currentMessages);
    setCurrentMessage("");
    setAudio(null);
    currentMessageRef.current.value = "";
    axios
      .post(process.env.NEXT_PUBLIC_SERVER_URL + "/plantChat", {
        id: id,
        imgURL: imgURL,
        messagesList: currentMessages,
      })
      .then((res) => {
        console.log(res.data);
        currentMessages.push({ content: res.data.message, role: "assistant" });
        fetchAudio(res.data.message);
        setMessages(currentMessages);
        addAlert({
          message: "Message sent successfully",
          type: "success",
          time: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
        addAlert({
          message: "Message could not be sent",
          type: "error",
          time: 3000,
        });
      });
  };
  const onChange = (e: any) => {
    setCurrentMessage(e.target.value);
  };

  const onSuggestionClick = (message: any) => {
    setCurrentMessage(message);
    currentMessageRef.current.value = message;
    currentMessageRef.current.focus();
  };
  return (
    <div className={`${styles.chat} shadow`}>
      {audio && (
        <audio ref={audioRef} controls src={audio} style={{ display: "none" }}>
          Your browser does not support the audio element.
        </audio>
      )}

      <div
        className={`${styles.suggestionsWrapper} ${
          messages.length == 0 && currentMessage.length == 0 ? styles.empty : ""
        }`}
      >
        <div className={styles.title}>Suggestions</div>
        <div className={styles.suggestions}>
          {suggestions.map((suggestion: any, index: any) => (
            <div
              key={index}
              className={styles.suggestion}
              onClick={() => {
                onSuggestionClick(suggestion);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
      <div ref={messagesContainerRef} className={styles.messages}>
        {messages.map((message: any, index: any) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.role == "user" ? styles.user : styles.bot
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          ref={currentMessageRef}
          type="text"
          placeholder="Type a message"
          onChange={onChange}
        />
        <button type="submit">
          <img src="/icons/right.svg" />
        </button>
      </form>
    </div>
  );
}
