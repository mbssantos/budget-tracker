import { LanguagePicker } from "@/components/button/languagePicker";
import { ThemeButton } from "@/components/button/theme";

const Settings: React.FC = () => {
  return (
    <>
      <ThemeButton />
      <LanguagePicker />
    </>
  );
};

export default Settings;
