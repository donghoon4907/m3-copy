import { useRouter } from "next/router";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useCallback } from "react";
import styled from "styled-components";

import { gnbOptions } from "./options/Gnb";
import { useDispatch, useSelector } from "../context";
import {
  ToggleNavDrawerCollapseItem,
  ToggleNavDrawerItem
} from "./ToggleNavDrawerItem";
import { ThemeMode } from "../types/theme";
import { ToggleThemeMode } from "./ToggleThemeMode";
import { SET_ACTIVE_MDMENU } from "../context/action";
import { getCurrentLevelGnbMenus, getParentGnbMenus } from "../lib/calc/tree";
import { mixinNavDrawerShape } from "../theme/mixins/nav";

const Container = styled.nav<{ open: boolean }>`
  display: none;
  transform: translate3d(${({ open }) => (open ? "260px" : "0")}, 0, 0);
  z-index: 9;

  ${mixinNavDrawerShape}

  ${({ theme }) => theme.breakPoint.lg} {
    display: flex;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Footer = styled.div`
  padding: 5px;
`;

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  themeMode: ThemeMode;
  toggle: () => void;
}

export const ToggleNavDrawer: FC<Props> = ({
  open,
  setOpen,
  themeMode,
  toggle
}) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { activeMdMenu } = useSelector();

  const handleBack = () => {
    const isRoot = activeMdMenu[0].id === gnbOptions[0].id;

    const parentMenus = getParentGnbMenus(
      gnbOptions,
      gnbOptions,
      activeMdMenu[0].id
    );

    if (isRoot) {
      setOpen(false);
    } else {
      dispatch({
        type: SET_ACTIVE_MDMENU,
        payload: parentMenus
      });
    }
  };

  const handleClickWindow = useCallback((evt: MouseEvent) => {
    if (evt.pageX > 256) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    const currentLevelMenus = getCurrentLevelGnbMenus(
      gnbOptions,
      router.asPath
    );

    dispatch({
      type: SET_ACTIVE_MDMENU,
      payload: currentLevelMenus
    });
  }, [router.asPath]);

  useEffect(() => {
    window.addEventListener("click", handleClickWindow);

    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, []);

  return (
    <Container open={open}>
      <Body>
        <ToggleNavDrawerCollapseItem onClick={handleBack} />
        {activeMdMenu.map((g, index) => (
          <ToggleNavDrawerItem key={`mdMenu${index}`} {...g} />
        ))}
      </Body>
      <Footer>
        <ToggleThemeMode
          themeMode={themeMode}
          toggle={toggle}
          showLabel={true}
        />
      </Footer>
    </Container>
  );
};
