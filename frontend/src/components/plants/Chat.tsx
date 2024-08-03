"use client";

import styles from "@/styles/components/plants/Chat.module.scss";
import { useEffect, useState, useRef } from "react";

const tmpSuggestions = [
  "Join this Course",
  "Join this Course",
  "Join this Course",
];

export default function Chat() {
  const [suggestions, setSuggestions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const currentMessageRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const getSuggestions = () => {
    // TODO: get suggestions from the server
    setSuggestions(tmpSuggestions);
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  useEffect(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setTimeout(() => {
      setMessages([
        ...messages,
        {
          message: currentMessage,
          role: "user",
        },
        {
          message: "hi",
          role: "assistant",
        },
      ]);
      setCurrentMessage("");
      currentMessageRef.current.value = "";
    }, 100);
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
            {message.message}
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
