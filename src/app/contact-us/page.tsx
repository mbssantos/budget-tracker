import { Headline, Text } from "@/components/text";
import { ContactForm } from "@/features/contactForm";
import { GenMetadata } from "@/types";

export const generateMetadata: GenMetadata = ({}) => {
  return {
    title: "Contact us page",
    description: "Contact us page desc",
  };
};

const ContactUsPage: React.FC = async () => {
  return (
    <section className="grid mw-68">
      <Headline className="center m-16 m-b-24" level={1}>
        Contact US
      </Headline>
      <div className="center m-16">
        <Text size={4}>
          Get in touch with our team for feature request, questions, complaints
          or thank-you notes!
        </Text>
      </div>
      <ContactForm />
    </section>
  );
};

export default ContactUsPage;
