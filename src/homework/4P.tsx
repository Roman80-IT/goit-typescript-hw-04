/*
УМОВА:

Ви вирішили застосувати до меню контекст і тепер вам потрібно його типізувати.

Описати тип SelectedMenu: Це має бути об'єкт, який містить id з типом MenuIds

Описати тип MenuSelected: Цей тип є об'єктом, що містить selectedMenu

Описати тип MenuAction: Цей тип являє собою об'єкт з методом onSelectedMenu, який приймає об'єкт типу SelectedMenu як аргумент повертає void.

Описати тип PropsProvider: Опишіть правильний тип для дітей

Описати тип PropsMenu: Опишіть тип для menus, він має бути від типу Menu

import React, { createContext, useMemo, useState, useContext } from "react";
import noop from "lodash/noop";

type MenuIds = "first" | "second" | "last";
type Menu = { id: MenuIds; title: string };

// Додати тип Menu Selected

const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: {},
});

// Додайте тип MenuAction

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

type PropsProvider = {
  children; // Додати тип для children
};

function MenuProvider({ children }: PropsProvider) {
  // Додати тип для SelectedMenu він повинен містити { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({});

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

type PropsMenu = {
  menus; // Додайте вірний тип для меню
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{" "}
          {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}

*/

//! -----------------  ПОЯСНЕННЯ:  --------------------------

import React, { createContext, useMemo, useState, useContext } from "react";
import noop from "lodash/noop";

type MenuIds = "first" | "second" | "last";
type Menu = { id: MenuIds; title: string };

//! Додати тип Menu Selected

//* Оголошення типу SelectedMenu - Описати тип SelectedMenu: Це має бути об'єкт, який містить id з типом MenuIds
type SelectedMenu = { id: MenuIds };

//* Оголошення типу MenuSelected - Описати тип MenuSelected: Цей тип є об'єктом, що містить selectedMenu
type MenuSelected = {
  selectedMenu: SelectedMenu;
};

// ----------------------------------------------------

const MenuSelectedContext = createContext<MenuSelected>({
  // selectedMenu: {},
  selectedMenu: { id: "first" }, //* початкове значення контексту
});

//! Додайте тип MenuAction

//* Оголосити тип MenuAction - Описати тип MenuAction: Цей тип являє собою об'єкт з методом onSelectedMenu, який приймає об'єкт типу SelectedMenu як аргумент повертає void.
type MenuAction = {
  onSelectedMenu: (selectedMenu: SelectedMenu) => void;
};

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

//* Описати тип PropsProvider: Опишіть правильний тип для дітей
type PropsProvider = {
  // children; // Додати тип для children
  children: React.ReactNode; //* тип для children
};

function MenuProvider({ children }: PropsProvider) {
  // Додати тип для SelectedMenu він повинен містити { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({
    id: "first", // Додано тип для SelectedMenu, містить { id }
  });

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

//* Описати тип PropsMenu: Опишіть тип для menus, він має бути від типу Menu
type PropsMenu = {
  // menus; // Додайте вірний тип для меню
  menus: Menu[]; //* тип для меню
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{" "}
          {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
