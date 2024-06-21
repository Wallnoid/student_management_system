import { Member } from "@/interfaces/Member";
import { cutString } from "@/utils/utils";
import { User } from "@nextui-org/react";
import { FaUser } from "react-icons/fa6";

export default function DefaultAvatar({ user }: { user: any }) {
  return (
    <User
      avatarProps={{
        radius: "lg",
        showFallback: true,
        src: "https://images.unsplash.com/broken",
        fallback: <FaUser size={25} className=" text-primary" />,
      }}
      description={user.correo}
      name={cutString(user.nombre + " " + user.apellido, 20)}
    >
      {user.correo}
    </User>
  );
}
