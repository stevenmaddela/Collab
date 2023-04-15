import LoginForm from "@component/components/login-form";
import { Box, Typography } from "@mui/material";

export default function OnboardingPage() {
  //const [onboardingData, setOnboardingData] = useState<OnboardingData>(initialOnboardingData);

  return (
    <div align="center">
      <Typography marginBottom={4} marginTop={4} variant="h3">
        Collab
      </Typography>
      <Box sx={{ display: "inline-flex", flexDirection: "row" }}>
        <img src="v2_25.png" width={"400px"} height={"80%"} />
        <LoginForm />
      </Box>
    </div>
  );
}
