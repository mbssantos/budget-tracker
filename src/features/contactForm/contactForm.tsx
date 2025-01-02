"use client";

import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { Text } from "@/components/text";
import useLocale from "@/hooks/useLocale";
import { FormEventHandler, useRef, useState } from "react";

const maxLength = 4000;

const translations = {
  en: {
    name: "Name",
    namePlaceholder: "What should we call you?",
    email: "e-mail",
    emailPlaceholder: "you@example.com",
    message: "Message",
    messagePlaceholder: "Write you message for the team here.",
    send: "Send",
    thankYouMessage:
      "Thanks for getting in touch, we'll get back to you as soon as possible.",
    apiError: "Error $1 while sending message, please try again later",
    tooMuchTextError: `Your message must be under ${maxLength} characters`,
  },
  pt: {
    name: "Nome",
    namePlaceholder: "Como lhe devemos chamar?",
    email: "e-mail",
    emailPlaceholder: "you@example.com",
    message: "Mensagem",
    messagePlaceholder: "Escreva aqui a mensagem para a nossa equipa.",
    send: "Enviar",
    thankYouMessage:
      "Agradecemos a sua mensagem, entraremos em contacto assim que possível.",
    apiError: "Erro $1 ao enviar mensagem, por favor tente mais tarde",
    tooMuchTextError: `A sua mensagem deverá ter menos de ${maxLength} carácteres`,
  },
};

const ContactForm: React.FC = () => {
  const locale = useLocale();
  const keys = translations[locale];
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
      return setError(keys.tooMuchTextError);
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
        throw new Error(keys.apiError.replace("$1", `${rsp.status}`));
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
          {keys.name}
          <input
            ref={nameRef}
            placeholder={keys.namePlaceholder}
            required
            name="name"
            type="text"
            minLength={5}
            maxLength={250}
          />
        </Text>
        <Text Tag="label">
          {keys.email}
          <input
            ref={emailRef}
            placeholder={keys.emailPlaceholder}
            required
            name="email"
            type="email"
            minLength={5}
            maxLength={250}
          />
        </Text>
        <Text Tag="label">
          {keys.message}
          <textarea
            ref={msgRef}
            placeholder={keys.messagePlaceholder}
            required
            name="content"
            minLength={5}
            maxLength={maxLength - 500}
          />
        </Text>

        {(hasSubmitted || error) && (
          <div className="center m-16 m-b-24">
            {hasSubmitted && <Text size={3}>{keys.thankYouMessage}</Text>}
            {error && <Text size={3}>{error}</Text>}
          </div>
        )}

        {!hasSubmitted && (
          <div className="center">
            <Button level={1} disabled={isLoading}>
              <Text>{isLoading ? <Spinner /> : keys.send}</Text>
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default ContactForm;
