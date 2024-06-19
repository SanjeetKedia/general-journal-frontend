import JournalEntry from "@/components/custom/JournalEntry";
import { Separator } from "@radix-ui/react-separator";
// import { Button } from "@/components/ui/button";

const Journal = () => {
  return (
    <div className="font-bold">
      <JournalEntry />
      <Separator className="mx-4" />
    </div>
  );
};

export default Journal;
