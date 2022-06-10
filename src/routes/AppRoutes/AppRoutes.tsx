import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, Location } from "react-router-dom";

import { DefaultLayout } from "@/layouts";
import { publicRoutes } from "@/routes";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    "0": "#ffffff",
    "1.0": "#FF9900",
  },
  shadowBlur: 5,
});

export const AppRoutes: React.FC = () => {
  const location = useLocation();

  const [progress, setProgress] = useState<Boolean>(false);
  const [prevLoc, setPrevLoc] = useState<Location>(location);

  console.log(location);

  useEffect(() => {
    setPrevLoc(location);
    setProgress(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);

  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout: any = route.layout || DefaultLayout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  {progress && <TopBarProgress />}
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </>
  );
};