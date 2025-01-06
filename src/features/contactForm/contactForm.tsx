"use client";

import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { Text } from "@/components/text";
import { FormEventHandler, useRef, useState } from "react";

const maxLength = 4000;

const ContactForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>();

  // form variables
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setError(undefined);
    e.preventDefault();

    if (isLoading) {
      // avoid double submissions
      return;
    }
    setIsLoading(true);

    const { action, method } = e.currentTarget;

    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const msg = msgRef.current?.value || "";

    const totalLength = name.length + email.length + msg.length;
    if (totalLength > maxLength) {
      setIsLoading(false);
      return setError(`Your message must be under ${maxLength} characters`);
    }

    try {
      const rsp = await fetch(action, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: emailRef.current?.value,
          name: nameRef.current?.value,
          msg: msgRef.current?.value,
        }),

        method,
      });

      if (!rsp.ok) {
        throw new Error(
          `Error ${rsp.status} while sending message, please try again later`
        );
      }

      setHasSubmitted(true);
    } catch (e) {
      console.error(e);
      setError((e as Error).message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="/api/contact" method="POST">
        <Text Tag="label">
          Name
          <input
            ref={nameRef}
            placeholder="What should we call you?"
            required
            name="name"
            type="text"
            minLength={5}
            maxLength={250}
          />
        </Text>
        <Text Tag="label">
          e-mail
          <input
            ref={emailRef}
            placeholder="you@example.com"
            required
            name="email"
            type="email"
            minLength={5}
            maxLength={250}
          />
        </Text>
        <Text Tag="label">
          Message
          <textarea
            ref={msgRef}
            placeholder="Write you message for the team here."
            required
            name="content"
            minLength={5}
            maxLength={maxLength - 500}
          />
        </Text>

        {(hasSubmitted || error) && (
          <div className="center m-16 m-b-24">
            {hasSubmitted && (
              <Text size={3}>
                Thanks for getting in touch, we'll get back to you as soon as
                possible.
              </Text>
            )}
            {error && <Text size={3}>{error}</Text>}
          </div>
        )}

        {!hasSubmitted && (
          <div className="center">
            <Button level={1} disabled={isLoading}>
              <Text>{isLoading ? <Spinner /> : "Send"}</Text>
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default ContactForm;
