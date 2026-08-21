import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import GlobalStyles from "./styles/GlobalStyles.styles";
import Header from "./components/Header";
import styled from "styled-components";
import { useEntryStore } from "./store/useEntryStore";

const Container = styled.div`
  min-height: 100vh;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AppContainer = styled.div`
  margin: 0 auto;
  width: 420px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 0;
`;

const PageWrap = styled(motion.div)`
  position: absolute;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--bg);
  transform-origin: center center;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const getPageType = (pathname) => {
  if (pathname === "/") return "home";
  if (pathname === "/list") return "list";
  if (pathname.startsWith("/view")) return "view";
  if (pathname === "/write" || pathname.startsWith("/edit")) return "editor";
  return "other";
};

const isZoomPage = (type) => type === "view" || type === "editor";

const pageVariants = {
  enter: ({ from, to }) => {
    if (to === "list" && from === "home") {
      return { x: "-100%", scale: 1, opacity: 1, zIndex: 3 };
    }
    if (isZoomPage(to) && from !== "editor") {
      return { x: 0, scale: 0.92, opacity: 0, zIndex: 4 };
    }
    return { x: 0, scale: 1, opacity: 1, zIndex: 1 };
  },
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 2,
  },
  exit: ({ from, to }) => {
    if (from === "list" && to === "home") {
      return { x: "-100%", scale: 1, opacity: 1, zIndex: 3 };
    }
    if (to === "editor") {
      return { x: 0, scale: 1, opacity: 1, zIndex: 1 };
    }
    if (isZoomPage(from)) {
      return { x: 0, scale: 0.92, opacity: 0, zIndex: 4 };
    }
    if (isZoomPage(to)) {
      return { x: 0, scale: 1.04, opacity: 0, zIndex: 1 };
    }
    return { x: 0, scale: 1, opacity: 1, zIndex: 1 };
  },
};

const pageTransition = {
  x: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.34 },
  scale: { type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.28 },
  opacity: { type: "tween", ease: "easeOut", duration: 0.24 },
};

function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

function Root() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const fromPath = prevPathRef.current;
  const custom = {
    from: getPageType(fromPath),
    to: getPageType(location.pathname),
  };

  useLayoutEffect(() => {
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    useEntryStore.getState().hydrate();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Container>
        <AppContainer>
          <Header />
          <ContentArea>
            <AnimatePresence initial={false} custom={custom}>
              <PageWrap
                key={location.pathname}
                custom={custom}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={pageTransition}
              >
                <FrozenOutlet />
              </PageWrap>
            </AnimatePresence>
          </ContentArea>
        </AppContainer>
      </Container>
    </>
  );
}

export default Root;
