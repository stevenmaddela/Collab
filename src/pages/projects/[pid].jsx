import { useRouter, Router } from "next/router";
import { useEffect } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { redirect } from "next/navigation";
import { auth } from "@component/firebaseConfig";
import { signOut } from "firebase/auth";
//import {db} from "@component/firebaseConfig";
//import {getDatabase,ref,onValue, off} from "firebase/database";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Collab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Manage() {
  const router = useRouter();
  const { pid } = router.query;
  const user = auth.currentUser;
  //const db = getDatabase();

  // useEffect(() => {
  //   if (user == null) router.push("/login");
  // });
  
  
  
  //useEffect(() => {
  //  if (user == null) router.push("/login");

  //  const tasksRef = ref(db, '/projects/'+ pid + '/tasks');

    // Listen for changes to the tasks data
  //  onValue(tasksRef, (snapshot) => {
  //    const taskData = snapshot.val();
  //    if (taskData) {
  //      const taskList = Object.entries(taskData).map(([key, value]) => ({
  //        id: key,
  //        ...value,
  //      }));
  //      setTasks(taskList);
  //    } else {
  //      setTasks([]);
  //  }
  //});

    
  //;

  const signoutUser = () => {
    signOut(auth).then(() => {
      router.push("/login");
    });
  };

  const redirectTask = () => {
    // Router.push({
    //   pathname: "/projects/" + pid + "/tasks",
    //   query: { projectTitle: pid },
    // });
    //router.push("/projects/" + pid + "/tasks");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Collab
          </Typography>
          <Button color="inherit" onClick={signoutUser}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {pid}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {"" /*description */}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link
                href={{
                  pathname: "/projects/" + pid + "/tasks",
                  query: { projectTitle: pid },
                }}
              >
                <Button variant="contained" onClick={redirectTask}>
                  Create Task
                </Button>
              </Link>

              <Button variant="outlined">Schedule Meeting</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (//if want to test, can change to tasks.map(task)
              <Grid item key={card} xs={12} sm={6} md={4}>//change to {task}
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Task {card}
                    </Typography>
                    <Typography>Task description goes here.</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
