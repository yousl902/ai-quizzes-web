import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProfileSection } from "@/components/navbar/ProfileSection";

interface ProfileButtonProps {
  email: string;
  firstName?: string;
  lastName?: string;
  userId: string;
}

export async function ProfileButton({
  firstName,
  lastName,
  email,
  userId,
}: ProfileButtonProps) {
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-btn-profile-circle hover:border-btn-profile-hover transition-colors">
            <AvatarFallback className="bg-btn-profile">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 backdrop-blur-sm bg-white/90 border border-orange-200">
        <ProfileSection firstName={firstName} lastName={lastName} email={email} userId={userId} />
      </PopoverContent>
    </Popover>
  );
}
