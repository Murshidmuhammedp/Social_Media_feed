import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid";
import { CssVarsProvider } from "@mui/joy";
import Box from "@mui/joy/Box";
import UserCard from "./Profile";
import QuiltedImageList from "./UserPosts";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EllipsisList from "./WhoToFollow";
import AlignItemsList from "./Posts";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PostCreator from "./CreateAPost";
import PostCreationBox from "./CreateAPost";
import ImageUploadBox from "./CreateAPost";
import PostCreateBox from "./CreateAPost";

const NAVIGATION = [
  {
    kind: "header",
  },
  {
    segment: "Post",
    // title: "Home",
    icon: <HomeIcon />,
  },
  {
    segment: "Profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
  },
  {
    segment: "Logout",
    title: "Logout",
    icon: <ExitToAppIcon />,
    action: (router) => router.navigate("/login"), // Logout redirects to login
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)), // Handle navigation
    };
  }, [pathname]);

  return router;
}

export default function DashboardLayoutBasic(props) {
  const router = useDemoRouter("/Home"); // Default to Home

  const handleNavigation = (segment) => {
    const navItem = NAVIGATION.find((item) => item.segment === segment);
    if (navItem?.action) {
      navItem.action(router); // Execute logout action
    } else {
      router.navigate(`/signin`);
    }
  };

  return (
    <AppProvider
    branding={{
      logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
      title: 'Minstagram',
      homeUrl: '/toolpad/core/introduction',
    }}
    navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CssVarsProvider>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 3,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    mt: 2,
                  }}
                >
                  {/* Content Section */}
                  <Box
                    sx={{
                      flex: 3, // Main content width
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      width: "100%",
                      maxWidth: 1300,
                    }}
                  >
                    {/* Dynamic Page Rendering */}
                    {router.pathname === "/Profile" ? (
                      <>
                        <UserCard sx={{ width: "100%" }} />
                        <QuiltedImageList sx={{ width: "100%" }} />
                      </>
                    ) : (
                      <>
                      {/* <PostCreateBox /> */}
                      <AlignItemsList />
                      </>
                    )}
                  </Box>

                  {/* Sidebar (EllipsisList - Hides on Mobile) */}
                  <Box
                    sx={{
                      flex: 1,
                      position: "sticky",
                      top: 10,
                      height: "fit-content",
                      maxWidth: 600,
                      display: { xs: "none", md: "block" }, // Hide on mobile (xs)
                    }}
                  >
                    <EllipsisList />
                  </Box>
                </Box>
              </CssVarsProvider>
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
