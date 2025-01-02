import { Headline, Text } from "@/components/text";
import { ContactForm } from "@/features/contactForm";
import { GenMetadata, PageProps } from "@/types";
import { getDictionary } from "../dictionaries";

export const generateMetadata: GenMetadata = async ({ params }) => {
  const lang = (await params).lang;
  const dict = await getDictionary(lang); // en

  return {
    title: dict.contactUs.title,
    description: dict.contactUs.description,
  };
};

const ContactUsPage: React.FC<PageProps> = async ({ params }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <section className="grid mw-68">
      <Headline className="center m-16 m-b-24" level={1}>
        {dict.contactUs.title}
      </Headline>
      <div className="center m-16">
        <Text size={4}>{dict.contactUs.description}</Text>
      </div>
      <ContactForm />
    </section>
  );
};

export default ContactUsPage;
