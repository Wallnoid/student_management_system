"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  Image,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  DropdownSection,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { logout } from "@/app/login/actions";

export default function SiteNavBar() {
  //Implentear luego estados globales con Zustand
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const actualPath = usePathname();

  const menuItems = [
    "Gestion de Miembros",
    "Gestion de Eventos",
    "Gestion de Proyectos",
    "Configuración",
  ];

  const isActiveLink = (path: string) => {
    return actualPath.startsWith(path);
  };

  return (
    <Navbar
      isBlurred
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarBrand>
        <NavbarContent
          className="sm:hidden pr-3"
          justify="center"
        ></NavbarContent>
        <Image
          className="hidden md:flex"
          height={70}
          width={70}
          alt="Logo App"
          src=""
        />
        <p className="font-bold text-inherit">WEB-CLUBES</p>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color={isActiveLink("/miembros") ? "primary" : "foreground"}
            className="font-semibold"
            href="/miembros"
          >
            Miembros
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActiveLink("/clubes")}>
          <Link
            color={isActiveLink("/clubes") ? "primary" : "foreground"}
            className="font-semibold"
            href="/clubes"
          >
            Clubes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={isActiveLink("/eventos") ? "secondary" : "foreground"}
            className="font-semibold"
            href="/eventos"
          >
            Eventos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={isActiveLink("/proyectos") ? "secondary" : "foreground"}
            className="font-semibold"
            href="/proyectos"
          >
            Proyectos
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              isIconOnly
              className="p-2"
              color="default"
              aria-label="user-settings"
            >
              <p className="font-semibold">SV</p>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions">
            <DropdownSection title="Usuario" showDivider>
              <DropdownItem key="profile">cambiardespues@mail.com</DropdownItem>
            </DropdownSection>
            <DropdownSection title="Accciones" showDivider>
              <DropdownItem key="settings">Configuración Personal</DropdownItem>
              <DropdownItem key="configurations">Configuraciones</DropdownItem>
            </DropdownSection>
            <DropdownSection title="Sesion">
              <DropdownItem key="logout" color="danger">
                <form>
                  <button formAction={logout}>Cerrar Sesión</button>
                </form>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" color={"foreground"} href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
